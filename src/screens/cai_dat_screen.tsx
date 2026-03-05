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
    Platform,
    Alert,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useThongBaoToast } from '../components/thong_bao_toast';
import { useCaiDatStore } from '../store/cai_dat_store';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import TheThuyTinh from '../components/the_thuy_tinh';

interface Props {
    navigation: any;
}

const CaiDatScreen: React.FC<Props> = ({ navigation }) => {
    const { mau, laToi, chuyenChuDe } = useChuDe();
    const { hienToast } = useThongBaoToast();

    // States for toggles
    const [pushEnabled, setPushEnabled] = React.useState(true);
    const [emailEnabled, setEmailEnabled] = React.useState(false);
    const [backupEnabled, setBackupEnabled] = React.useState(true);

    // States for customizable settings (Global Store)
    const { ngon_ngu, co_chu, datNgonNgu, datCoChu } = useCaiDatStore();

    // Modal state
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalType, setModalType] = React.useState<'language' | 'fontsize' | null>(null);

    const t = useNgonNgu();
    const s = useCoChu();

    const languageOptions = ['Tiếng Việt', 'English'];
    const fontSizeOptions = ['Nhỏ', 'Bình thường', 'Lớn'];

    const handleSelectOption = (opt: string) => {
        if (modalType === 'language') datNgonNgu(opt as any);
        if (modalType === 'fontsize') datCoChu(opt as any);
        setModalVisible(false);
        hienToast(t('btn_luu'), 'thanh_cong');
    };

    const sections = [
        {
            title: t('cd_giaodien'),
            items: [
                {
                    icon: 'moon-outline',
                    label: t('cd_chedotoi'),
                    type: 'toggle' as const,
                    value: laToi,
                    onToggle: chuyenChuDe,
                },
                {
                    icon: 'language-outline',
                    label: t('cd_ngonngu'),
                    type: 'nav' as const,
                    value: ngon_ngu,
                    action: 'language',
                },
                {
                    icon: 'text-outline',
                    label: t('cd_cochu'),
                    type: 'nav' as const,
                    value: co_chu,
                    action: 'fontsize',
                },
            ],
        },
        {
            title: t('cd_thongbao'),
            items: [
                {
                    icon: 'notifications-outline',
                    label: t('cd_thongbaopush'),
                    type: 'toggle' as const,
                    value: pushEnabled,
                    onToggle: (val: boolean) => {
                        setPushEnabled(val);
                        hienToast(val ? t('toast_bat_thong_bao') : t('toast_tat_thong_bao'), 'thanh_cong');
                    },
                },
                {
                    icon: 'mail-outline',
                    label: t('cd_emailthongbao'),
                    type: 'toggle' as const,
                    value: emailEnabled,
                    onToggle: (val: boolean) => {
                        setEmailEnabled(val);
                        hienToast(val ? t('toast_dang_ky_email') : t('toast_huy_email'), 'thanh_cong');
                    },
                },
            ],
        },
        {
            title: t('cd_dulieu'),
            items: [
                {
                    icon: 'cloud-upload-outline',
                    label: t('cd_tudongsaoluu'),
                    type: 'toggle' as const,
                    value: backupEnabled,
                    onToggle: (val: boolean) => {
                        setBackupEnabled(val);
                        hienToast(val ? t('toast_bat_sao_luu') : t('toast_tat_sao_luu'), 'thong_tin');
                    },
                },
                {
                    icon: 'trash-outline',
                    label: t('cd_xoacache'),
                    type: 'action' as const,
                    color: mau.nguy_hiem,
                    action: 'clearcache',
                },
            ],
        },
        {
            title: t('cd_thongtin'),
            items: [
                { icon: 'shield-checkmark-outline', label: t('cd_chinhsach'), type: 'nav' as const, screen: 'ChinhSach' },
                { icon: 'document-text-outline', label: t('cd_dieukhoan'), type: 'nav' as const, screen: 'DieuKhoan' },
                { icon: 'heart-outline', label: t('cd_danhgia'), type: 'nav' as const, screen: 'DanhGia' },
            ],
        },
    ];

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={s(22)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(20) }]}>{t('cd_title')} ⚙️</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {sections.map((section, sIdx) => (
                    <Animated.View key={section.title} entering={FadeInDown.delay(sIdx * 100).duration(400)}>
                        <Text style={[styles.sectionTitle, { color: mau.chu_phu, fontSize: s(13) }]}>
                            {section.title}
                        </Text>
                        <TheThuyTinh>
                            {section.items.map((item, idx) => {
                                const isTouchable = item.type === 'nav' || item.type === 'action';
                                const ContainerComponent = isTouchable ? TouchableOpacity : View;

                                return (
                                    <ContainerComponent
                                        key={item.label}
                                        style={[
                                            styles.settingItem,
                                            idx < section.items.length - 1 && {
                                                borderBottomWidth: 1,
                                                borderBottomColor: mau.vien,
                                            },
                                        ]}
                                        onPress={() => {
                                            if ((item as any).action) {
                                                const act = (item as any).action;
                                                if (act === 'language' || act === 'fontsize') {
                                                    setModalType(act);
                                                    setModalVisible(true);
                                                } else if (act === 'clearcache') {
                                                    Alert.alert(t('cd_xoacache'), t('xac_nhan_xoa'), [
                                                        { text: t('huy'), style: 'cancel' },
                                                        { text: t('xoa'), style: 'destructive', onPress: () => hienToast(t('tin_nhan_xoa_cache'), 'thanh_cong') }
                                                    ]);
                                                }
                                            } else if ((item as any).screen === 'DanhGia') {
                                                if (Platform.OS === 'web') {
                                                    window.alert('Đánh giá ứng dụng\n\nChuyển hướng đến App / CH Play...');
                                                } else {
                                                    import('react-native').then(({ Alert }) => {
                                                        Alert.alert('Đánh giá', 'Chuyển hướng đến App / CH Play...');
                                                    });
                                                }
                                            } else if ((item as any).screen) {
                                                navigation.navigate((item as any).screen);
                                            }
                                        }}
                                        activeOpacity={isTouchable ? 0.7 : 1}
                                    >
                                        <View style={[styles.settingIcon, { backgroundColor: (item as any).color ? (item as any).color + '15' : mau.xanh_chinh + '15' }]}>
                                            <Ionicons
                                                name={item.icon as any}
                                                size={s(20)}
                                                color={(item as any).color || mau.xanh_chinh}
                                            />
                                        </View>
                                        <Text style={[styles.settingLabel, { color: mau.chu_chinh, fontSize: s(15) }]}>
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
                                                    <Text style={[styles.navValue, { color: mau.chu_nhat, fontSize: s(13) }]}>
                                                        {item.label === t('cd_cochu')
                                                            ? ((item as any).value === 'Nhỏ' ? t('cc_nho') : (item as any).value === 'Lớn' ? t('cc_lon') : t('cc_binh_thuong'))
                                                            : (item as any).value}
                                                    </Text>
                                                )}
                                                <Ionicons name="chevron-forward" size={s(18)} color={mau.chu_nhat} />
                                            </View>
                                        )}
                                        {item.type === 'action' && (
                                            <Ionicons name="chevron-forward" size={s(18)} color={mau.chu_nhat} />
                                        )}
                                    </ContainerComponent>
                                );
                            })}
                        </TheThuyTinh>
                    </Animated.View>
                ))}
            </ScrollView>

            {/* Modal Tùy chọn */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <Animated.View entering={FadeInDown.duration(300)} style={[styles.modalContent, { backgroundColor: mau.nen }]}>
                                <Text style={[styles.modalTitle, { color: mau.chu_chinh, fontSize: s(18) }]}>
                                    {modalType === 'language' ? t('chon_ngon_ngu') : t('chon_co_chu')}
                                </Text>
                                {(modalType === 'language' ? languageOptions : fontSizeOptions).map((opt, idx) => {
                                    const isSelected = modalType === 'language' ? ngon_ngu === opt : co_chu === opt;
                                    return (
                                        <TouchableOpacity
                                            key={idx}
                                            style={[styles.modalOption, isSelected && { backgroundColor: mau.xanh_chinh + '20' }]}
                                            onPress={() => handleSelectOption(opt)}
                                        >
                                            <Text style={[styles.modalOptionText, { color: isSelected ? mau.xanh_chinh : mau.chu_chinh, fontWeight: isSelected ? '700' : '500', fontSize: s(16) }]}>
                                                {modalType === 'fontsize'
                                                    ? (opt === 'Nhỏ' ? t('cc_nho') : opt === 'Lớn' ? t('cc_lon') : t('cc_binh_thuong'))
                                                    : opt}
                                            </Text>
                                            {isSelected && <Ionicons name="checkmark-circle" size={s(20)} color={mau.xanh_chinh} />}
                                        </TouchableOpacity>
                                    );
                                })}
                            </Animated.View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
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
    title: { fontWeight: '700' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 6 },
    sectionTitle: {
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
    settingLabel: { flex: 1, fontWeight: '600' },
    navRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    navValue: { fontSize: 13 },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        width: '100%',
        maxWidth: 340,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    modalTitle: {
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    modalOptionText: {},
});

export default CaiDatScreen;
