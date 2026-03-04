// Cài đặt Screen — Settings with toggles
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import TheThuyTinh from '../components/the_thuy_tinh';

interface Props {
    navigation: any;
}

const CaiDatScreen: React.FC<Props> = ({ navigation }) => {
    const { mau, laToi, chuyenChuDe } = useChuDe();

    const sections = [
        {
            title: 'Giao diện',
            items: [
                {
                    icon: 'moon-outline',
                    label: 'Chế độ tối',
                    type: 'toggle' as const,
                    value: laToi,
                    onToggle: chuyenChuDe,
                },
                {
                    icon: 'language-outline',
                    label: 'Ngôn ngữ',
                    type: 'nav' as const,
                    value: 'Tiếng Việt',
                },
                {
                    icon: 'text-outline',
                    label: 'Cỡ chữ',
                    type: 'nav' as const,
                    value: 'Bình thường',
                },
            ],
        },
        {
            title: 'Thông báo',
            items: [
                {
                    icon: 'notifications-outline',
                    label: 'Thông báo push',
                    type: 'toggle' as const,
                    value: true,
                    onToggle: () => { },
                },
                {
                    icon: 'mail-outline',
                    label: 'Email thông báo',
                    type: 'toggle' as const,
                    value: false,
                    onToggle: () => { },
                },
            ],
        },
        {
            title: 'Dữ liệu',
            items: [
                {
                    icon: 'cloud-upload-outline',
                    label: 'Tự động sao lưu',
                    type: 'toggle' as const,
                    value: true,
                    onToggle: () => { },
                },
                {
                    icon: 'trash-outline',
                    label: 'Xóa cache',
                    type: 'action' as const,
                    color: mau.nguy_hiem,
                },
            ],
        },
        {
            title: 'Thông tin',
            items: [
                { icon: 'shield-checkmark-outline', label: 'Chính sách bảo mật', type: 'nav' as const },
                { icon: 'document-text-outline', label: 'Điều khoản sử dụng', type: 'nav' as const },
                { icon: 'heart-outline', label: 'Đánh giá ứng dụng', type: 'nav' as const },
            ],
        },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh }]}>Cài đặt ⚙️</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {sections.map((section, sIdx) => (
                    <Animated.View key={section.title} entering={FadeInDown.delay(sIdx * 100).duration(400)}>
                        <Text style={[styles.sectionTitle, { color: mau.chu_phu }]}>
                            {section.title}
                        </Text>
                        <TheThuyTinh>
                            {section.items.map((item, idx) => (
                                <View
                                    key={item.label}
                                    style={[
                                        styles.settingItem,
                                        idx < section.items.length - 1 && {
                                            borderBottomWidth: 1,
                                            borderBottomColor: mau.vien,
                                        },
                                    ]}
                                >
                                    <View style={[styles.settingIcon, { backgroundColor: (item as any).color ? (item as any).color + '15' : mau.xanh_chinh + '15' }]}>
                                        <Ionicons
                                            name={item.icon as any}
                                            size={20}
                                            color={(item as any).color || mau.xanh_chinh}
                                        />
                                    </View>
                                    <Text style={[styles.settingLabel, { color: mau.chu_chinh }]}>
                                        {item.label}
                                    </Text>
                                    {item.type === 'toggle' && (
                                        <Switch
                                            value={item.value as boolean}
                                            onValueChange={item.onToggle}
                                            trackColor={{
                                                false: mau.vien,
                                                true: mau.xanh_chinh + '60',
                                            }}
                                            thumbColor={item.value ? mau.xanh_chinh : mau.chu_nhat}
                                        />
                                    )}
                                    {item.type === 'nav' && (
                                        <View style={styles.navRight}>
                                            {(item as any).value && (
                                                <Text style={[styles.navValue, { color: mau.chu_nhat }]}>
                                                    {(item as any).value}
                                                </Text>
                                            )}
                                            <Ionicons name="chevron-forward" size={18} color={mau.chu_nhat} />
                                        </View>
                                    )}
                                    {item.type === 'action' && (
                                        <Ionicons name="chevron-forward" size={18} color={mau.chu_nhat} />
                                    )}
                                </View>
                            ))}
                        </TheThuyTinh>
                    </Animated.View>
                ))}
            </ScrollView>
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
        paddingBottom: 8,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { fontSize: 20, fontWeight: '700' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 6 },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 1,
        paddingVertical: 10,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        gap: 14,
    },
    settingIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingLabel: { flex: 1, fontSize: 15, fontWeight: '600' },
    navRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    navValue: { fontSize: 13 },
});

export default CaiDatScreen;
