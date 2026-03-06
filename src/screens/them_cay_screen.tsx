// Thêm Cây Screen — Add new plant to diary (Bottom Sheet style)
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ScrollView,
} from 'react-native';
import Animated, { FadeInDown, SlideInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { chamSocService } from '../services/cham_soc_service';
import { useThongBaoToast } from '../components/thong_bao_toast';

interface Props {
    navigation: any;
}

const ThemCayScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { hienToast } = useThongBaoToast();

    const [ten, setTen] = useState('');
    const [loai, setLoai] = useState('');

    const handleLuu = async () => {
        if (!ten.trim() || !loai.trim()) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Tên và Loại cây!');
            return;
        }

        const date = new Date();
        const ngayTrong = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

        await chamSocService.themNhatKy({
            ten: ten.trim(),
            loai: loai.trim(),
            ngay_trong: ngayTrong,
            ghi_chu: '',
        });

        hienToast('Đã thêm cây mới', 'thanh_cong');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Header Backdrop Fake */}
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={() => navigation.goBack()}
                />

                <Animated.View
                    entering={SlideInDown.springify().damping(18)}
                    style={[styles.sheet, { backgroundColor: mau.nen_the }]}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="close" size={28} color={mau.chu_nhat} />
                        </TouchableOpacity>
                        <Text style={[styles.title, { color: mau.chu_chinh }]}>Thêm Cây Mới</Text>
                        <TouchableOpacity onPress={handleLuu}>
                            <Ionicons name="checkmark" size={28} color={mau.xanh_chinh} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.form}>
                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: mau.chu_phu }]}>Bạn trồng cây gì? (Tên gọi)</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: mau.nen, color: mau.chu_chinh, borderColor: mau.vien }]}
                                placeholder="VD: Bé cà chua của mẹ"
                                placeholderTextColor={mau.chu_nhat}
                                value={ten}
                                onChangeText={setTen}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={[styles.label, { color: mau.chu_phu }]}>Loại giống cây trồng</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: mau.nen, color: mau.chu_chinh, borderColor: mau.vien }]}
                                placeholder="VD: Cà chua bi, Ớt chuông..."
                                placeholderTextColor={mau.chu_nhat}
                                value={loai}
                                onChangeText={setLoai}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.saveBtn, { backgroundColor: mau.xanh_chinh }]}
                            activeOpacity={0.8}
                            onPress={handleLuu}
                        >
                            <Text style={styles.saveBtnText}>Lưu vào Nhật Ký</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    ); // Return Statement End
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    backdrop: {
        flex: 1,
    },
    sheet: {
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        elevation: 20,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
            },
        }),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    form: {
        padding: 24,
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    input: {
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
    },
    saveBtn: {
        marginTop: 10,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#52B788',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ThemCayScreen;
