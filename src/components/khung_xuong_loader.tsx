// Skeleton Loader components for premium feel
import React from 'react';
import { View, StyleSheet, Animated as RNAnimated, ViewStyle } from 'react-native';
import { useChuDe } from '../theme/chu_de';

interface SkeletonProps {
    width?: any;
    height?: any;
    style?: ViewStyle;
    circle?: boolean;
}

export const KhungXuong: React.FC<SkeletonProps> = ({ width, height, style, circle }) => {
    const { mau, laToi } = useChuDe();
    const opacity = React.useRef(new RNAnimated.Value(0.3)).current;

    React.useEffect(() => {
        RNAnimated.loop(
            RNAnimated.sequence([
                RNAnimated.timing(opacity, {
                    toValue: 0.7,
                    duration: 800,
                    useNativeDriver: true,
                }),
                RNAnimated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <RNAnimated.View
            style={[
                styles.skeleton,
                {
                    width,
                    height,
                    opacity,
                    backgroundColor: laToi ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    borderRadius: circle ? (typeof height === 'number' ? height / 2 : 50) : 12,
                },
                style,
            ]}
        />
    );
};

export const KetQuaSkeleton = () => {
    return (
        <View style={styles.container}>
            <KhungXuong height={220} style={styles.img} />
            <View style={styles.content}>
                <KhungXuong width="60%" height={28} style={styles.title} />
                <KhungXuong width="40%" height={16} style={styles.sub} />
                <View style={styles.row}>
                    <KhungXuong width="100%" height={40} style={styles.bar} />
                </View>
                <KhungXuong width="100%" height={100} style={styles.desc} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeleton: {
        overflow: 'hidden',
    },
    container: {
        padding: 20,
    },
    img: {
        width: '100%',
        borderRadius: 20,
        marginBottom: 20,
    },
    content: {
        gap: 12,
    },
    title: { marginBottom: 4 },
    sub: { marginBottom: 12 },
    row: { marginVertical: 8 },
    bar: { borderRadius: 20 },
    desc: { marginTop: 12, borderRadius: 16 },
});
