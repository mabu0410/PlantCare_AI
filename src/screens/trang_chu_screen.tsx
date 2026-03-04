// Trang chủ Screen — Redesigned với animated hero, quick stats, scan button
import React, { useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from 'react-native';
import Animated, {
    FadeInDown,
    FadeInRight,
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { usePhanTichStore } from '../store/phan_tich_store';
import TheThuyTinh from '../components/the_thuy_tinh';
import TheThongKe from '../components/the_thong_ke';
import NutBam from '../components/nut_bam';
import { dinhDangNgay, tenMucDo, mauMucDo } from '../utils/dinh_dang';
import { MEO_NGAY_MAU } from '../utils/du_lieu_mau';

const { width } = Dimensions.get('window');

interface Props {
    navigation: any;
}

const TrangChuScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { thong_ke, lich_su } = usePhanTichStore();

    const meoNgay = useMemo(() => {
        const idx = new Date().getDay() % MEO_NGAY_MAU.length;
        return MEO_NGAY_MAU[idx];
    }, []);

    const lichSuGanDay = useMemo(() => lich_su.slice(0, 4), [lich_su]);

    // Pulse animation for scan button
    const pulseScale = useSharedValue(1);
    React.useEffect(() => {
        pulseScale.value = withRepeat(
            withSequence(
                withTiming(1.04, { duration: 1200 }),
                withTiming(1, { duration: 1200 })
            ),
            -1,
            true
        );
    }, [pulseScale]);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
    }));

    const handleCamera = useCallback(() => {
        navigation.navigate('Camera');
    }, [navigation]);

    const renderLichSuItem = useCallback(
        ({ item, index }: any) => (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('KetQua', { ketQua: item })}
            >
                <Animated.View
                    entering={FadeInRight.delay(index * 100).duration(400)}
                    style={[
                        styles.historyCard,
                        {
                            backgroundColor: mau.nen_the,
                            borderColor: mau.vien,
                            borderLeftColor: mauMucDo(item.muc_do, mau),
                            borderLeftWidth: 3,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.historyThumb,
                            { backgroundColor: mauMucDo(item.muc_do, mau) + '20' },
                        ]}
                    >
                        <Text style={{ fontSize: 24 }}>
                            {item.loai_cay === 'Cà chua' ? '🍅' : item.loai_cay === 'Ớt' ? '🌶️' : '🌿'}
                        </Text>
                    </View>
                    <View style={styles.historyInfo}>
                        <Text
                            style={[styles.historyName, { color: mau.chu_chinh }]}
                            numberOfLines={1}
                        >
                            {item.ten_benh}
                        </Text>
                        <Text style={[styles.historyDate, { color: mau.chu_nhat }]}>
                            {dinhDangNgay(item.ngay_phan_tich)}
                        </Text>
                    </View>
                    <Text
                        style={[
                            styles.historyPercent,
                            { color: mauMucDo(item.muc_do, mau) },
                        ]}
                    >
                        {item.do_chinh_xac}%
                    </Text>
                </Animated.View>
            </TouchableOpacity>
        ),
        [mau, navigation]
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Header */}
                <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
                    <View>
                        <Text style={[styles.greeting, { color: mau.chu_chinh }]}>
                            Xin chào, Nông dân! 👋
                        </Text>
                        <Text style={[styles.subtitle, { color: mau.chu_phu }]}>
                            Phát hiện bệnh cây trồng bằng AI
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.avatarCircle, { backgroundColor: mau.xanh_chinh + '20' }]}
                    >
                        <Ionicons name="person" size={22} color={mau.xanh_chinh} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Hero Card */}
                <Animated.View entering={FadeInDown.delay(150).duration(500)}>
                    <LinearGradient
                        colors={mau.gradient_chinh}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.heroCard}
                    >
                        <View style={styles.heroDecor} />
                        <View style={styles.heroContent}>
                            <MaterialCommunityIcons
                                name="leaf-circle-outline"
                                size={44}
                                color="rgba(255,255,255,0.9)"
                            />
                            <Text style={styles.heroTitle}>PlantCare AI</Text>
                            <Text style={styles.heroSubtitle}>
                                Chụp ảnh lá cây để nhận diện bệnh ngay lập tức 🔍
                            </Text>
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Scan Button */}
                <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.scanBtnWrap}>
                    <Animated.View style={pulseStyle}>
                        <NutBam
                            tieu_de="🔍  Quét Bệnh Ngay"
                            onPress={handleCamera}
                            fullWidth
                            textStyle={{ fontSize: 18 }}
                        />
                    </Animated.View>
                </Animated.View>

                {/* Quick Stats */}
                <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.statsRow}>
                    <TheThongKe
                        icon={<Ionicons name="scan-outline" size={22} color={mau.thong_tin} />}
                        gia_tri={thong_ke.so_lan_phan_tich}
                        nhan="Số lần quét"
                        delay={400}
                    />
                    <TheThongKe
                        icon={<Ionicons name="bug-outline" size={22} color={mau.canh_bao} />}
                        gia_tri={thong_ke.so_benh_phat_hien}
                        nhan="Bệnh phát hiện"
                        delay={550}
                    />
                    <TheThongKe
                        icon={<Ionicons name="leaf-outline" size={22} color={mau.thanh_cong} />}
                        gia_tri={thong_ke.so_cay_da_luu}
                        nhan="Cây đã lưu"
                        delay={700}
                    />
                </Animated.View>

                {/* Weather Widget */}
                <Animated.View entering={FadeInDown.delay(500).duration(500)}>
                    <TheThuyTinh style={styles.weatherCard}>
                        <View style={styles.weatherRow}>
                            <Text style={{ fontSize: 40 }}>🌤️</Text>
                            <View style={styles.weatherInfo}>
                                <Text style={[styles.weatherTemp, { color: mau.chu_chinh }]}>
                                    28°C
                                </Text>
                                <Text style={[styles.weatherHum, { color: mau.chu_phu }]}>
                                    Độ ẩm: 75%
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.weatherWarning, { backgroundColor: mau.canh_bao + '15' }]}>
                            <Ionicons name="warning-outline" size={16} color={mau.canh_bao} />
                            <Text style={[styles.weatherWarningText, { color: mau.canh_bao }]}>
                                Điều kiện thuận lợi cho nấm phát triển
                            </Text>
                        </View>
                    </TheThuyTinh>
                </Animated.View>

                {/* Recent History */}
                {lichSuGanDay.length > 0 && (
                    <Animated.View entering={FadeInDown.delay(600).duration(500)}>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: mau.chu_chinh }]}>
                                Lịch sử gần đây
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('LichSu')}>
                                <Text style={[styles.seeAll, { color: mau.xanh_chinh }]}>
                                    Xem tất cả →
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={lichSuGanDay}
                            renderItem={renderLichSuItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.historyList}
                        />
                    </Animated.View>
                )}

                {/* Daily Tip */}
                <Animated.View entering={FadeInDown.delay(700).duration(500)}>
                    <TheThuyTinh style={styles.tipCard}>
                        <Text style={[styles.tipTitle, { color: mau.chu_chinh }]}>Mẹo hôm nay 💡</Text>
                        <Text style={[styles.tipText, { color: mau.chu_phu }]}>{meoNgay}</Text>
                    </TheThuyTinh>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    greeting: { fontSize: 26, fontWeight: '800', letterSpacing: -0.3 },
    subtitle: { fontSize: 14, marginTop: 3 },
    avatarCircle: {
        width: 46,
        height: 46,
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroCard: {
        borderRadius: 22,
        padding: 22,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#2D6A4F',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 8,
    },
    heroDecor: {
        position: 'absolute',
        top: -40,
        right: -40,
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    heroContent: { zIndex: 1 },
    heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFF', marginTop: 10 },
    heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 6, lineHeight: 20 },
    scanBtnWrap: { marginBottom: 20 },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 18 },
    weatherCard: { marginBottom: 18 },
    weatherRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 12 },
    weatherInfo: {},
    weatherTemp: { fontSize: 28, fontWeight: '800' },
    weatherHum: { fontSize: 14 },
    weatherWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 10,
        borderRadius: 10,
    },
    weatherWarningText: { fontSize: 13, fontWeight: '600', flex: 1 },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    sectionTitle: { fontSize: 18, fontWeight: '700' },
    seeAll: { fontSize: 14, fontWeight: '600' },
    historyList: { gap: 12, paddingBottom: 4 },
    historyCard: {
        width: width * 0.55,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        gap: 10,
    },
    historyThumb: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyInfo: { flex: 1 },
    historyName: { fontSize: 14, fontWeight: '700' },
    historyDate: { fontSize: 12, marginTop: 2 },
    historyPercent: { fontSize: 16, fontWeight: '800', alignSelf: 'flex-start' },
    tipCard: { marginBottom: 18 },
    tipTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
    tipText: { fontSize: 14, lineHeight: 22 },
});

export default TrangChuScreen;
