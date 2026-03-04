// Camera Screen — Camera simulator + gallery picker
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Alert,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    FadeIn,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useChuDe } from '../theme/chu_de';
import { usePhanTichStore } from '../store/phan_tich_store';

const { width, height } = Dimensions.get('window');

interface Props {
    navigation: any;
}

const CameraScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const [flash, setFlash] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const { datAnhChup } = usePhanTichStore();

    // Pulsing guide frame
    const guideOpacity = useSharedValue(0.5);
    React.useEffect(() => {
        guideOpacity.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 1500 }),
                withTiming(0.5, { duration: 1500 })
            ),
            -1,
            true
        );
    }, [guideOpacity]);

    const guideStyle = useAnimatedStyle(() => ({
        opacity: guideOpacity.value,
    }));

    const handleCapture = useCallback(() => {
        // Flash effect
        setShowFlash(true);
        setTimeout(() => {
            setShowFlash(false);
            // Mock captured image
            datAnhChup('captured_image');
            navigation.navigate('XemTruocAnh', { imageUri: null });
        }, 300);
    }, [datAnhChup, navigation]);

    const handleGallery = useCallback(async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Quyền truy cập', 'Cần quyền truy cập thư viện ảnh.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });
        if (!result.canceled && result.assets?.length > 0) {
            datAnhChup(result.assets[0].uri);
            navigation.navigate('XemTruocAnh', { imageUri: result.assets[0].uri });
        }
    }, [datAnhChup, navigation]);

    return (
        <View style={styles.container}>
            {/* Camera view placeholder */}
            <View style={styles.cameraView}>
                {/* Dark camera simulator */}
                <View style={[styles.cameraBg, { backgroundColor: '#0a0a0a' }]}>
                    {/* Subtle gradient overlay */}
                    <View style={styles.cameraOverlay} />

                    {/* Guide frame */}
                    <Animated.View style={[styles.guideFrame, guideStyle]}>
                        {/* Corner brackets */}
                        <View style={[styles.corner, styles.topLeft]} />
                        <View style={[styles.corner, styles.topRight]} />
                        <View style={[styles.corner, styles.bottomLeft]} />
                        <View style={[styles.corner, styles.bottomRight]} />
                    </Animated.View>

                    <Text style={styles.guideText}>Đặt lá cây vào khung hình</Text>
                </View>

                {/* Flash overlay */}
                {showFlash && (
                    <Animated.View
                        entering={FadeIn.duration(100)}
                        style={styles.flashOverlay}
                    />
                )}
            </View>

            {/* Top toolbar */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
                    <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setFlash(!flash)}
                    style={[styles.topBtn, flash && styles.topBtnActive]}
                >
                    <Ionicons name={flash ? 'flash' : 'flash-off'} size={22} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.topBtn}>
                    <Ionicons name="camera-reverse-outline" size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Tip */}
            <View style={styles.tipWrap}>
                <Text style={styles.tipText}>
                    💡 Đảm bảo đủ ánh sáng để tăng độ chính xác
                </Text>
            </View>

            {/* Bottom controls */}
            <View style={styles.bottomBar}>
                {/* Gallery */}
                <TouchableOpacity style={styles.galleryBtn} onPress={handleGallery}>
                    <Ionicons name="images-outline" size={26} color="#FFF" />
                </TouchableOpacity>

                {/* Shutter */}
                <TouchableOpacity style={styles.shutterOuter} onPress={handleCapture}>
                    <View style={styles.shutterInner} />
                </TouchableOpacity>

                {/* Spacer */}
                <View style={styles.galleryBtn} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    cameraView: { flex: 1, position: 'relative' },
    cameraBg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(10,22,40,0.3)',
    },
    guideFrame: {
        width: width * 0.7,
        height: width * 0.55,
        borderWidth: 2,
        borderColor: '#52B788',
        borderStyle: 'dashed',
        borderRadius: 16,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderColor: '#52B788',
    },
    topLeft: {
        top: -2,
        left: -2,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderTopLeftRadius: 12,
    },
    topRight: {
        top: -2,
        right: -2,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderTopRightRadius: 12,
    },
    bottomLeft: {
        bottom: -2,
        left: -2,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderBottomLeftRadius: 12,
    },
    bottomRight: {
        bottom: -2,
        right: -2,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderBottomRightRadius: 12,
    },
    guideText: {
        marginTop: 20,
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '500',
    },
    flashOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#FFF',
        zIndex: 100,
    },
    topBar: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        zIndex: 10,
    },
    topBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topBtnActive: {
        backgroundColor: 'rgba(82,183,136,0.5)',
    },
    tipWrap: {
        position: 'absolute',
        bottom: 150,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    tipText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '500',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    galleryBtn: {
        width: 50,
        height: 50,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterOuter: {
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 4,
        borderColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    shutterInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFF',
    },
});

export default CameraScreen;
