// Đăng ký Screen
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useAuthStore } from '../store/auth_store';
import NutBam from '../components/nut_bam';
import TheThuyTinh from '../components/the_thuy_tinh';

interface Props {
    navigation: any;
}

const DangKyScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const [ten, setTen] = useState('');
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const { dangKy, dang_tai } = useAuthStore();

    const handleDangKy = async () => {
        if (!ten || !email || !matKhau) return;
        const ok = await dangKy(ten, email, matKhau);
        if (ok) {
            navigation.replace('TabChinh');
        }
    };

    return (
        <LinearGradient
            colors={mau.gradient_hero}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                        <Text style={styles.title}>Tạo tài khoản 🌱</Text>
                        <Text style={styles.subtitle}>Bắt đầu bảo vệ cây trồng của bạn</Text>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                        <TheThuyTinh style={styles.formCard}>
                            {/* Full name */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: mau.chu_phu }]}>Họ và tên</Text>
                                <View style={[styles.inputWrap, { borderColor: mau.vien, backgroundColor: mau.nen }]}>
                                    <Ionicons name="person-outline" size={20} color={mau.chu_nhat} />
                                    <TextInput
                                        style={[styles.input, { color: mau.chu_chinh }]}
                                        placeholder="Nguyễn Văn A"
                                        placeholderTextColor={mau.chu_nhat}
                                        value={ten}
                                        onChangeText={setTen}
                                    />
                                </View>
                            </View>

                            {/* Email */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: mau.chu_phu }]}>Email</Text>
                                <View style={[styles.inputWrap, { borderColor: mau.vien, backgroundColor: mau.nen }]}>
                                    <Ionicons name="mail-outline" size={20} color={mau.chu_nhat} />
                                    <TextInput
                                        style={[styles.input, { color: mau.chu_chinh }]}
                                        placeholder="email@example.com"
                                        placeholderTextColor={mau.chu_nhat}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            {/* Password */}
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: mau.chu_phu }]}>Mật khẩu</Text>
                                <View style={[styles.inputWrap, { borderColor: mau.vien, backgroundColor: mau.nen }]}>
                                    <Ionicons name="lock-closed-outline" size={20} color={mau.chu_nhat} />
                                    <TextInput
                                        style={[styles.input, { color: mau.chu_chinh }]}
                                        placeholder="Tối thiểu 6 ký tự"
                                        placeholderTextColor={mau.chu_nhat}
                                        value={matKhau}
                                        onChangeText={setMatKhau}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            <NutBam
                                tieu_de={dang_tai ? 'Đang tạo...' : 'Đăng ký'}
                                onPress={handleDangKy}
                                disabled={dang_tai || !ten || !email || !matKhau}
                                fullWidth
                                icon={
                                    dang_tai ? (
                                        <ActivityIndicator size="small" color="#FFF" />
                                    ) : (
                                        <Ionicons name="person-add-outline" size={20} color="#FFF" />
                                    )
                                }
                            />
                        </TheThuyTinh>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.loginRow}>
                        <Text style={[styles.loginText, { color: mau.chu_phu }]}>
                            Đã có tài khoản?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={[styles.loginLink, { color: mau.xanh_nhat }]}>
                                Đăng nhập
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 60,
    },
    header: { alignItems: 'center', marginBottom: 32 },
    title: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 6 },
    subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.7)' },
    formCard: { marginBottom: 20 },
    inputGroup: { marginBottom: 18 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 8 },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        gap: 10,
    },
    input: { flex: 1, fontSize: 15, fontWeight: '500' },
    loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    loginText: { fontSize: 15 },
    loginLink: { fontSize: 15, fontWeight: '700' },
});

export default DangKyScreen;
