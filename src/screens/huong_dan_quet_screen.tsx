// Hướng dẫn quét Screen — Tutorial 3 bước tương tác
import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Animated, {
    FadeInRight,
    FadeOutLeft,
    FadeIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'HuongDanQuet'>;
};

const HuongDanQuetScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const [buocHienTai, setBuocHienTai] = useState(0);

    const buoc = useMemo(() => [
        {
            emoji: '📸',
            tieu_de: t('hdq_b1_t'),
            mo_ta: t('hdq_b1_m'),
            meo: t('hdq_b1_meo'),
            mauNen: ['#1B4332', '#2D6A4F'] as [string, string],
        },
        {
            emoji: '☀️',
            tieu_de: t('hdq_b2_t'),
            mo_ta: t('hdq_b2_m'),
            meo: t('hdq_b2_meo'),
            mauNen: ['#1E3A5F', '#2E5987'] as [string, string],
        },
        {
            emoji: '🔍',
            tieu_de: t('hdq_b3_t'),
            mo_ta: t('hdq_b3_m'),
            meo: t('hdq_b3_meo'),
            mauNen: ['#3B1F0F', '#6B3A1F'] as [string, string],
        },
    ], [t]);

    const data = buoc[buocHienTai];

    const tiepTheo = () => {
        if (buocHienTai < buoc.length - 1) {
            setBuocHienTai(b => b + 1);
        } else {
            navigation.replace('Camera');
        }
    };

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
                <Text style={[styles.headerTitle, { color: mau.chu_chinh, fontSize: s(17) }]}>
                    {t('hdq_tieude_chinh')}
                </Text>
                <TouchableOpacity onPress={() => navigation.replace('Camera')}>
                    <Text style={[styles.skipText, { color: mau.xanh_chinh, fontSize: s(14) }]}>{t('hdq_boqua')}</Text>
                </TouchableOpacity>
            </View>

            {/* Bước indicators */}
            <View style={styles.dots}>
                {buoc.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: i === buocHienTai ? mau.xanh_chinh : mau.vien,
                                width: i === buocHienTai ? 24 : 8,
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Content */}
            <Animated.View
                key={buocHienTai}
                entering={FadeInRight.duration(350)}
                exiting={FadeOutLeft.duration(250)}
                style={styles.content}
            >
                {/* Illustration */}
                <LinearGradient
                    colors={data.mauNen}
                    style={styles.illustration}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.emoji}>{data.emoji}</Text>
                    {/* Decorative rings */}
                    <View style={styles.ring1} />
                    <View style={styles.ring2} />
                </LinearGradient>

                {/* Bước số */}
                <Text style={[styles.buocSo, { color: mau.xanh_chinh, fontSize: s(13) }]}>
                    {t('hdq_buoc')} {buocHienTai + 1}/{buoc.length}
                </Text>

                {/* Tiêu đề */}
                <Text style={[styles.tieu_de, { color: mau.chu_chinh, fontSize: s(24) }]}>{data.tieu_de}</Text>

                {/* Mô tả */}
                <Text style={[styles.mota, { color: mau.chu_phu, fontSize: s(15) }]}>{data.mo_ta}</Text>

                {/* Mẹo */}
                <View style={[styles.meoBox, { backgroundColor: mau.xanh_chinh + '15', borderColor: mau.xanh_chinh + '30' }]}>
                    <Text style={[styles.meoText, { color: mau.xanh_chinh, fontSize: s(14) }]}>{data.meo}</Text>
                </View>
            </Animated.View>

            {/* Bottom button */}
            <View style={styles.bottom}>
                <TouchableOpacity style={styles.tiepTheoBtn} onPress={tiepTheo} activeOpacity={0.8}>
                    <LinearGradient
                        colors={mau.gradient_chinh}
                        style={styles.btnGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={[styles.btnText, { fontSize: s(17) }]}>
                            {buocHienTai === buoc.length - 1 ? t('hdq_batdau') : t('hdq_tieptheo')}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
    headerTitle: { fontWeight: '700' },
    skipText: { fontWeight: '600' },
    dots: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: 4,
        marginBottom: 24,
    },
    dot: { height: 8, borderRadius: 4 },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    illustration: {
        width: width * 0.65,
        height: width * 0.65,
        borderRadius: (width * 0.65) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        overflow: 'hidden',
        shadowColor: '#52B788',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    emoji: { fontSize: 80, zIndex: 2 },
    ring1: {
        position: 'absolute',
        width: '130%',
        height: '130%',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    ring2: {
        position: 'absolute',
        width: '160%',
        height: '160%',
        borderRadius: 999,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    buocSo: { fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
    tieu_de: { fontWeight: '800', textAlign: 'center', marginBottom: 14 },
    mota: { lineHeight: 24, textAlign: 'center', marginBottom: 20 },
    meoBox: {
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
        borderWidth: 1,
    },
    meoText: { fontWeight: '600' },
    bottom: {
        paddingHorizontal: 24,
        paddingBottom: 32,
    },
    tiepTheoBtn: { borderRadius: 16, overflow: 'hidden' },
    btnGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: { color: '#FFF', fontWeight: '800' },
});

export default HuongDanQuetScreen;
