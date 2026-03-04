// ThanhTienTrinh — Animated progress bar
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { useChuDe } from '../theme/chu_de';

interface Props {
    gia_tri: number; // 0 - 100
    label?: string;
    hien_phan_tram?: boolean;
    mau_thanh?: string;
    chieu_cao?: number;
}

const ThanhTienTrinh: React.FC<Props> = ({
    gia_tri,
    label,
    hien_phan_tram = true,
    mau_thanh,
    chieu_cao = 10,
}) => {
    const { mau } = useChuDe();
    const width = useSharedValue(0);

    useEffect(() => {
        width.value = withTiming(gia_tri, {
            duration: 1200,
            easing: Easing.out(Easing.cubic),
        });
    }, [gia_tri, width]);

    const animStyle = useAnimatedStyle(() => ({
        width: `${width.value}%`,
    }));

    const mauTheoMucDo = () => {
        if (gia_tri >= 80) return mau.muc_thap;
        if (gia_tri >= 60) return mau.muc_trung_binh;
        if (gia_tri >= 40) return mau.muc_cao;
        return mau.muc_nghiem_trong;
    };

    const barColor = mau_thanh || mauTheoMucDo();

    return (
        <View style={styles.container}>
            {(label || hien_phan_tram) && (
                <View style={styles.labelRow}>
                    {label && <Text style={[styles.label, { color: mau.chu_phu }]}>{label}</Text>}
                    {hien_phan_tram && (
                        <Text style={[styles.percent, { color: barColor }]}>
                            {Math.round(gia_tri)}%
                        </Text>
                    )}
                </View>
            )}
            <View
                style={[
                    styles.track,
                    { height: chieu_cao, backgroundColor: mau.vien },
                ]}
            >
                <Animated.View
                    style={[
                        styles.fill,
                        { backgroundColor: barColor, borderRadius: chieu_cao / 2 },
                        animStyle,
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    percent: {
        fontSize: 18,
        fontWeight: '800',
    },
    track: {
        borderRadius: 5,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
    },
});

export default React.memo(ThanhTienTrinh);
