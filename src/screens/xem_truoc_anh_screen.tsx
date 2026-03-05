// Xem trước ảnh Screen — Preview before analysis
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import NutBam from '../components/nut_bam';
import TheThuyTinh from '../components/the_thuy_tinh';

const { width } = Dimensions.get('window');

interface Props {
    navigation: any;
    route: any;
}

const XemTruocAnhScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const imageUri = route.params?.imageUri;

    const handlePhanTich = () => {
        navigation.navigate('KetQua', { imageUri });
    };

    return (
        <View style={[styles.container, { backgroundColor: mau.nen }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={s(22)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('xta_tieude_chinh')}</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Image preview */}
            <Animated.View entering={FadeInDown.duration(500)} style={styles.imageWrap}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
                ) : (
                    <View style={[styles.image, styles.mockImage]}>
                        <View style={styles.mockLeafPattern}>
                            <Text style={{ fontSize: s(64) }}>🍃</Text>
                        </View>
                        <Text style={[styles.mockText, { color: mau.chu_nhat, fontSize: s(16) }]}>{t('xta_anhdachup')}</Text>
                    </View>
                )}
            </Animated.View>

            {/* Toolbar */}
            <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.toolbar}>
                <TouchableOpacity style={[styles.toolBtn, { backgroundColor: mau.nen_the }]}>
                    <Ionicons name="crop-outline" size={s(22)} color={mau.chu_chinh} />
                    <Text style={[styles.toolText, { color: mau.chu_phu, fontSize: s(12) }]}>{t('xta_cat')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toolBtn, { backgroundColor: mau.nen_the }]}>
                    <Ionicons name="refresh-outline" size={s(22)} color={mau.chu_chinh} />
                    <Text style={[styles.toolText, { color: mau.chu_phu, fontSize: s(12) }]}>{t('xta_xoay')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.toolBtn, { backgroundColor: mau.nen_the }]}>
                    <Ionicons name="sunny-outline" size={s(22)} color={mau.chu_chinh} />
                    <Text style={[styles.toolText, { color: mau.chu_phu, fontSize: s(12) }]}>{t('xta_sang')}</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Tip */}
            <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                <TheThuyTinh style={styles.tipCard}>
                    <Ionicons name="bulb-outline" size={s(18)} color={mau.xanh_chinh} />
                    <Text style={[styles.tipText, { color: mau.chu_phu, fontSize: s(13) }]}>
                        {t('xta_meo_cat')}
                    </Text>
                </TheThuyTinh>
            </Animated.View>

            {/* Bottom buttons */}
            <Animated.View entering={FadeInDown.delay(400).duration(500)} style={styles.bottomBtns}>
                <NutBam
                    tieu_de={t('xta_nut_chulai')}
                    onPress={() => navigation.goBack()}
                    loai="vien"
                    icon={<Ionicons name="camera-outline" size={s(20)} color={mau.xanh_chinh} />}
                    style={{ flex: 1 }}
                />
                <NutBam
                    tieu_de={t('xta_nut_phantich')}
                    onPress={handlePhanTich}
                    style={{ flex: 1.5 }}
                />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 16,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { fontWeight: '700' },
    imageWrap: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 14,
        elevation: 6,
    },
    image: {
        width: '100%',
        height: width * 0.75,
        borderRadius: 20,
    },
    mockImage: {
        backgroundColor: '#1a3a2a',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mockLeafPattern: {
        marginBottom: 8,
        opacity: 0.6,
    },
    mockText: { fontSize: 16, fontWeight: '500' },
    toolbar: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    toolBtn: {
        flex: 1,
        alignItems: 'center',
        padding: 12,
        borderRadius: 14,
        gap: 4,
    },
    toolText: { fontWeight: '600' },
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 20,
    },
    tipText: { flex: 1, lineHeight: 18 },
    bottomBtns: {
        flexDirection: 'row',
        gap: 12,
        paddingBottom: 40,
    },
});

export default XemTruocAnhScreen;
