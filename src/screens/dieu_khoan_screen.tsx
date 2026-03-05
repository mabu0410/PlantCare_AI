// Điều khoản sử dụng Screen
import React, { useMemo } from 'react';
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
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'DieuKhoan'>;
};

const DieuKhoanScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();

    const sections = useMemo(() => [
        {
            tieu_de: t('dk_tieude_1'),
            noi_dung: t('dk_noidung_1'),
        },
        {
            tieu_de: t('dk_tieude_2'),
            noi_dung: t('dk_noidung_2'),
        },
        {
            tieu_de: t('dk_tieude_3'),
            noi_dung: t('dk_noidung_3'),
        },
        {
            tieu_de: t('dk_tieude_4'),
            noi_dung: t('dk_noidung_4'),
        },
        {
            tieu_de: t('dk_tieude_5'),
            noi_dung: t('dk_noidung_5'),
        },
        {
            tieu_de: t('dk_tieude_6'),
            noi_dung: t('dk_noidung_6'),
        },
    ], [t]);

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backBtn, { backgroundColor: mau.nen_the }]}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={s(22)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(17) }]}>{t('dk_tieude_chinh')}</Text>
                <View style={{ width: 42 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Animated.View entering={FadeInDown.duration(400)}>
                    <View style={[styles.updateBadge, { backgroundColor: mau.thong_tin + '15' }]}>
                        <Ionicons name="document-text" size={s(16)} color={mau.thong_tin} />
                        <Text style={[styles.updateText, { color: mau.thong_tin, fontSize: s(13) }]}>
                            {t('dk_hieuluc')} 01/01/2026
                        </Text>
                    </View>

                    {sections.map((sec, i) => (
                        <Animated.View
                            key={sec.tieu_de}
                            entering={FadeInDown.delay(i * 80).duration(400)}
                            style={[styles.section, { borderBottomColor: mau.vien }]}
                        >
                            <Text style={[styles.secTitle, { color: mau.chu_chinh, fontSize: s(16) }]}>
                                {sec.tieu_de}
                            </Text>
                            <Text style={[styles.secContent, { color: mau.chu_phu, fontSize: s(14) }]}>
                                {sec.noi_dung}
                            </Text>
                        </Animated.View>
                    ))}
                </Animated.View>
            </ScrollView>
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
    title: { fontSize: 17, fontWeight: '700' },
    scroll: { paddingHorizontal: 20, paddingBottom: 60 },
    updateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    updateText: { fontWeight: '600' },
    section: {
        paddingVertical: 18,
        borderBottomWidth: 1,
    },
    secTitle: { fontWeight: '800', marginBottom: 10 },
    secContent: { lineHeight: 24 },
});

export default DieuKhoanScreen;
