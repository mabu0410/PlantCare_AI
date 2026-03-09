/*
  # PlantCare AI - Core Database Schema
  
  Tạo schema cơ bản cho PlantCare AI application
  
  ## 1. Tables
  
  ### user_profiles
  - Mở rộng bảng auth.users của Supabase
  - Lưu thông tin hồ sơ người dùng (tên, ảnh đại diện, bio)
  
  ### plants
  - Thư viện cây trồng (Cà chua, Lúa, Ớt, Dưa chuột...)
  - Thông tin: tên, tên khoa học, mô tả, icon
  
  ### scans
  - Lịch sử phân tích bệnh của người dùng
  - Kết quả: tên bệnh, độ chính xác, triệu chứng, điều trị, phòng ngừa
  
  ### user_plants
  - Nhật ký cây trồng cá nhân của người dùng
  - Thông tin: tên cây, loại, ngày trồng, ghi chú, ảnh
  
  ### care_tasks
  - Nhiệm vụ chăm sóc cây (tưới nước, bón phân, cắt tỉa)
  - Liên kết với user_plants
  
  ### notification_preferences
  - Cài đặt thông báo của người dùng
  
  ## 2. Security
  - Bật RLS (Row Level Security) cho tất cả tables
  - Policies: User chỉ xem/sửa dữ liệu của mình
  - Plants table: Public read, admin write
  
  ## 3. Storage Buckets
  - scans: Ảnh phân tích bệnh
  - plants: Ảnh cây trong nhật ký
  - avatars: Ảnh đại diện người dùng
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles (extend auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    language TEXT DEFAULT 'Tiếng Việt',
    font_size TEXT DEFAULT 'Bình thường',
    theme TEXT DEFAULT 'toi',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.user_profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.user_profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.user_profiles FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Plant Library (Public read, admin write)
CREATE TABLE IF NOT EXISTS public.plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_vi TEXT NOT NULL,
    name_en TEXT,
    scientific_name TEXT,
    description_vi TEXT,
    description_en TEXT,
    icon TEXT DEFAULT '🌿',
    common_diseases TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.plants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plants"
    ON public.plants FOR SELECT
    TO authenticated
    USING (true);

-- Scan History
CREATE TABLE IF NOT EXISTS public.scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    image_url TEXT,
    disease_name TEXT NOT NULL,
    disease_name_en TEXT,
    scientific_name TEXT,
    accuracy FLOAT NOT NULL CHECK (accuracy >= 0 AND accuracy <= 100),
    severity TEXT NOT NULL CHECK (severity IN ('thap', 'trung_binh', 'cao', 'nghiem_trong')),
    description TEXT,
    symptoms TEXT[],
    treatment TEXT[],
    prevention TEXT[],
    plant_type TEXT,
    is_saved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans"
    ON public.scans FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans"
    ON public.scans FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans"
    ON public.scans FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scans"
    ON public.scans FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- User's Plant Diary
CREATE TABLE IF NOT EXISTS public.user_plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    plant_type TEXT NOT NULL,
    planting_date DATE NOT NULL,
    notes TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_plants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own plants"
    ON public.user_plants FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plants"
    ON public.user_plants FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plants"
    ON public.user_plants FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own plants"
    ON public.user_plants FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Care Tasks
CREATE TABLE IF NOT EXISTS public.care_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    plant_id UUID REFERENCES public.user_plants(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    task_type TEXT NOT NULL CHECK (task_type IN ('tuoi_nuoc', 'bon_phan', 'cat_tia', 'khac')),
    due_date TIMESTAMPTZ NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.care_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
    ON public.care_tasks FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
    ON public.care_tasks FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
    ON public.care_tasks FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
    ON public.care_tasks FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Notification Preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    push_enabled BOOLEAN DEFAULT true,
    email_enabled BOOLEAN DEFAULT false,
    care_reminders BOOLEAN DEFAULT true,
    weather_alerts BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
    ON public.notification_preferences FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
    ON public.notification_preferences FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
    ON public.notification_preferences FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_scans_user_id ON public.scans(user_id);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON public.scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_plants_user_id ON public.user_plants(user_id);
CREATE INDEX IF NOT EXISTS idx_care_tasks_user_id ON public.care_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_care_tasks_due_date ON public.care_tasks(due_date);

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_plants_updated_at
    BEFORE UPDATE ON public.user_plants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
    BEFORE UPDATE ON public.notification_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();