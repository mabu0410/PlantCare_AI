// Lịch chăm sóc Screen — View and manage care tasks
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { chamSocService, NhiemVu } from '../services/cham_soc_service';
import TheThuyTinh from '../components/the_thuy_tinh';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { dinhDangNgay } from '../utils/dinh_dang';

interface Props {
    navigation: any;
}

const LichChamSocScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const [nhiemVu, setNhiemVu] = useState<NhiemVu[]>([]);
    const [dangTai, setDangTai] = useState(true);
    const t = useNgonNgu();
    const s = useCoChu();

    const taiDuLieu = useCallback(async () => {
        setDangTai(true);
        await chamSocService.khoiTaoDuLieuMau();
        const data = await chamSocService.layDanhSachNhiemVu();
        setNhiemVu(data);
        setDangTai(false);
    }, []);

    useEffect(() => {
        taiDuLieu();
    }, [taiDuLieu]);

    const handleToggle = async (id: string, currentlyDone: boolean) => {
        await chamSocService.capNhatTrangThai(id, !currentlyDone);
        setNhiemVu(prev => prev.map(nv => nv.id === id ? { ...nv, hoan_thanh: !currentlyDone } : nv));
    };

    const handleDelete = (id: string) => {
        Alert.alert(t('cd_xoacache'), t('xac_nhan_xoa'), [
            { text: t('huy'), style: 'cancel' },
            {
                text: t('xoa'),
                style: 'destructive',
                onPress: async () => {
                    await chamSocService.xoaNhiemVu(id);
                    setNhiemVu(prev => prev.filter(nv => nv.id !== id));
                }
            }
        ]);
    };

    const getIcon = (loai: string) => {
        switch (loai) {
            case 'tuoi_nuoc': return <Ionicons name="water" size={24} color={mau.xanh_chinh} />;
            case 'bon_phan': return <MaterialCommunityIcons name="flask-outline" size={24} color="#A5D6A7" />;
            case 'cat_tia': return <Ionicons name="cut-outline" size={24} color="#BDBDBD" />;
            default: return <Ionicons name="leaf-outline" size={24} color={mau.xanh_chinh} />;
        }
    };

    const renderItem = ({ item, index }: { item: NhiemVu, index: number }) => (
        <Animated.View entering={FadeInRight.delay(index * 100).duration(400)}>
            <TheThuyTinh style={StyleSheet.flatten([styles.taskCard, item.hoan_thanh && { opacity: 0.6 }])}>
                <View style={styles.taskIcon}>{getIcon(item.loai)}</View>
                <View style={styles.taskInfo}>
                    <Text style={[
                        styles.taskTitle,
                        { color: mau.chu_chinh, fontSize: s(16) },
                        item.hoan_thanh && styles.textDone
                    ]}>
                        {item.tieu_de}
                    </Text>
                    <Text style={[styles.taskDate, { color: mau.chu_nhat, fontSize: s(12) }]}>
                        {dinhDangNgay(item.ngay)}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={() => handleToggle(item.id, item.hoan_thanh)}
                        style={[
                            styles.checkBtn,
                            { borderColor: item.hoan_thanh ? mau.thanh_cong : mau.vien },
                            item.hoan_thanh && { backgroundColor: mau.thanh_cong }
                        ]}
                    >
                        {item.hoan_thanh && <Ionicons name="checkmark" size={16} color="#FFF" />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(item.id)}>
                        <Ionicons name="trash-outline" size={20} color={mau.nguy_hiem} />
                    </TouchableOpacity>
                </View>
            </TheThuyTinh>
        </Animated.View>
    );

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(22) }]}>Lịch Chăm Sóc 🗓️</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => Alert.alert('Thông báo', 'Tính năng thêm nhiệm vụ đang được phát triển')}>
                    <Ionicons name="add" size={24} color={mau.xanh_chinh} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={nhiemVu}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="calendar-outline" size={64} color={mau.chu_nhat} />
                        <Text style={[styles.emptyText, { color: mau.chu_nhat, fontSize: s(14) }]}>Không có nhiệm vụ nào</Text>
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
    taskCard: { flexDirection: 'row', alignItems: 'center', padding: 16 },
    taskIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    taskInfo: { flex: 1 },
    taskTitle: { fontWeight: '700' },
    taskDate: { marginTop: 4 },
    textDone: { textDecorationLine: 'line-through' },
    actions: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    checkBtn: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100, gap: 16 },
    emptyText: { fontWeight: '500' },
});

export default LichChamSocScreen;
