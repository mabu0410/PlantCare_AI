// Lịch sử Screen — Scan history list
import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    Alert,
    TextInput,
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

const LichSuScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { lich_su, xoaLichSu, xoaTatCa } = usePhanTichStore();
    const [refreshing, setRefreshing] = useState(false);
    const [timKiem, setTimKiem] = useState('');
    const t = useNgonNgu();
    const s = useCoChu();

    const lichSuLocDuoc = React.useMemo(() => {
        if (!timKiem) return lich_su;
        const lowerTimKiem = timKiem.toLowerCase();
        return lich_su.filter(
            (item) =>
                item.ten_benh.toLowerCase().includes(lowerTimKiem) ||
                (item.loai_cay?.toLowerCase() || '').includes(lowerTimKiem)
        );
    }, [lich_su, timKiem]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise(r => setTimeout(r, 1000));
        setRefreshing(false);
    }, []);

    const handleDelete = useCallback(
        (id: string) => {
            Alert.alert(t('ls_xoa'), t('ls_xoaban_ghi'), [
                { text: t('ls_huy'), style: 'cancel' },
                { text: t('ls_xoa'), style: 'destructive', onPress: () => xoaLichSu(id) },
            ]);
        },
        [xoaLichSu, t]
    );

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
                    onLongPress={() => handleDelete(item.id)}
                >
                    {/* Left accent */}
                    <View
                        style={[
                            styles.accent,
                            { backgroundColor: mauMucDo(item.muc_do, mau) },
                        ]}
                    />

                    <View style={styles.cardContent}>
                        {/* Top row */}
                        <View style={styles.topRow}>
                            <View style={[styles.thumbCircle, { backgroundColor: mauMucDo(item.muc_do, mau) + '18' }]}>
                                <Text style={{ fontSize: s(24) }}>
                                    {item.loai_cay === 'Cà chua' ? '🍅' : item.loai_cay === 'Ớt' ? '🌶️' : item.loai_cay === 'Dưa chuột' ? '🥒' : '🌿'}
                                </Text>
                            </View>
                            <View style={styles.nameWrap}>
                                <Text style={[styles.cardName, { color: mau.chu_chinh, fontSize: s(15) }]} numberOfLines={1}>
                                    {item.ten_benh}
                                </Text>
                                <Text style={[styles.cardDate, { color: mau.chu_nhat, fontSize: s(12) }]}>
                                    {dinhDangNgayGio(item.ngay_phan_tich)}
                                </Text>
                            </View>
                            <View style={styles.rightCol}>
                                <Text style={[styles.cardPercent, { color: mauMucDo(item.muc_do, mau), fontSize: s(18) }]}>
                                    {item.do_chinh_xac}%
                                </Text>
                                <View style={[styles.severityPill, { backgroundColor: mauMucDo(item.muc_do, mau) + '18' }]}>
                                    <Text style={[styles.severityText, { color: mauMucDo(item.muc_do, mau), fontSize: s(11) }]}>
                                        {tenMucDo(item.muc_do, t)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Progress bar mini */}
                        <View style={[styles.miniTrack, { backgroundColor: mau.vien }]}>
                            <View
                                style={[
                                    styles.miniFill,
                                    {
                                        width: `${item.do_chinh_xac}%`,
                                        backgroundColor: mauMucDo(item.muc_do, mau),
                                    },
                                ]}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        ),
        [mau, navigation, handleDelete]
    );

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={{ fontSize: s(64) }}>🔍</Text>
            <Text style={[styles.emptyTitle, { color: mau.chu_chinh, fontSize: s(20) }]}>{t('ls_chuacols')}</Text>
            <Text style={[styles.emptySubtitle, { color: mau.chu_phu, fontSize: s(14) }]}>
                {t('ls_batdauquet')}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(24) }]}>{t('ls_tieude')}</Text>
                {lich_su.length > 0 && (
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert(t('ls_xoatatca'), t('ls_banchacchan'), [
                                { text: t('ls_huy'), style: 'cancel' },
                                { text: t('ls_xoa'), style: 'destructive', onPress: xoaTatCa },
                            ])
                        }
                    >
                        <Ionicons name="trash-outline" size={22} color={mau.nguy_hiem} />
                    </TouchableOpacity>
                )}
            </Animated.View>

            {/* Stats summary */}
            {lich_su.length > 0 && (
                <View style={[styles.summaryRow, { borderColor: mau.vien }]}>
                    <Text style={[styles.summaryText, { color: mau.chu_phu, fontSize: s(14) }]}>
                        {lichSuLocDuoc.length} {t('ls_ketqua')}
                    </Text>
                </View>
            )}

            {/* Tim kiem */}
            {lich_su.length > 0 && (
                <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                    <View
                        style={[
                            styles.searchWrap,
                            { backgroundColor: mau.nen_the, borderColor: mau.vien },
                        ]}
                    >
                        <Ionicons name="search-outline" size={s(20)} color={mau.chu_nhat} />
                        <TextInput
                            style={[styles.searchInput, { color: mau.chu_chinh, fontSize: s(15) }]}
                            placeholder={t('ls_timkiem')}
                            placeholderTextColor={mau.chu_nhat}
                            value={timKiem}
                            onChangeText={setTimKiem}
                        />
                        {timKiem.length > 0 && (
                            <TouchableOpacity onPress={() => setTimKiem('')}>
                                <Ionicons name="close-circle" size={s(20)} color={mau.chu_nhat} />
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            )}

            {/* List */}
            <FlatList
                data={lichSuLocDuoc}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={EmptyState}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={mau.xanh_chinh} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 12,
    },
    title: { fontWeight: '800' },
    summaryRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    summaryText: { fontWeight: '500' },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 12,
        paddingHorizontal: 14,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        gap: 10,
    },
    searchInput: { flex: 1, fontSize: 15 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        borderRadius: 16,
        marginTop: 12,
        borderWidth: 1,
        overflow: 'hidden',
    },
    accent: { width: 4 },
    cardContent: { flex: 1, padding: 14, gap: 10 },
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
    cardDate: { marginTop: 2 },
    rightCol: { alignItems: 'flex-end', gap: 4 },
    cardPercent: { fontWeight: '800' },
    severityPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
    severityText: { fontWeight: '700' },
    miniTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
    miniFill: { height: '100%', borderRadius: 2 },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
        gap: 12,
    },
    emptyTitle: { fontWeight: '700' },
    emptySubtitle: { textAlign: 'center' },
});

export default LichSuScreen;
