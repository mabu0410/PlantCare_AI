// Splash Screen — Animated logo + auto-navigate
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    Easing,
    runOnJS,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { THOI_GIAN_SPLASH } from '../utils/hang_so';

const { width, height } = Dimensions.get('window');

interface Props {
    navigation: any;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();

    const logoScale = useSharedValue(0.3);
    const logoOpacity = useSharedValue(0);
    const textOpacity = useSharedValue(0);
    const textTranslateY = useSharedValue(30);
    const taglineOpacity = useSharedValue(0);

    // Floating particles
    const particle1Y = useSharedValue(height);
    const particle2Y = useSharedValue(height);
    const particle3Y = useSharedValue(height);

    useEffect(() => {
        // Logo entrance
        logoOpacity.value = withTiming(1, { duration: 800 });
        logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });

        // Title
        textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
        textTranslateY.value = withDelay(
            400,
            withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
        );

        // Tagline
        taglineOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));

        // Particles
        particle1Y.value = withDelay(
            200,
            withTiming(-100, { duration: 3000, easing: Easing.linear })
        );
        particle2Y.value = withDelay(
            500,
            withTiming(-100, { duration: 3500, easing: Easing.linear })
        );
        particle3Y.value = withDelay(
            800,
            withTiming(-100, { duration: 4000, easing: Easing.linear })
        );

        // Navigate after splash duration
        const timer = setTimeout(() => {
            navigation.replace('Onboarding');
        }, THOI_GIAN_SPLASH);

        return () => clearTimeout(timer);
    }, []);

    const logoStyle = useAnimatedStyle(() => ({
        opacity: logoOpacity.value,
        transform: [{ scale: logoScale.value }],
    }));

    const titleStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
        transform: [{ translateY: textTranslateY.value }],
    }));

    const taglineStyle = useAnimatedStyle(() => ({
        opacity: taglineOpacity.value,
    }));

    const p1Style = useAnimatedStyle(() => ({
        transform: [{ translateY: particle1Y.value }],
    }));
    const p2Style = useAnimatedStyle(() => ({
        transform: [{ translateY: particle2Y.value }],
    }));
    const p3Style = useAnimatedStyle(() => ({
        transform: [{ translateY: particle3Y.value }],
    }));

    return (
        <LinearGradient
            colors={mau.gradient_hero}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            {/* Floating particles */}
            <Animated.View style={[styles.particle, { left: width * 0.2 }, p1Style]}>
                <Text style={styles.particleText}>🍃</Text>
            </Animated.View>
            <Animated.View style={[styles.particle, { left: width * 0.6 }, p2Style]}>
                <Text style={styles.particleText}>🌿</Text>
            </Animated.View>
            <Animated.View style={[styles.particle, { left: width * 0.8 }, p3Style]}>
                <Text style={styles.particleText}>🍀</Text>
            </Animated.View>

            {/* Decorative circles */}
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />

            {/* Logo */}
            <Animated.View style={[styles.logoContainer, logoStyle]}>
                <View style={styles.logoCircle}>
                    <Ionicons name="leaf" size={s(48)} color={mau.xanh_chinh} />
                    <View style={[styles.aiBadge, { backgroundColor: mau.xanh_chinh }]}>
                        <Text style={[styles.aiText, { fontSize: s(11) }]}>AI</Text>
                    </View>
                </View>
            </Animated.View>

            {/* Title */}
            <Animated.View style={titleStyle}>
                <Text style={[styles.appName, { fontSize: s(36) }]}>PlantCare AI</Text>
            </Animated.View>

            {/* Tagline */}
            <Animated.View style={taglineStyle}>
                <Text style={[styles.tagline, { fontSize: s(16) }]}>{t('sp_tagline')}</Text>
            </Animated.View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    particle: {
        position: 'absolute',
        opacity: 0.4,
    },
    particleText: {
        fontSize: 24,
    },
    circle: {
        position: 'absolute',
        borderRadius: 999,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    circle1: {
        width: 250,
        height: 250,
        top: -80,
        right: -60,
    },
    circle2: {
        width: 180,
        height: 180,
        bottom: -40,
        left: -50,
    },
    logoContainer: {
        marginBottom: 24,
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 12,
    },
    aiBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    aiText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '800',
    },
    appName: {
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        letterSpacing: 1,
    },
    tagline: {
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default SplashScreen;
