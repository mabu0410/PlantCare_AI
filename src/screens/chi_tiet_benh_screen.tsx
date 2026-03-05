// Chi tiết bệnh Screen — Disease/plant detail with parallax header
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useChuDe } from '../theme/chu_de';
import TheThuyTinh from '../components/the_thuy_tinh';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';

interface Props {
    navigation: any;
    route: any;
}

const ChiTietBenhScreen: React.FC<Props> = ({ navigation, route }) => {
    const { mau } = useChuDe();
    const cay = route.params?.cay;
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const t = useNgonNgu();
    const s = useCoChu();

    const toggleSection = (key: string) => {
        setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
    };

    if (!cay) {
        return (
            <View style={[styles.empty, { backgroundColor: mau.nen }]}>
                <Text style={[styles.emptyText, { color: mau.chu_chinh, fontSize: s(16) }]}>
                    {t('ctb_khongtimthay')}
                </Text>
            </View>
        );
    }

    const sections = [
        {
            key: 'mota',
            title: t('ctb_mota'),
            icon: 'document-text-outline',
            content: cay.mo_ta,
        },
        {
            key: 'benh',
            title: t('ctb_benhthuonggap'),
            icon: 'bug-outline',
            isList: true,
            items: cay.benh_thuong_gap,
        },
        {
            key: 'cham_soc',
            title: t('ctb_huongdanchamsoc'),
            icon: 'water-outline',
            content: t('ctb_hdcs_chitiet'),
        },
        {
            key: 'mua_vu',
            title: t('ctb_muavu'),
            icon: 'calendar-outline',
            content: t('ctb_muavu_chitiet'),
        },
    ];

    return (
        <View style={[styles.container, { backgroundColor: mau.nen }]}>
            {/* Parallax header */}
            <LinearGradient
                colors={mau.gradient_chinh}
                style={styles.headerGradient}
            >
                {/* Back button */}
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={22} color="#FFF" />
                </TouchableOpacity>

                <Animated.View entering={FadeInDown.duration(500)} style={styles.headerContent}>
                    <Text style={[styles.headerIcon, { fontSize: s(64) }]}>{cay.icon}</Text>
                    <Text style={[styles.headerName, { fontSize: s(28) }]}>{cay.ten}</Text>
                    <Text style={[styles.headerSci, { fontSize: s(15) }]}>{cay.ten_khoa_hoc}</Text>
                </Animated.View>

                {/* Decorative */}
                <View style={styles.headerDecor1} />
                <View style={styles.headerDecor2} />
            </LinearGradient>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                style={styles.scrollView}
            >
                {sections.map((section, idx) => (
                    <Animated.View
                        key={section.key}
                        entering={FadeInUp.delay(idx * 100 + 200).duration(400)}
                    >
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => toggleSection(section.key)}
                        >
                            <TheThuyTinh style={styles.sectionCard}>
                                <View style={styles.sectionHeader}>
                                    <Text style={[styles.sectionTitle, { color: mau.chu_chinh, fontSize: s(16) }]}>
                                        {section.title}
                                    </Text>
                                    <Ionicons
                                        name={expandedSections[section.key] ? 'chevron-up' : 'chevron-down'}
                                        size={20}
                                        color={mau.chu_nhat}
                                    />
                                </View>

                                {(expandedSections[section.key] !== false) && (
                                    <View style={styles.sectionContent}>
                                        {section.isList && section.items ? (
                                            section.items.map((item: string, i: number) => (
                                                <View key={i} style={styles.listItem}>
                                                    <View style={[styles.bullet, { backgroundColor: mau.xanh_chinh }]} />
                                                    <Text style={[styles.listText, { color: mau.chu_phu, fontSize: s(14) }]}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            ))
                                        ) : (
                                            <Text style={[styles.contentText, { color: mau.chu_phu, fontSize: s(14) }]}>
                                                {section.content}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            </TheThuyTinh>
                        </TouchableOpacity>
                    </Animated.View>
                ))}

                {/* Quick action */}
                <Animated.View entering={FadeInUp.delay(600).duration(400)}>
                    <TouchableOpacity
                        style={[styles.scanBtn, { backgroundColor: mau.xanh_chinh }]}
                        onPress={() => navigation.navigate('Camera')}
                    >
                        <Ionicons name="scan-outline" size={s(20)} color="#FFF" />
                        <Text style={[styles.scanBtnText, { fontSize: s(16) }]}>{t('ctb_quetbenhcho')} {cay.ten}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    emptyText: { fontSize: 16 },
    headerGradient: {
        paddingTop: 56,
        paddingBottom: 32,
        paddingHorizontal: 20,
        overflow: 'hidden',
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerContent: { alignItems: 'center' },
    headerIcon: { marginBottom: 10 },
    headerName: { fontWeight: '800', color: '#FFF' },
    headerSci: { color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', marginTop: 4 },
    headerDecor1: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    headerDecor2: {
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    scrollView: { flex: 1, marginTop: -16 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100, gap: 12 },
    sectionCard: {},
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: { fontSize: 16, fontWeight: '700' },
    sectionContent: { marginTop: 12 },
    contentText: { lineHeight: 22 },
    listItem: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
    bullet: { width: 6, height: 6, borderRadius: 3 },
    listText: { flex: 1, lineHeight: 20 },
    scanBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        padding: 16,
        borderRadius: 16,
        marginTop: 8,
    },
    scanBtnText: { color: '#FFF', fontWeight: '700' },
});

export default ChiTietBenhScreen;
