// Nhật ký cây Screen — Manage personal garden
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { chamSocService, NhatKyCay } from '../services/cham_soc_service';
import { useThongBaoToast } from '../components/thong_bao_toast';
import TheThuyTinh from '../components/the_thuy_tinh';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
    navigation: any;
}

const NhatKyCayScreen: React.FC<Props> = ({ navigation }) => {
    const { mau, laToi } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const [danhSach, setDanhSach] = useState<NhatKyCay[]>([]);
    const [dangTai, setDangTai] = useState(true);

    const taiDuLieu = useCallback(async () => {
        setDangTai(true);
        await chamSocService.khoiTaoDuLieuMau();
        const data = await chamSocService.layDanhSachNhatKy();
        setDanhSach(data);
        setDangTai(false);
    }, []);

    useFocusEffect(
        useCallback(() => {
            taiDuLieu();
        }, [taiDuLieu])
    );

    const handleXoa = (id: string, ten: string) => {
        Alert.alert('Xác nhận', `Bạn có muốn xóa cây "${ten}" khỏi nhật ký?`, [
            { text: 'Hủy', style: 'cancel' },
            {
                text: 'Xóa',
                style: 'destructive',
                onPress: async () => {
                    await chamSocService.xoaNhatKy(id);
                    setDanhSach(prev => prev.filter(nk => nk.id !== id));
                }
            }
        ]);
    };

    const BienDoSucKhoe = ({ index }: { index: number }) => {
        const heights = [30, 45, 60, 55, 75, 80, 70];
        return (
            <View style={styles.chart}>
                {heights.map((h, i) => (
                    <View
                        key={i}
                        style={[
                            styles.bar,
                            {
                                height: h * 0.4,
                                backgroundColor: i === 6 ? mau.xanh_chinh : mau.xanh_chinh + '40',
                                opacity: (i + 1) / 7
                            }
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderItem = ({ item, index }: { item: NhatKyCay, index: number }) => (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ChiTietNhatKy', { cay: item })}
                style={{ width: '100%', marginBottom: 16 }}
            >
                <TheThuyTinh style={styles.card}>
                    <View style={styles.cardRow}>
                        <View style={[styles.thumb, { backgroundColor: mau.xanh_chinh + '20' }]}>
                            {item.anh_uri ? (
                                <Image source={{ uri: item.anh_uri }} style={styles.img} />
                            ) : (
                                <Text style={{ fontSize: 32 }}>🌿</Text>
                            )}
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.name, { color: mau.chu_chinh, fontSize: s(17) }]}>{item.ten}</Text>
                            <Text style={[styles.type, { color: mau.chu_phu, fontSize: s(13) }]}>{item.loai}</Text>
                            <BienDoSucKhoe index={index} />
                            <Text style={[styles.date, { color: mau.chu_nhat, fontSize: s(12) }]}>Trồng từ: {item.ngay_trong}</Text>
                        </View>
                        <TouchableOpacity onPress={() => handleXoa(item.id, item.ten)}>
                            <Ionicons name="trash-outline" size={20} color={mau.nguy_hiem} />
                        </TouchableOpacity>
                    </View>
                </TheThuyTinh>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(22) }]}>Khu vườn của tôi 🏡</Text>
                <TouchableOpacity
                    style={[styles.addBtn, { backgroundColor: mau.xanh_chinh }]}
                    onPress={() => navigation.navigate('ThemCay')}
                >
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={danhSach}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="leaf-outline" size={64} color={mau.chu_nhat} />
                        <Text style={[styles.emptyText, { color: mau.chu_nhat, fontSize: s(14) }]}>Khu vườn đang trống</Text>
                    </View>
                }
                refreshing={dangTai}
                onRefresh={taiDuLieu}
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
        paddingTop: 12,
        paddingBottom: 20,
    },
    backBtn: { width: 40, height: 40, justifyContent: 'center' },
    title: { fontWeight: '800' },
    addBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
    listContent: { paddingHorizontal: 20, paddingBottom: 40, gap: 12 },
    card: { padding: 12 },
    cardRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    thumb: {
        width: 70,
        height: 70,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    img: { width: '100%', height: '100%' },
    info: { flex: 1 },
    name: { fontWeight: '700' },
    type: { marginTop: 2, fontStyle: 'italic' },
    chart: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 3,
        height: 35,
        marginVertical: 8,
    },
    bar: {
        width: 6,
        borderRadius: 3,
    },
    date: { marginTop: 4 },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100, gap: 16 },
    emptyText: { fontWeight: '500' },
});

export default NhatKyCayScreen;
