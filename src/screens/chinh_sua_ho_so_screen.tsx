// Chỉnh sửa hồ sơ Screen — Edit user profile
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
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { useAuthStore } from '../store/auth_store';
import NutBam from '../components/nut_bam';

interface Props {
    navigation: any;
}

const ChinhSuaHoSoScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const { nguoi_dung, capNhatHoSo } = useAuthStore();

    const [ten, setTen] = useState(nguoi_dung?.ten || '');
    const [email, setEmail] = useState(nguoi_dung?.email || '');
    const [anhUpload, setAnhUpload] = useState<string | null>(nguoi_dung?.anh_dai_dien || null);
    const [dangLuu, setDangLuu] = useState(false);

    const handleChoosePhoto = async () => {
        // Yêu cầu quyền truy cập thư viện ảnh
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(t('cshs_quyen_t'), t('cshs_quyen_m'));
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // sửa lỗi phiên bản mới nhất
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setAnhUpload(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        setDangLuu(true);
        const success = await capNhatHoSo({
            ten,
            email,
            anh_dai_dien: anhUpload || undefined,
        });
        setDangLuu(false);
        if (success) {
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={s(24)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('cshs_tieude_chinh')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <Animated.View entering={FadeInDown.duration(400)}>
                        <View style={styles.avatarWrap}>
                            <TouchableOpacity style={styles.avatarCircle} onPress={handleChoosePhoto} activeOpacity={0.8}>
                                {anhUpload ? (
                                    <Image source={{ uri: anhUpload }} style={styles.avatarImage} />
                                ) : (
                                    <Text style={{ fontSize: s(50) }}>👨‍🌾</Text>
                                )}
                                <View style={[styles.cameraIcon, { backgroundColor: mau.xanh_chinh }]}>
                                    <Ionicons name="camera" size={16} color="#FFF" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { color: mau.chu_phu, fontSize: s(13) }]}>{t('cshs_label_hoten')}</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: mau.nen_the, color: mau.chu_chinh, borderColor: mau.vien, fontSize: s(16) }]}
                                value={ten}
                                onChangeText={setTen}
                                placeholder={t('cshs_placeholder_hoten')}
                                placeholderTextColor={mau.chu_nhat}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { color: mau.chu_phu, fontSize: s(13) }]}>{t('cshs_label_email')}</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: mau.nen_the, color: mau.chu_chinh, borderColor: mau.vien, fontSize: s(16) }]}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                placeholder={t('cshs_placeholder_email')}
                                placeholderTextColor={mau.chu_nhat}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={[styles.label, { color: mau.chu_phu, fontSize: s(13) }]}>{t('cshs_label_sdt')}</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: mau.nen_the, color: mau.chu_chinh, borderColor: mau.vien, fontSize: s(16) }]}
                                placeholder={t('cshs_placeholder_sdt')}
                                placeholderTextColor={mau.chu_nhat}
                                keyboardType="phone-pad"
                            />
                        </View>
                    </Animated.View>
                </ScrollView>

                <Animated.View entering={FadeInDown.delay(200).duration(400)} style={styles.footer}>
                    <NutBam
                        tieu_de={dangLuu ? t('cshs_dang_luu') : t('cshs_luu_thay_doi')}
                        onPress={handleSave}
                        style={{ width: '100%', opacity: dangLuu ? 0.7 : 1 }}
                    />
                </Animated.View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: { fontWeight: '700' },
    content: { padding: 20 },
    avatarWrap: { alignItems: 'center', marginVertical: 20 },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    formGroup: { marginBottom: 20 },
    label: { fontWeight: '600', marginBottom: 8, marginLeft: 4 },
    input: {
        height: 54,
        borderRadius: 14,
        paddingHorizontal: 16,
        borderWidth: 1,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: Platform.OS === 'ios' ? 20 : 30,
        paddingTop: 10,
    },
});

export default ChinhSuaHoSoScreen;
