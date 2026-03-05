// Đã lưu Screen — Saved plants / results
import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { usePhanTichStore } from '../store/phan_tich_store';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { dinhDangNgayGio, tenMucDo, mauMucDo } from '../utils/dinh_dang';

interface Props {
    navigation: any;
}

const DaLuuScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { lich_su, da_luu_ids, boLuuKetQua } = usePhanTichStore();
    const t = useNgonNgu();
    const s = useCoChu();

    // Chỉ lấy những kết quả có id nằm trong danh sách da_luu_ids
    const danhSachDaLuu = lich_su.filter(item => da_luu_ids.includes(item.id));

    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Animated.View
                entering={FadeInRight.delay(index * 80).duration(400)}
                layout={Layout.springify()}
            >
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.card, { backgroundColor: mau.nen_the, borderColor: mau.vien }]}
                    onPress={() => navigation.navigate('KetQua', { ketQua: item })}
                >
                    <View style={[styles.accent, { backgroundColor: mauMucDo(item.muc_do, mau) }]} />

                    <View style={styles.cardContent}>
                        <View style={styles.topRow}>
                            <View style={[styles.thumbCircle, { backgroundColor: mauMucDo(item.muc_do, mau) + '18' }]}>
                                <Text style={{ fontSize: s(24) }}>
                                    {item.loai_cay === 'Cà chua' ? '🍅' : item.loai_cay === 'Ớt' ? '🌶️' : item.loai_cay === 'Dưa chuột' ? '🥒' : '🌿'}
                                </Text>
                            </View>
                            <View style={styles.nameWrap}>
                                <Text style={[styles.cardName, { color: mau.chu_chinh, fontSize: s(16) }]} numberOfLines={1}>
                                    {item.ten_benh}
                                </Text>
                                <Text style={[styles.cardDate, { color: mau.chu_nhat, fontSize: s(12) }]}>
                                    {dinhDangNgayGio(item.ngay_phan_tich)}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.bookmarkBtn}
                                onPress={() => boLuuKetQua(item.id)}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="bookmark" size={22} color={mau.xanh_chinh} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        ),
        [mau, navigation, boLuuKetQua]
    );

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={{ fontSize: s(64) }}>🔖</Text>
            <Text style={[styles.emptyTitle, { color: mau.chu_chinh, fontSize: s(20) }]}>{t('dl_chualuu')}</Text>
            <Text style={[styles.emptySubtitle, { color: mau.chu_phu, fontSize: s(14) }]}>
                {t('dl_luuy_chualuu')}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={s(24)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('dl_tieude')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={danhSachDaLuu}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyState}
            />
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
    title: { fontSize: 18, fontWeight: '700' },
    listContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    accent: { width: 4 },
    cardContent: { flex: 1, padding: 14 },
    topRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    thumbCircle: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameWrap: { flex: 1 },
    cardName: { fontWeight: '700' },
    cardDate: { marginTop: 4 },
    bookmarkBtn: { padding: 4 },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        gap: 12,
    },
    emptyTitle: { fontWeight: '700' },
    emptySubtitle: { textAlign: 'center', paddingHorizontal: 40 },
});

export default DaLuuScreen;
