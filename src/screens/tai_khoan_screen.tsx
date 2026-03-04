// Tài khoản Screen — Profile + stats + quick links
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useChuDe } from '../theme/chu_de';
import { useAuthStore } from '../store/auth_store';
import { usePhanTichStore } from '../store/phan_tich_store';
import TheThuyTinh from '../components/the_thuy_tinh';
import { NGUOI_DUNG_MAU } from '../utils/du_lieu_mau';

interface Props {
    navigation: any;
}

const TaiKhoanScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const { nguoi_dung, dangXuat } = useAuthStore();
    const { thong_ke } = usePhanTichStore();
    const user = nguoi_dung || NGUOI_DUNG_MAU;

    const menuItems = [
        { icon: 'settings-outline', label: 'Cài đặt', screen: 'CaiDat', color: mau.thong_tin },
        { icon: 'bookmark-outline', label: 'Đã lưu', screen: null, color: mau.xanh_chinh },
        { icon: 'notifications-outline', label: 'Thông báo', screen: null, color: mau.canh_bao },
        { icon: 'help-circle-outline', label: 'Trợ giúp', screen: null, color: mau.thanh_cong },
        { icon: 'star-outline', label: 'Đánh giá ứng dụng', screen: null, color: '#F59E0B' },
        { icon: 'information-circle-outline', label: 'Về ứng dụng', screen: null, color: mau.chu_phu },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Profile header */}
                <Animated.View entering={FadeInDown.duration(500)}>
                    <LinearGradient
                        colors={mau.gradient_chinh}
                        style={styles.profileCard}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <View style={styles.avatarCircle}>
                            <Text style={{ fontSize: 36 }}>👨‍🌾</Text>
                        </View>
                        <Text style={styles.userName}>{user.ten}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>

                        {/* Stats */}
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{thong_ke.so_lan_phan_tich}</Text>
                                <Text style={styles.statLabel}>Lần quét</Text>
                            </View>
                            <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{thong_ke.so_benh_phat_hien}</Text>
                                <Text style={styles.statLabel}>Bệnh</Text>
                            </View>
                            <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
                            <View style={styles.statItem}>
                                <Text style={styles.statValue}>{thong_ke.so_cay_da_luu}</Text>
                                <Text style={styles.statLabel}>Cây lưu</Text>
                            </View>
                        </View>

                        {/* Decorative */}
                        <View style={styles.decor} />
                    </LinearGradient>
                </Animated.View>

                {/* Menu items */}
                <Animated.View entering={FadeInDown.delay(200).duration(500)}>
                    <TheThuyTinh>
                        {menuItems.map((item, idx) => (
                            <TouchableOpacity
                                key={item.label}
                                style={[
                                    styles.menuItem,
                                    idx < menuItems.length - 1 && {
                                        borderBottomWidth: 1,
                                        borderBottomColor: mau.vien,
                                    },
                                ]}
                                onPress={() => item.screen && navigation.navigate(item.screen)}
                            >
                                <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                                </View>
                                <Text style={[styles.menuLabel, { color: mau.chu_chinh }]}>{item.label}</Text>
                                <Ionicons name="chevron-forward" size={18} color={mau.chu_nhat} />
                            </TouchableOpacity>
                        ))}
                    </TheThuyTinh>
                </Animated.View>

                {/* Logout */}
                <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                    <TouchableOpacity
                        style={[styles.logoutBtn, { backgroundColor: mau.nguy_hiem + '12' }]}
                        onPress={() => {
                            dangXuat();
                            navigation.reset({ index: 0, routes: [{ name: 'DangNhap' }] });
                        }}
                    >
                        <Ionicons name="log-out-outline" size={20} color={mau.nguy_hiem} />
                        <Text style={[styles.logoutText, { color: mau.nguy_hiem }]}>Đăng xuất</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Version */}
                <Text style={[styles.version, { color: mau.chu_nhat }]}>PlantCare AI v2.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100, gap: 16 },
    profileCard: {
        borderRadius: 22,
        padding: 24,
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
    },
    userName: { fontSize: 22, fontWeight: '800', color: '#FFF' },
    userEmail: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
    statsRow: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 14,
        padding: 14,
        width: '100%',
    },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 22, fontWeight: '800', color: '#FFF' },
    statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
    statDivider: { width: 1, marginVertical: 4 },
    decor: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        gap: 14,
    },
    menuIcon: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuLabel: { flex: 1, fontSize: 15, fontWeight: '600' },
    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 16,
        borderRadius: 16,
    },
    logoutText: { fontSize: 16, fontWeight: '700' },
    version: { fontSize: 13, textAlign: 'center', marginTop: 4 },
});

export default TaiKhoanScreen;
