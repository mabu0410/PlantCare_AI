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
import { usePhanTichStore } from '../store/phan_tich_store';
import TheThuyTinh from '../components/the_thuy_tinh';
import ThanhTienTrinh from '../components/thanh_tien_trinh';
import NutBam from '../components/nut_bam';
import { tenMucDo, mauMucDo, dinhDangNgayGio } from '../utils/dinh_dang';
import type { KetQuaPhanTich } from '../types/kieu_du_lieu';

interface Props {
    navigation: any;
    route: any;
}

const KetQuaScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mau } = useChuDe();
    const { batDauPhanTich, ket_qua_hien_tai, dang_phan_tich } = usePhanTichStore();
    const [ketQua, setKetQua] = useState<KetQuaPhanTich | null>(route.params?.ketQua || null);
    const [activeTab, setActiveTab] = useState(0);

    const imageUri = route.params?.imageUri;

    // Loading animation
    const [loadingText, setLoadingText] = useState('Đang xử lý hình ảnh...');
    const scanLineY = useSharedValue(0);
    const progressWidth = useSharedValue(0);

    useEffect(() => {
        if (!ketQua && !dang_phan_tich) {
            // Start analysis
            scanLineY.value = withRepeat(withTiming(1, { duration: 2000 }), -1, true);

            const texts = [
                'Đang xử lý hình ảnh...',
                'Trích xuất đặc điểm bệnh lý...',
                'Đối chiếu cơ sở dữ liệu...',
                'Hoàn thiện kết quả...',
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
            <View style={[styles.loadingContainer, { backgroundColor: mau.nen }]}>
                {/* Blurred background */}
                <View style={styles.loadingBg}>
                    <View style={[styles.loadingOverlay, { backgroundColor: 'rgba(0,0,0,0.6)' }]} />
                    {/* Scan line */}
                    <Animated.View style={[styles.scanLine, scanStyle]} />
                </View>

                <TheThuyTinh style={styles.loadingCard}>
                    <ActivityIndicator size="large" color={mau.xanh_chinh} />
                    <Text style={[styles.loadingText, { color: mau.chu_chinh }]}>{loadingText}</Text>
                    <View style={[styles.loadingTrack, { backgroundColor: mau.vien }]}>
                        <Animated.View style={[styles.loadingFill, { backgroundColor: mau.xanh_chinh }, progStyle]} />
                    </View>
                </TheThuyTinh>
            </View>
        );
    }

    const tabs = ['Triệu chứng', 'Điều trị', 'Phòng ngừa'];
    const tabContent = [ketQua.trieu_chung, ketQua.dieu_tri, ketQua.phong_ngua];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
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
                        <Text style={[styles.diseaseName, { color: mau.chu_chinh }]}>
                            🍅 {ketQua.ten_benh}
                        </Text>
                        {ketQua.ten_khoa_hoc ? (
                            <Text style={[styles.sciName, { color: mau.chu_phu }]}>
                                {ketQua.ten_khoa_hoc}
                            </Text>
                        ) : null}

                        {/* Confidence */}
                        <ThanhTienTrinh gia_tri={ketQua.do_chinh_xac} label="Độ chính xác" />

                        {/* Severity badge */}
                        <View
                            style={[
                                styles.severityBadge,
                                { backgroundColor: mauMucDo(ketQua.muc_do, mau) + '18' },
                            ]}
                        >
                            <Text style={{ fontSize: 14 }}>⚠️</Text>
                            <Text style={[styles.severityText, { color: mauMucDo(ketQua.muc_do, mau) }]}>
                                Mức độ: {tenMucDo(ketQua.muc_do)}
                            </Text>
                        </View>

                        {/* Description */}
                        <Text style={[styles.description, { color: mau.chu_phu }]}>{ketQua.mo_ta}</Text>
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
                                        { color: activeTab === idx ? mau.xanh_chinh : mau.chu_nhat },
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
                                        <Text style={styles.bulletText}>{idx + 1}</Text>
                                    </View>
                                    <Text style={[styles.listText, { color: mau.chu_chinh }]}>{item}</Text>
                                </View>
                            ))
                        ) : (
                            <Text style={[styles.emptyText, { color: mau.chu_nhat }]}>
                                Không phát hiện triệu chứng bất thường ✅
                            </Text>
                        )}
                    </View>
                </Animated.View>

                {/* Action buttons */}
                <Animated.View entering={FadeInUp.delay(600).duration(500)} style={styles.actions}>
                    <NutBam
                        tieu_de="💾 Lưu"
                        onPress={() => { }}
                        loai="vien"
                        style={{ flex: 1 }}
                    />
                    <NutBam
                        tieu_de="📤 Chia sẻ"
                        onPress={() => { }}
                        loai="vien"
                        style={{ flex: 1 }}
                    />
                    <NutBam
                        tieu_de="🔄 Quét lại"
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
    loadingText: { fontSize: 15, fontWeight: '600', textAlign: 'center' },
    loadingTrack: { width: '100%', height: 6, borderRadius: 3, overflow: 'hidden' },
    loadingFill: { height: '100%', borderRadius: 3 },
    // Result
    imageSection: {
        marginHorizontal: 20,
        marginTop: 60,
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
    diseaseName: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
    sciName: { fontSize: 14, fontStyle: 'italic', marginBottom: 8 },
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
    severityText: { fontSize: 13, fontWeight: '700' },
    description: { fontSize: 14, lineHeight: 22, marginTop: 8 },
    // Tabs
    tabBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.08)',
        marginBottom: 16,
    },
    tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
    tabText: { fontSize: 14, fontWeight: '700' },
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
    bulletText: { color: '#FFF', fontSize: 12, fontWeight: '700' },
    listText: { flex: 1, fontSize: 14, lineHeight: 22 },
    emptyText: { fontSize: 14, textAlign: 'center', paddingVertical: 20 },
    actions: {
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});

export default KetQuaScreen;
