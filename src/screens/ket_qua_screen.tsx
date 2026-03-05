// Kết quả Screen — Diagnosis result with animated confidence + expandable sections
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ActivityIndicator,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInUp,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    withRepeat,
    withSequence,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { usePhanTichStore } from '../store/phan_tich_store';
import TheThuyTinh from '../components/the_thuy_tinh';
import ThanhTienTrinh from '../components/thanh_tien_trinh';
import NutBam from '../components/nut_bam';
import { tenMucDo, mauMucDo, dinhDangNgayGio } from '../utils/dinh_dang';
import type { KetQuaPhanTich } from '../types/kieu_du_lieu';
import { KetQuaSkeleton } from '../components/khung_xuong_loader';
import { chamSocService } from '../services/cham_soc_service';
import { useThongBaoToast } from '../components/thong_bao_toast';

interface Props {
    navigation: any;
    route: any;
}

const KetQuaScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const { batDauPhanTich, ket_qua_hien_tai, dang_phan_tich } = usePhanTichStore();
    const { hienToast } = useThongBaoToast();
    const [ketQua, setKetQua] = useState<KetQuaPhanTich | null>(route.params?.ketQua || null);
    const [activeTab, setActiveTab] = useState(0);

    const imageUri = route.params?.imageUri;

    // Loading animation
    const [loadingText, setLoadingText] = useState(t('kq_dang_xuly'));
    const scanLineY = useSharedValue(0);
    const progressWidth = useSharedValue(0);

    useEffect(() => {
        if (!ketQua && !dang_phan_tich) {
            // Start analysis
            scanLineY.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);

            const texts = [
                t('kq_dang_xuly'),
                t('kq_trich_xuat'),
                t('kq_doi_chieu'),
                t('kq_hoan_thien'),
            ];
            let i = 0;
            const interval = setInterval(() => {
                i++;
                if (i < texts.length) setLoadingText(texts[i]);
            }, 1200);

            progressWidth.value = withTiming(100, {
                duration: 4000,
                easing: Easing.out(Easing.cubic),
            });

            batDauPhanTich(imageUri || 'mock_image').then((result) => {
                setKetQua(result);
                clearInterval(interval);
            });

            return () => clearInterval(interval);
        }
    }, []);

    const scanStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: scanLineY.value * 200 }],
    }));

    const progStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`,
    }));

    // Loading state
    if (!ketQua) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={s(24)} color={mau.chu_chinh} />
                    </TouchableOpacity>
                    <Text style={[styles.headerTitle, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('kq_tieude_chinh')}</Text>
                    <View style={{ width: 40 }} />
                </View>
                <KetQuaSkeleton />
                <View style={{ alignItems: 'center', padding: 20 }}>
                    <Text style={[styles.loadingText, { color: mau.chu_phu, fontSize: s(14) }]}>{loadingText}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const tabs = [t('kq_tab_trieuchung'), t('kq_tab_dieutri'), t('kq_tab_phongngua')];
    const tabContent = [ketQua.trieu_chung, ketQua.dieu_tri, ketQua.phong_ngua];

    const handleLuu = async () => {
        if (!ketQua) return;
        try {
            const plant = await chamSocService.themNhatKy({
                ten: ketQua.ten_benh,
                loai: ketQua.loai_cay || 'Cây trồng',
                ngay_trong: new Date().toISOString().split('T')[0],
                ghi_chu: `Chẩn đoán: ${ketQua.ten_benh} (${ketQua.do_chinh_xac}%)`,
                anh_uri: imageUri,
            });
            // Auto generate reminders
            await chamSocService.taoNhiemVuTuDong(plant.ten, plant.loai);

            hienToast('Đã lưu vào Nhật ký & Tạo lời nhắc!', 'thanh_cong');
            navigation.navigate('NhatKyCay');
        } catch (e) {
            hienToast('Lỗi khi lưu kết quả', 'loi');
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header / Nút Back */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={s(24)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('kq_tieude_chinh')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Image with bounding box */}
                <Animated.View entering={FadeInDown.duration(500)} style={styles.imageSection}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.resultImage} />
                    ) : (
                        <View style={[styles.resultImage, styles.mockImg]}>
                            <Text style={{ fontSize: 48 }}>🍃</Text>
                        </View>
                    )}
                    {/* Bounding box overlay */}
                    <View style={[styles.boundingBox, { borderColor: mauMucDo(ketQua.muc_do, mau) }]} />
                </Animated.View>

                {/* Result Card */}
                <Animated.View entering={FadeInUp.delay(200).duration(600)}>
                    <TheThuyTinh style={styles.resultCard}>
                        {/* Disease name */}
                        <Text style={[styles.diseaseName, { color: mau.chu_chinh, fontSize: s(22) }]}>
                            🍅 {ketQua.ten_benh}
                        </Text>
                        {ketQua.ten_khoa_hoc ? (
                            <Text style={[styles.sciName, { color: mau.chu_phu, fontSize: s(14) }]}>
                                {ketQua.ten_khoa_hoc}
                            </Text>
                        ) : null}

                        {/* Confidence */}
                        <ThanhTienTrinh gia_tri={ketQua.do_chinh_xac} label={t('kq_do_chinh_xac')} />

                        {/* Severity badge */}
                        <View
                            style={[
                                styles.severityBadge,
                                { backgroundColor: mauMucDo(ketQua.muc_do, mau) + '18' },
                            ]}
                        >
                            <Text style={{ fontSize: s(14) }}>⚠️</Text>
                            <Text style={[styles.severityText, { color: mauMucDo(ketQua.muc_do, mau), fontSize: s(13) }]}>
                                {t('kq_muc_do')}: {tenMucDo(ketQua.muc_do, t)}
                            </Text>
                        </View>

                        {/* Description */}
                        <Text style={[styles.description, { color: mau.chu_phu, fontSize: s(14) }]}>{ketQua.mo_ta}</Text>
                    </TheThuyTinh>
                </Animated.View>

                {/* Tabs */}
                <Animated.View entering={FadeInUp.delay(400).duration(500)}>
                    <View style={styles.tabBar}>
                        {tabs.map((tab, idx) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tab,
                                    activeTab === idx && {
                                        borderBottomColor: mau.xanh_chinh,
                                        borderBottomWidth: 2,
                                    },
                                ]}
                                onPress={() => setActiveTab(idx)}
                            >
                                <Text
                                    style={[
                                        styles.tabText,
                                        { color: activeTab === idx ? mau.xanh_chinh : mau.chu_nhat, fontSize: s(14) },
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Tab content */}
                    <View style={styles.tabContent}>
                        {tabContent[activeTab].length > 0 ? (
                            tabContent[activeTab].map((item, idx) => (
                                <View key={idx} style={[styles.listItem, { borderLeftColor: mau.xanh_chinh }]}>
                                    <View style={[styles.listBullet, { backgroundColor: mau.xanh_chinh }]}>
                                        <Text style={[styles.bulletText, { fontSize: s(12) }]}>{idx + 1}</Text>
                                    </View>
                                    <Text style={[styles.listText, { color: mau.chu_chinh, fontSize: s(14) }]}>{item}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={[styles.emptyText, { color: mau.chu_nhat, fontSize: s(14) }]}>
                                {t('kq_trong')}
                            </Text>
                        )}
                    </View>
                </Animated.View>

                {/* Action buttons */}
                <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.actions}>
                    <NutBam
                        tieu_de={t('kq_nut_luu')}
                        onPress={handleLuu}
                        loai="vien"
                        style={{ flex: 1 }}
                    />
                    <NutBam
                        tieu_de={t('kq_nut_chia_se')}
                        onPress={() => { }}
                        loai="vien"
                        style={{ flex: 1 }}
                    />
                    <NutBam
                        tieu_de={t('kq_nut_quet_lai')}
                        onPress={() => navigation.navigate('Camera')}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            </ScrollView>
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
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    headerTitle: {
        fontWeight: '700',
    },
    scrollContent: { paddingBottom: 100 },
    // Loading
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingBg: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1a3a2a',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    scanLine: {
        position: 'absolute',
        left: 20,
        right: 20,
        height: 3,
        backgroundColor: '#52B788',
        shadowColor: '#52B788',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 12,
        elevation: 6,
    },
    loadingCard: {
        width: '80%',
        alignItems: 'center',
        gap: 16,
        padding: 28,
    },
    loadingText: { fontWeight: '600', textAlign: 'center' },
    loadingTrack: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
    loadingFill: { height: '100%', borderRadius: 3 },
    // Result
    imageSection: {
        marginHorizontal: 20,
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
    },
    resultImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
    },
    mockImg: {
        backgroundColor: '#1a3a2a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boundingBox: {
        position: 'absolute',
        top: '15%',
        left: '15%',
        width: '70%',
        height: '70%',
        borderWidth: 2,
        borderRadius: 8,
        borderStyle: 'dashed',
    },
    resultCard: { marginHorizontal: 20, marginBottom: 16 },
    diseaseName: { fontWeight: '800', marginBottom: 4 },
    sciName: { fontStyle: 'italic', marginBottom: 8 },
    severityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        marginVertical: 8,
    },
    severityText: { fontWeight: '700' },
    description: { lineHeight: 22, marginTop: 8 },
    // Tabs
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
        marginBottom: 16,
    },
    tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    tabText: { fontWeight: '700' },
    tabContent: { paddingHorizontal: 20, marginBottom: 20 },
    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
        gap: 12,
        borderLeftWidth: 2,
        paddingLeft: 12,
    },
    listBullet: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bulletText: { color: '#FFF', fontWeight: '700' },
    listText: { flex: 1, lineHeight: 22 },
    emptyText: { textAlign: 'center', paddingVertical: 20 },
    actions: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});

export default KetQuaScreen;
