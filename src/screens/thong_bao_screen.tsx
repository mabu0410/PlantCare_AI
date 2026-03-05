// Thông báo Screen — Notification center
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown, FadeOutRight, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { THONG_BAO_MAU } from '../utils/du_lieu_mau';
import type { ThongBao } from '../types/kieu_du_lieu';
import { dinhDangNgayGio } from '../utils/dinh_dang';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'ThongBao'>;
};

const LOAI_CONFIG = {
    canh_bao: { icon: 'warning', color: '#FBBF24', bg: '#FBBF2415' },
    thanh_cong: { icon: 'checkmark-circle', color: '#34D399', bg: '#34D39915' },
    thong_tin: { icon: 'information-circle', color: '#60A5FA', bg: '#60A5FA15' },
};

const ThongBaoScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const [danh_sach, setDanhSach] = useState<ThongBao[]>(THONG_BAO_MAU);

    const docThongBao = (id: string) => {
        setDanhSach(prev => prev.map(tb => tb.id === id ? { ...tb, da_doc: true } : tb));
    };

    const xoaThongBao = (id: string) => {
        setDanhSach(prev => prev.filter(tb => tb.id !== id));
    };

    const docTatCa = () => {
        setDanhSach(prev => prev.map(tb => ({ ...tb, da_doc: true })));
    };

    const chuaDoc = danh_sach.filter(tb => !tb.da_doc).length;

    const renderItem = ({ item, index }: { item: ThongBao; index: number }) => {
        const config = LOAI_CONFIG[item.loai];
        return (
            <Animated.View
                entering={FadeInDown.delay(index * 60).duration(350)}
                exiting={FadeOutRight.duration(300)}
                layout={Layout.springify()}
            >
                <TouchableOpacity
                    style={[
                        styles.card,
                        {
                            backgroundColor: item.da_doc ? mau.nen_the : config.bg,
                            borderColor: item.da_doc ? mau.vien : config.color + '40',
                        },
                    ]}
                    onPress={() => docThongBao(item.id)}
                    activeOpacity={0.75}
                >
                    {/* Chấm chưa đọc */}
                    {!item.da_doc && (
                        <View style={[styles.unreadDot, { backgroundColor: config.color }]} />
                    )}

                    <View style={[styles.iconWrap, { backgroundColor: config.bg }]}>
                        <Ionicons name={config.icon as any} size={s(22)} color={config.color} />
                    </View>

                    <View style={styles.cardBody}>
                        <Text style={[styles.cardTitle, { color: mau.chu_chinh, fontWeight: item.da_doc ? '600' : '800', fontSize: s(14) }]}>
                            {item.tieu_de}
                        </Text>
                        <Text style={[styles.cardContent, { color: mau.chu_phu, fontSize: s(13) }]} numberOfLines={2}>
                            {item.noi_dung}
                        </Text>
                        <Text style={[styles.cardDate, { color: mau.chu_nhat, fontSize: s(11) }]}>
                            {dinhDangNgayGio(item.ngay)}
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => xoaThongBao(item.id)}
                        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    >
                        <Ionicons name="close" size={16} color={mau.chu_nhat} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyWrap}>
            <Text style={{ fontSize: s(60) }}>🔔</Text>
            <Text style={[styles.emptyTitle, { color: mau.chu_chinh, fontSize: s(20) }]}>{t('tb_trong_t')}</Text>
            <Text style={[styles.emptySub, { color: mau.chu_phu, fontSize: s(14) }]}>
                {t('tb_trong_m')}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backBtn, { backgroundColor: mau.nen_the }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={s(22)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(20) }]}>{t('tb_tieude_chinh')}</Text>
                    {chuaDoc > 0 && (
                        <Text style={[styles.badge, { color: mau.xanh_chinh, fontSize: s(12) }]}>
                            {chuaDoc} {t('tb_chuadoc')}
                        </Text>
                    )}
                </View>
                {chuaDoc > 0 ? (
                    <TouchableOpacity onPress={docTatCa}>
                        <Text style={[styles.readAll, { color: mau.xanh_chinh, fontSize: s(13) }]}>{t('tb_doctatca')}</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={{ width: 60 }} />
                )}
            </View>

            <FlatList
                data={danh_sach}
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
    title: { fontWeight: '800', textAlign: 'center' },
    badge: { fontWeight: '600', textAlign: 'center', marginTop: 2 },
    readAll: { fontWeight: '700' },
    listContent: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 100 },
    card: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        gap: 12,
        position: 'relative',
    },
    unreadDot: {
        position: 'absolute',
        top: 14,
        right: 40,
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    iconWrap: {
        width: 42,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardBody: { flex: 1 },
    cardTitle: { marginBottom: 4 },
    cardContent: { lineHeight: 19 },
    cardDate: { marginTop: 6 },
    deleteBtn: {
        padding: 4,
        alignSelf: 'flex-start',
    },
    emptyWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        gap: 12,
        paddingHorizontal: 40,
    },
    emptyTitle: { fontWeight: '700' },
    emptySub: { textAlign: 'center', lineHeight: 22 },
});

export default ThongBaoScreen;
