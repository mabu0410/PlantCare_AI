// NutBam — Animated button với scale + haptic feedback
import React, { useCallback } from 'react';
import {
    Text,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Pressable,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useChuDe } from '../theme/chu_de';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props {
    tieu_de: string;
    onPress: () => void;
    loai?: 'chinh' | 'phu' | 'vien' | 'nguy_hiem';
    icon?: React.ReactNode;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    fullWidth?: boolean;
}

const NutBam: React.FC<Props> = ({
    tieu_de,
    onPress,
    loai = 'chinh',
    icon,
    disabled = false,
    style,
    textStyle,
    fullWidth = false,
}) => {
    const { mau } = useChuDe();
    const scale = useSharedValue(1);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = useCallback(() => {
        scale.value = withSpring(0.96, { damping: 15, stiffness: 400 });
    }, [scale]);

    const handlePressOut = useCallback(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }, [scale]);

    const handlePress = useCallback(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
    }, [onPress]);

    const isGradient = loai === 'chinh';
    const bgColor =
        loai === 'phu'
            ? mau.nen_the
            : loai === 'vien'
                ? 'transparent'
                : loai === 'nguy_hiem'
                    ? mau.nguy_hiem
                    : mau.xanh_chinh;

    const borderStyle =
        loai === 'vien'
            ? { borderWidth: 2, borderColor: mau.xanh_chinh }
            : undefined;

    const textColor =
        loai === 'phu'
            ? mau.xanh_chinh
            : loai === 'vien'
                ? mau.xanh_chinh
                : mau.trang;

    const content = (
        <>
            {icon && <>{icon}</>}
            <Text
                style={[
                    styles.text,
                    { color: textColor, marginLeft: icon ? 8 : 0 },
                    textStyle,
                ]}
            >
                {tieu_de}
            </Text>
        </>
    );

    return (
        <AnimatedPressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={[
                animStyle,
                styles.container,
                fullWidth && styles.fullWidth,
                { opacity: disabled ? 0.5 : 1 },
                style,
            ]}
        >
            {isGradient ? (
                <LinearGradient
                    colors={mau.gradient_chinh}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.gradient, borderStyle]}
                >
                    {content}
                </LinearGradient>
            ) : (
                <Animated.View
                    style={[
                        styles.gradient,
                        { backgroundColor: bgColor },
                        borderStyle,
                    ]}
                >
                    {content}
                </Animated.View>
            )}
        </AnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    fullWidth: {
        width: '100%',
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default React.memo(NutBam);
