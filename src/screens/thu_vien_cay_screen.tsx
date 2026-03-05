// Thư viện cây Screen — Plant encyclopedia
import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { CAY_TRONG_MAU } from '../utils/du_lieu_mau';
import TheThuyTinh from '../components/the_thuy_tinh';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';

interface Props {
    navigation: any;
}

const ThuVienCayScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const [timKiem, setTimKiem] = useState('');
    const t = useNgonNgu();
    const s = useCoChu();

    const cayLocDuoc = useMemo(
        () =>
            CAY_TRONG_MAU.filter(
                cay =>
                    cay.ten.toLowerCase().includes(timKiem.toLowerCase()) ||
                    cay.ten_khoa_hoc.toLowerCase().includes(timKiem.toLowerCase())
            ),
        [timKiem]
    );

    const renderItem = useCallback(
        ({ item, index }: any) => (
            <Animated.View entering={FadeInUp.delay(index * 80).duration(400)}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ChiTietBenh', { cay: item })}
                >
                    <TheThuyTinh style={styles.card}>
                        <View style={styles.cardRow}>
                            <View
                                style={[
                                    styles.iconCircle,
                                    { backgroundColor: mau.xanh_chinh + '15' },
                                ]}
                            >
                                <Text style={{ fontSize: 36 }}>{item.icon}</Text>
                            </View>
                            <View style={styles.cardInfo}>
                                <Text style={[styles.cardName, { color: mau.chu_chinh, fontSize: s(17) }]}>
                                    {item.ten}
                                </Text>
                                <Text
                                    style={[styles.cardSci, { color: mau.chu_phu, fontSize: s(13) }]}
                                    numberOfLines={1}
                                >
                                    {item.ten_khoa_hoc}
                                </Text>
                                {/* Common diseases */}
                                <View style={styles.diseaseRow}>
                                    {item.benh_thuong_gap.slice(0, 3).map((benh: string, idx: number) => (
                                        <View
                                            key={idx}
                                            style={[
                                                styles.diseasePill,
                                                { backgroundColor: mau.canh_bao + '15' },
                                            ]}
                                        >
                                            <Text
                                                style={[styles.diseaseText, { color: mau.canh_bao, fontSize: s(11) }]}
                                            >
                                                {benh}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <Ionicons
                                name="chevron-forward"
                                size={20}
                                color={mau.chu_nhat}
                            />
                        </View>
                    </TheThuyTinh>
                </TouchableOpacity>
            </Animated.View>
        ),
        [mau, navigation]
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <Animated.View entering={FadeInDown.duration(400)} style={styles.header}>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(24) }]}>
                    {t('tv_tieude')}
                </Text>
                <Text style={[styles.subtitle, { color: mau.chu_phu, fontSize: s(14) }]}>
                    {CAY_TRONG_MAU.length} {t('tv_loaicay')}
                </Text>
            </Animated.View>

            {/* Search */}
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
                        placeholder={t('tv_timkiem')}
                        placeholderTextColor={mau.chu_nhat}
                        value={timKiem}
                        onChangeText={setTimKiem}
                    />
                    {timKiem.length > 0 && (
                        <TouchableOpacity onPress={() => setTimKiem('')}>
                            <Ionicons name="close-circle" size={20} color={mau.chu_nhat} />
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>

            {/* Plant list */}
            <FlatList
                data={cayLocDuoc}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={{ fontSize: s(48) }}>🌱</Text>
                        <Text style={[styles.emptyText, { color: mau.chu_nhat, fontSize: s(16) }]}>
                            {t('tv_khongtimthay')}
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 4 },
    title: { fontSize: 24, fontWeight: '800' },
    subtitle: { fontSize: 14, marginTop: 4 },
    searchWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 14,
        paddingHorizontal: 14,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        gap: 10,
    },
    searchInput: { flex: 1, fontSize: 15 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 10 },
    card: { marginBottom: 2 },
    cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfo: { flex: 1 },
    cardName: { fontWeight: '700' },
    cardSci: { fontStyle: 'italic', marginTop: 2 },
    diseaseRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 },
    diseasePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
    diseaseText: { fontWeight: '600' },
    emptyState: { alignItems: 'center', paddingTop: 60, gap: 12 },
    emptyText: { fontWeight: '500' },
});

export default ThuVienCayScreen;
