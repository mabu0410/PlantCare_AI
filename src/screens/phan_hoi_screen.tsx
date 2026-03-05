// Phản hồi Screen — Feedback & Bug Report form
import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { useToast } from '../components/thong_bao_toast';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'PhanHoi'>;
};

type LoaiPhanHoi = 'bug' | 'tinh_nang' | 'gop_y' | 'khac';

const PhanHoiScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const { hienToast } = useToast();

    const LOAI_OPTIONS: { id: LoaiPhanHoi; label: string; icon: string; color: string }[] = useMemo(() => [
        { id: 'bug', label: t('ph_loai_bug'), icon: 'bug-outline', color: '#F87171' },
        { id: 'tinh_nang', label: t('ph_loai_tinhnang'), icon: 'bulb-outline', color: '#FBBF24' },
        { id: 'gop_y', label: t('ph_loai_gopy'), icon: 'color-palette-outline', color: '#60A5FA' },
        { id: 'khac', label: t('ph_loai_khac'), icon: 'ellipsis-horizontal-outline', color: '#A78BFA' },
    ], [t]);

    const [loai, setLoai] = useState<LoaiPhanHoi>('bug');
    const [noi_dung, setNoiDung] = useState('');
    const [email, setEmail] = useState('');
    const [dangGui, setDangGui] = useState(false);

    const handleSubmit = async () => {
        if (!noi_dung.trim()) {
            hienToast(t('ph_toast_loi_mota'), 'canh_bao');
            return;
        }
        setDangGui(true);
        // Giả lập gửi
        await new Promise(r => setTimeout(r, 1500));
        setDangGui(false);
        hienToast(t('ph_toast_tc_t'), 'thanh_cong', t('ph_toast_tc_m'));
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: mau.nen }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={[styles.backBtn, { backgroundColor: mau.nen_the }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={s(22)} color={mau.chu_chinh} />
                    </TouchableOpacity>
                    <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(17) }]}>{t('ph_tieude_chinh')}</Text>
                    <View style={{ width: 42 }} />
                </View>

                <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                    {/* Hero */}
                    <Animated.View entering={FadeInDown.duration(400)}>
                        <View style={[styles.hero, { backgroundColor: mau.nen_the }]}>
                            <Text style={{ fontSize: s(40) }}>💬</Text>
                            <Text style={[styles.heroTitle, { color: mau.chu_chinh, fontSize: s(18) }]}>
                                {t('ph_hero_t')}
                            </Text>
                            <Text style={[styles.heroSub, { color: mau.chu_phu, fontSize: s(14) }]}>
                                {t('ph_hero_m')}
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Loại phản hồi */}
                    <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                        <Text style={[styles.label, { color: mau.chu_chinh, fontSize: s(15) }]}>{t('ph_loai_label')}</Text>
                        <View style={styles.loaiGrid}>
                            {LOAI_OPTIONS.map(opt => (
                                <TouchableOpacity
                                    key={opt.id}
                                    style={[
                                        styles.loaiBtn,
                                        {
                                            backgroundColor: loai === opt.id ? opt.color + '20' : mau.nen_the,
                                            borderColor: loai === opt.id ? opt.color : mau.vien,
                                        },
                                    ]}
                                    onPress={() => setLoai(opt.id)}
                                >
                                    <Ionicons name={opt.icon as any} size={s(20)} color={opt.color} />
                                    <Text style={[styles.loaiText, { color: loai === opt.id ? opt.color : mau.chu_phu, fontSize: s(13) }]}>
                                        {opt.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>

                    {/* Nội dung */}
                    <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                        <Text style={[styles.label, { color: mau.chu_chinh, fontSize: s(15) }]}>
                            {t('ph_mota_label')} <Text style={{ color: mau.nguy_hiem }}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.textarea,
                                {
                                    backgroundColor: mau.nen_the,
                                    borderColor: mau.vien,
                                    color: mau.chu_chinh,
                                    fontSize: s(14),
                                },
                            ]}
                            placeholder={t('ph_mota_placeholder')}
                            placeholderTextColor={mau.chu_nhat}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top"
                            value={noi_dung}
                            onChangeText={setNoiDung}
                        />
                        <Text style={[styles.charCount, { color: mau.chu_nhat, fontSize: s(12) }]}>
                            {noi_dung.length}/500
                        </Text>
                    </Animated.View>

                    {/* Email */}
                    <Animated.View entering={FadeInDown.delay(300).duration(400)}>
                        <Text style={[styles.label, { color: mau.chu_chinh, fontSize: s(15) }]}>
                            {t('ph_email_label')} <Text style={{ color: mau.chu_nhat, fontSize: s(13) }}>{t('ph_email_hint')}</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                {
                                    backgroundColor: mau.nen_the,
                                    borderColor: mau.vien,
                                    color: mau.chu_chinh,
                                    fontSize: s(14),
                                },
                            ]}
                            placeholder={t('ph_email_placeholder')}
                            placeholderTextColor={mau.chu_nhat}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </Animated.View>

                    {/* Submit */}
                    <Animated.View entering={FadeInDown.delay(400).duration(400)}>
                        <TouchableOpacity
                            style={[styles.submitBtn, { opacity: dangGui ? 0.7 : 1 }]}
                            onPress={handleSubmit}
                            disabled={dangGui}
                            activeOpacity={0.8}
                        >
                            <LinearGradient
                                colors={mau.gradient_chinh}
                                style={styles.btnGradient}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                            >
                                {dangGui ? (
                                    <Text style={[styles.btnText, { fontSize: s(16) }]}>{t('ph_nut_danggui')}</Text>
                                ) : (
                                    <>
                                        <Ionicons name="send-outline" size={s(18)} color="#FFF" />
                                        <Text style={[styles.btnText, { fontSize: s(16) }]}>{t('ph_nut_gui')}</Text>
                                    </>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    backBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { fontWeight: '700' },
    scroll: { paddingHorizontal: 20, paddingBottom: 60, gap: 20 },
    hero: {
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        gap: 8,
    },
    heroTitle: { fontWeight: '800' },
    heroSub: { textAlign: 'center' },
    label: { fontWeight: '700', marginBottom: 10 },
    loaiGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    loaiBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1.5,
        minWidth: '45%',
        flex: 1,
    },
    loaiText: { fontWeight: '600' },
    textarea: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
        minHeight: 130,
        lineHeight: 22,
    },
    charCount: { textAlign: 'right', marginTop: 6 },
    input: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 14,
    },
    submitBtn: { borderRadius: 16, overflow: 'hidden' },
    btnGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
    },
    btnText: { color: '#FFF', fontWeight: '800' },
});

export default PhanHoiScreen;
