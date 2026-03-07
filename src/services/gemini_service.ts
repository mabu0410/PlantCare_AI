import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const MODEL_NAME = "gemini-3-flash-preview";

export interface Message {
    role: 'user' | 'model';
    parts: { text: string }[];
}

const SYSTEM_PROMPT = `
Bạn là một trợ lý ảo thông minh tên là "PlantCare AI", chuyên gia về thực vật và chăm sóc cây trồng.
Nhiệm vụ của bạn là:
1. Trả lời các câu hỏi về kỹ thuật trồng trọt, chăm sóc, tưới tiêu, bón phân.
2. Chẩn đoán sơ bộ các dấu hiệu bệnh qua mô tả của người dùng (như lá vàng, héo, đốm đen...).
3. Chỉ tập trung trả lời các thông tin liên quan đến thế giới thực vật và ứng dụng PlantCare AI.
4. Nếu người dùng hỏi các vấn đề không liên quan (như chính trị, toán học, lập trình...), hãy khéo léo từ chối và hướng họ quay lại chủ đề cây trồng.
5. Luôn giữ thái độ thân thiện, nhiệt tình và chuyên nghiệp.
6. Ngôn ngữ: Tiếng Việt.
`;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "" });

export const geminiService = {
    chat: async (userMessage: string, history: Message[] = []) => {
        if (!GEMINI_API_KEY) {
            console.error('Missing Gemini API Key in .env');
            return 'Lỗi: Chưa cấu hình API Key cho Gemini. Hãy thêm EXPO_PUBLIC_GEMINI_API_KEY vào file .env';
        }

        try {
            // Prepare conversation with system prompt
            const contents = [
                {
                    role: 'user' as const,
                    parts: [{ text: SYSTEM_PROMPT }]
                },
                {
                    role: 'model' as const,
                    parts: [{ text: 'Tôi đã hiểu. Tôi là trợ lý PlantCare AI, tôi sẵn sàng hỗ trợ các vấn đề về cây trồng.' }]
                },
                ...history.map(msg => ({
                    role: (msg.role === 'model' ? 'model' : 'user') as 'user' | 'model',
                    parts: msg.parts.map(part => ({ text: part.text }))
                })),
                {
                    role: 'user' as const,
                    parts: [{ text: userMessage }]
                }
            ];

            const result = await genAI.models.generateContent({
                model: MODEL_NAME,
                contents,
                config: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                }
            });

            const text = result.text;
            if (text) {
                return text;
            }

            return 'Xin lỗi, tôi không thể xử lý câu hỏi này lúc này.';
        } catch (error: any) {
            console.error('Gemini SDK Error:', error);
            if (error?.message?.includes('API_KEY_INVALID') || error?.message?.includes('403')) {
                return 'API Key không hợp lệ hoặc đã hết hạn.';
            }
            return 'Đã có lỗi xảy ra khi kết nối với máy chủ AI. Vui lòng thử lại sau.';
        }
    }
};
