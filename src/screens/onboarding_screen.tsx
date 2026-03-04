// Onboarding Screen — 3-step animated carousel
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useChuDe } from '../theme/chu_de';
import { useAuthStore } from '../store/auth_store';
import NutBam from '../components/nut_bam';

const { width } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        icon: '📸',
        title: 'Chụp ảnh lá cây',
        subtitle: 'Chụp hoặc tải ảnh lá cây bị bệnh lên ứng dụng để bắt đầu phân tích',
    },
    {
        id: '2',
        icon: '🤖',
        title: 'AI Phân tích',
        subtitle: 'Trí tuệ nhân tạo tự động nhận diện loại bệnh với độ chính xác cao',
    },
    {
        id: '3',
        icon: '💊',
        title: 'Nhận phác đồ điều trị',
        subtitle: 'Hướng dẫn điều trị chi tiết và các biện pháp phòng ngừa hiệu quả',
    },
];

interface Props {
    navigation: any;
}

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const [activeIndex, setActiveIndex] = useState(0);
    const datDaXemOnboarding = useAuthStore(s => s.datDaXemOnboarding);
    const flatListRef = React.useRef<FlatList>(null);

    const handleNext = useCallback(() => {
        if (activeIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
            setActiveIndex(activeIndex + 1);
        } else {
            datDaXemOnboarding();
            navigation.replace('DangNhap');
        }
    }, [activeIndex, datDaXemOnboarding, navigation]);

    const handleSkip = useCallback(() => {
        datDaXemOnboarding();
        navigation.replace('DangNhap');
    }, [datDaXemOnboarding, navigation]);

    const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
        <Animated.View entering={FadeIn.duration(400)} style={[styles.slide, { width }]}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <Text style={[styles.title, { color: mau.chu_chinh }]}>{item.title}</Text>
            <Text style={[styles.subtitle, { color: mau.chu_phu }]}>{item.subtitle}</Text>
        </Animated.View>
    );

    return (
        <View style={[styles.container, { backgroundColor: mau.nen }]}>
            {/* Skip button */}
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={[styles.skipText, { color: mau.chu_phu }]}>Bỏ qua</Text>
            </TouchableOpacity>

            {/* Carousel */}
            <FlatList
                ref={flatListRef}
                data={SLIDES}
                renderItem={renderSlide}
                keyExtractor={item => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(e) => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / width);
                    setActiveIndex(index);
                }}
            />

            {/* Dot indicators */}
            <View style={styles.dotsContainer}>
                {SLIDES.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: index === activeIndex ? mau.xanh_chinh : mau.vien,
                                width: index === activeIndex ? 28 : 8,
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
                <NutBam
                    tieu_de={activeIndex === SLIDES.length - 1 ? 'Bắt đầu 🚀' : 'Tiếp theo'}
                    onPress={handleNext}
                    fullWidth
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 24,
        zIndex: 10,
        padding: 8,
    },
    skipText: {
        fontSize: 15,
        fontWeight: '600',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(82,183,136,0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    icon: {
        fontSize: 64,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        marginBottom: 30,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    buttonContainer: {
        paddingHorizontal: 24,
        paddingBottom: 50,
    },
});

export default OnboardingScreen;
