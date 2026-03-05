// Trợ lý AI Screen — Chat interface
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';

interface TinNhan {
    id: string;
    noi_dung: string;
    la_nguoi_gui: boolean;
    ngay: Date;
}

const TIN_NHAN_MAU: TinNhan[] = [
    {
        id: '1',
        noi_dung: 'Xin chào! Tôi là trợ lý AI PlantCare. Tôi có thể giúp gì cho bạn hôm nay?',
        la_nguoi_gui: false,
        ngay: new Date(),
    }
];

const TroLyAiScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { mau, laToi } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const [tinNhan, setTinNhan] = useState<TinNhan[]>(TIN_NHAN_MAU);
    const [nhap, setNhap] = useState('');
    const [dangPhanHoi, setDangPhanHoi] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const goiTinNhan = () => {
        if (!nhap.trim()) return;

        const tinMoi: TinNhan = {
            id: Date.now().toString(),
            noi_dung: nhap.trim(),
            la_nguoi_gui: true,
            ngay: new Date(),
        };

        setTinNhan(prev => [...prev, tinMoi]);
        setNhap('');
        setDangPhanHoi(true);

        // Simulate AI response
        setTimeout(() => {
            const phanHoiAi: TinNhan = {
                id: (Date.now() + 1).toString(),
                noi_dung: layCauTraLoi(nhap.trim()),
                la_nguoi_gui: false,
                ngay: new Date(),
            };
            setTinNhan(prev => [...prev, phanHoiAi]);
            setDangPhanHoi(false);
        }, 1500);
    };

    const layCauTraLoi = (cauHoi: string) => {
        const q = cauHoi.toLowerCase();
        if (q.includes('tưới water')) return 'Bạn nên tưới cây vào lúc sáng sớm hoặc chiều mát. Tránh tưới vào buổi trưa nắng gắt nhé!';
        if (q.includes('vàng lá') || q.includes('yellow')) return 'Lá vàng có thể do nhiều nguyên nhân: thiếu nước, thừa nước, hoặc thiếu dinh dưỡng (đạm). Bạn hãy kiểm tra độ ẩm của đất nhé.';
        if (q.includes('cà chua')) return 'Cà chua cần nhiều ánh sáng mặt trời (ít nhất 6-8 tiếng mỗi ngày) và đất thoát nước tốt.';
        return 'Cảm ơn bạn đã hỏi. Tôi sẽ ghi nhận và tìm hiểu thêm về vấn đề này. Bạn có muốn chụp ảnh lá cây để tôi phân tích không?';
    };

    const renderMessage = ({ item }: { item: TinNhan }) => (
        <Animated.View
            entering={item.la_nguoi_gui ? FadeInUp : FadeInDown}
            style={[
                styles.msgBubble,
                item.la_nguoi_gui
                    ? { backgroundColor: mau.xanh_chinh, alignSelf: 'flex-end', borderBottomRightRadius: 4 }
                    : { backgroundColor: laToi ? '#1E293B' : '#E5E7EB', alignSelf: 'flex-start', borderBottomLeftRadius: 4 }
            ]}
        >
            <Text style={[styles.msgText, { color: item.la_nguoi_gui ? '#FFF' : mau.chu_chinh, fontSize: s(15) }]}>
                {item.noi_dung}
            </Text>
        </Animated.View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={mau.chu_chinh} />
                </TouchableOpacity>
                <View style={styles.headerTitleWrap}>
                    <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(18) }]}>Trợ lý AI 🤖</Text>
                    <Text style={[styles.status, { color: mau.thanh_cong, fontSize: s(12) }]}>Trực tuyến</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                ref={flatListRef}
                data={tinNhan}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.chatList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                ListFooterComponent={dangPhanHoi ? (
                    <View style={styles.typing}>
                        <Text style={{ color: mau.chu_phu, fontSize: s(12), fontStyle: 'italic' }}>AI đang suy nghĩ...</Text>
                    </View>
                ) : null}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <View style={[styles.inputContainer, { backgroundColor: mau.nen, borderTopColor: mau.vien }]}>
                    <TextInput
                        style={[styles.input, { backgroundColor: laToi ? '#1E293B' : '#F3F4F6', color: mau.chu_chinh, fontSize: s(15) }]}
                        placeholder="Hỏi về cây trồng..."
                        placeholderTextColor={mau.chu_nhat}
                        value={nhap}
                        onChangeText={setNhap}
                        multiline
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, { backgroundColor: nhap.trim() ? mau.xanh_chinh : mau.chu_nhat }]}
                        onPress={goiTinNhan}
                        disabled={!nhap.trim()}
                    >
                        <Ionicons name="send" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    headerTitleWrap: { flex: 1, alignItems: 'center' },
    title: { fontWeight: '700' },
    status: { fontWeight: '600', marginTop: 2 },
    chatList: { padding: 20, gap: 16 },
    msgBubble: {
        maxWidth: '80%',
        padding: 14,
        borderRadius: 18,
    },
    msgText: { lineHeight: 22 },
    typing: { paddingLeft: 10, marginTop: -8 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 12,
        gap: 10,
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        maxHeight: 100,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default TroLyAiScreen;
