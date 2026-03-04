// TheThongKe — Animated stats card
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
} from 'react-native-reanimated';
import { useChuDe } from '../theme/chu_de';

interface Props {
    icon: React.ReactNode;
    gia_tri: number;
    nhan: string;
    delay?: number;
    mau_nen?: string;
}

const TheThongKe: React.FC<Props> = ({
    icon,
    gia_tri,
    nhan,
    delay = 0,
    mau_nen,
}) => {
    const { mau } = useChuDe();
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
        translateY.value = withDelay(
            delay,
            withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
        );
    }, [delay, opacity, translateY]);

    const animStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: mau_nen || mau.nen_the,
                    borderColor: mau.vien,
                },
                animStyle,
            ]}
        >
            <View style={styles.iconWrap}>{icon}</View>
            <Text style={[styles.value, { color: mau.chu_chinh }]}>{gia_tri}</Text>
            <Text style={[styles.label, { color: mau.chu_phu }]}>{nhan}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 18,
        padding: 14,
        borderWidth: 1,
        gap: 6,
    },
    iconWrap: {
        marginBottom: 2,
    },
    value: {
        fontSize: 24,
        fontWeight: '800',
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default React.memo(TheThongKe);
