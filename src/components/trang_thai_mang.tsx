// OfflineBanner — Dải cảnh báo mất mạng
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useNetworkState } from '../hooks/useNetworkState';

const TrangThaiMang: React.FC = () => {
    const { isConnected } = useNetworkState();
    const translateY = useSharedValue(-60);
    const [visible, setVisible] = React.useState(false);

    useEffect(() => {
        if (!isConnected) {
            setVisible(true);
            translateY.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.exp) });
        } else {
            translateY.value = withTiming(-60, { duration: 350 }, () => { });
            setTimeout(() => setVisible(false), 400);
        }
    }, [isConnected]);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    if (!visible) return null;

    return (
        <Animated.View style={[styles.banner, animStyle]}>
            <View style={styles.content}>
                <Ionicons name="wifi-outline" size={16} color="#FFF" />
                <Text style={styles.text}>Không có kết nối mạng</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#EF4444',
        zIndex: 999,
        paddingVertical: 8,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '700',
    },
});

export default TrangThaiMang;
