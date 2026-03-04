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
} from 'react-native';
import Animated, { FadeInDown, FadeInRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { usePhanTichStore } from '../store/phan_tich_store';
import { dinhDangNgayGio, tenMucDo, mauMucDo } from '../utils/dinh_dang';

interface Props {
    navigation: any;
}

const LichSuScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { lich_su, xoaLichSu, xoaTatCa } = usePhanTichStore();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await new Promise(r => setTimeout(r, 1000));
        setRefreshing(false);
    }, []);

    const handleDelete = useCallback(
        (id: string) => {
            Alert.alert('Xóa', 'Bạn muốn xóa bản ghi này?', [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => xoaLichSu(id) },
            ]);
        },
        [xoaLichSu]
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
                                <Text style={{ fontSize: 24 }}>
                                    {item.loai_cay === 'Cà chua' ? '🍅' : item.loai_cay === 'Ớt' ? '🌶️' : item.loai_cay === 'Dưa chuột' ? '🥒' : '🌿'}
                                </Text>
                            </View>
                            <View style={styles.nameWrap}>
                                <Text style={[styles.cardName, { color: mau.chu_chinh }]} numberOfLines={1}>
                                    {item.ten_benh}
                                </Text>
                                <Text style={[styles.cardDate, { color: mau.chu_nhat }]}>
                                    {dinhDangNgayGio(item.ngay_phan_tich)}
                                </Text>
                            </View>
                            <View style={styles.rightCol}>
                                <Text style={[styles.cardPercent, { color: mauMucDo(item.muc_do, mau) }]}>
                                    {item.do_chinh_xac}%
                                </Text>
                                <View style={[styles.severityPill, { backgroundColor: mauMucDo(item.muc_do, mau) + '18' }]}>
                                    <Text style={[styles.severityText, { color: mauMucDo(item.muc_do, mau) }]}>
                                        {tenMucDo(item.muc_do)}
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
            <Text style={{ fontSize: 64 }}>🔍</Text>
            <Text style={[styles.emptyTitle, { color: mau.chu_chinh }]}>Chưa có lịch sử</Text>
            <Text style={[styles.emptySubtitle, { color: mau.chu_phu }]}>
                Bắt đầu quét cây để xem kết quả ở đây
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
                <Text style={[styles.title, { color: mau.chu_chinh }]}>Lịch sử quét 📋</Text>
                {lich_su.length > 0 && (
                    <TouchableOpacity
                        onPress={() =>
                            Alert.alert('Xóa tất cả', 'Bạn chắc chắn?', [
                                { text: 'Hủy', style: 'cancel' },
                                { text: 'Xóa', style: 'destructive', onPress: xoaTatCa },
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
                    <Text style={[styles.summaryText, { color: mau.chu_phu }]}>
                        {lich_su.length} kết quả
                    </Text>
                </View>
            )}

            {/* List */}
            <FlatList
                data={lich_su}
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
    title: { fontSize: 24, fontWeight: '800' },
    summaryRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 4,
    },
    summaryText: { fontSize: 14, fontWeight: '500' },
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
    cardName: { fontSize: 15, fontWeight: '700' },
    cardDate: { fontSize: 12, marginTop: 2 },
    rightCol: { alignItems: 'flex-end', gap: 4 },
    cardPercent: { fontSize: 18, fontWeight: '800' },
    severityPill: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 10 },
    severityText: { fontSize: 11, fontWeight: '700' },
    miniTrack: { height: 4, borderRadius: 2, overflow: 'hidden' },
    miniFill: { height: '100%', borderRadius: 2 },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
        gap: 12,
    },
    emptyTitle: { fontSize: 20, fontWeight: '700' },
    emptySubtitle: { fontSize: 14, textAlign: 'center' },
});

export default LichSuScreen;
