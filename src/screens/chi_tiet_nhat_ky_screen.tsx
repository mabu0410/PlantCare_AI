// Chi Tiết Cây Screen
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useChuDe } from '../theme/chu_de';
import { NhatKyCay } from '../services/cham_soc_service';
import TheThuyTinh from '../components/the_thuy_tinh';

interface Props {
    navigation: any;
    route: { params: { cay: NhatKyCay } };
}

const { width } = Dimensions.get('window');

const ChiTietNhatKyScreen: React.FC<Props> = ({ navigation, route }) => {
    const { cay } = route.params;
    const { mau, laToi } = useChuDe();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: mau.nen }]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {/* Header Image */}
                <Animated.View entering={FadeIn.duration(800)} style={styles.headerImageContainer}>
                    <Image
                        source={require('../../assets/plant_detail_header_3d.png')}
                        style={styles.headerImage}
                        resizeMode="cover"
                    />

                    {/* Back Button */}
                    <TouchableOpacity
                        style={[styles.backBtn, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={28} color="#FFF" />
                    </TouchableOpacity>

                    {/* Gradient Overlay bottom for smooth transition */}
                    <View style={styles.gradientOverlay} />
                </Animated.View>

                {/* Content */}
                <Animated.View
                    entering={SlideInDown.duration(600).delay(200)}
                    style={[styles.contentContainer, { backgroundColor: mau.nen }]}
                >
                    <View style={styles.titleSection}>
                        <Text style={[styles.plantName, { color: mau.chu_chinh }]}>{cay.ten}</Text>
                        <View style={[styles.typeBadge, { backgroundColor: mau.xanh_nhat }]}>
                            <Text style={[styles.typeText, { color: mau.xanh_chinh }]}>{cay.loai}</Text>
                        </View>
                    </View>

                    <Text style={[styles.dateText, { color: mau.chu_phu }]}>Đã trồng từ: {cay.ngay_trong}</Text>

                    <View style={styles.statsRow}>
                        <TheThuyTinh style={styles.statCard}>
                            <Ionicons name="water" size={24} color="#48CAE4" />
                            <Text style={[styles.statValue, { color: mau.chu_chinh }]}>Tốt</Text>
                            <Text style={[styles.statLabel, { color: mau.chu_phu }]}>Lượng nước</Text>
                        </TheThuyTinh>

                        <TheThuyTinh style={styles.statCard}>
                            <Ionicons name="sunny" size={24} color="#FFB703" />
                            <Text style={[styles.statValue, { color: mau.chu_chinh }]}>Vừa đủ</Text>
                            <Text style={[styles.statLabel, { color: mau.chu_phu }]}>Ánh sáng</Text>
                        </TheThuyTinh>

                        <TheThuyTinh style={styles.statCard}>
                            <Ionicons name="thermometer" size={24} color="#FB8500" />
                            <Text style={[styles.statValue, { color: mau.chu_chinh }]}>24°C</Text>
                            <Text style={[styles.statLabel, { color: mau.chu_phu }]}>Nhiệt độ</Text>
                        </TheThuyTinh>
                    </View>

                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: mau.chu_chinh }]}>Ghi chú chăm sóc</Text>
                        <TheThuyTinh style={styles.notesContainer}>
                            <Text style={[styles.notesText, { color: mau.chu_phu }]}>
                                {cay.ghi_chu || "Chưa có ghi chú nào. Hãy thêm vài dòng cảm nghĩ về cái cây này nhé!"}
                            </Text>
                        </TheThuyTinh>
                    </View>

                    {/* Lịch sử hoạt động Dummy data */}
                    <View style={styles.section}>
                        <Text style={[styles.sectionTitle, { color: mau.chu_chinh }]}>Lịch sử hoạt động</Text>
                        <View style={styles.historyList}>
                            <View style={styles.historyItem}>
                                <View style={[styles.historyIcon, { backgroundColor: 'rgba(72, 202, 228, 0.15)' }]}>
                                    <Ionicons name="water" size={20} color="#48CAE4" />
                                </View>
                                <View style={styles.historyTexts}>
                                    <Text style={[styles.historyAction, { color: mau.chu_chinh }]}>Đã tưới nước</Text>
                                    <Text style={[styles.historyTime, { color: mau.chu_phu }]}>Hôm nay, 08:30</Text>
                                </View>
                            </View>

                            <View style={styles.historyItem}>
                                <View style={[styles.historyIcon, { backgroundColor: 'rgba(251, 133, 0, 0.15)' }]}>
                                    <Ionicons name="leaf" size={20} color="#FB8500" />
                                </View>
                                <View style={styles.historyTexts}>
                                    <Text style={[styles.historyAction, { color: mau.chu_chinh }]}>Bón phân định kỳ</Text>
                                    <Text style={[styles.historyTime, { color: mau.chu_phu }]}>3 ngày trước</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    ); // Return End
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerImageContainer: {
        width: width,
        height: width * 1.1,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    backBtn: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        // Using a solid color that matches the background color that will be placed below it might be needed
    },
    contentContainer: {
        flex: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -40,
        paddingTop: 30,
        paddingHorizontal: 24,
        paddingBottom: 50,
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
        flexWrap: 'wrap',
        gap: 12,
    },
    plantName: {
        fontSize: 28,
        fontWeight: '800',
        flexShrink: 1,
    },
    typeBadge: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 20,
    },
    typeText: {
        fontSize: 14,
        fontWeight: '700',
    },
    dateText: {
        fontSize: 15,
        marginBottom: 24,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        gap: 12,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 6,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700',
        marginTop: 4,
    },
    statLabel: {
        fontSize: 13,
    },
    section: {
        marginBottom: 28,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 16,
    },
    notesContainer: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
    },
    notesText: {
        fontSize: 15,
        lineHeight: 24,
        fontStyle: 'italic',
    },
    historyList: {
        gap: 16,
    },
    historyItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    historyIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    historyTexts: {
        flex: 1,
    },
    historyAction: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    historyTime: {
        fontSize: 13,
    },
});

export default ChiTietNhatKyScreen;
