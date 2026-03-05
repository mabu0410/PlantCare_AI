// Về ứng dụng Screen — About app
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import Constants from 'expo-constants';

interface Props {
    navigation: any;
}

const VeUngDungScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const appVersion = Constants.expoConfig?.version || '2.0.0';

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: mau.nen }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={s(24)} color={mau.chu_chinh} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: mau.chu_chinh, fontSize: s(18) }]}>{t('vud_tieude_chinh')}</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Animated.View entering={FadeInDown.duration(400)} style={styles.logoSection}>
                    <View style={[styles.logoContainer, { backgroundColor: mau.xanh_chinh + '20' }]}>
                        {/* Placeholder for real logo */}
                        <Text style={{ fontSize: s(64) }}>🌿</Text>
                    </View>
                    <Text style={[styles.appName, { color: mau.chu_chinh, fontSize: s(24) }]}>PlantCare AI</Text>
                    <Text style={[styles.versionText, { color: mau.chu_nhat, fontSize: s(14) }]}>{t('vud_phienban')} {appVersion}</Text>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(100).duration(400)}>
                    <View style={[styles.card, { backgroundColor: mau.nen_the }]}>
                        <Text style={[styles.cardTitle, { color: mau.chu_chinh, fontSize: s(16) }]}>{t('vud_sumenh_t')}</Text>
                        <Text style={[styles.cardText, { color: mau.chu_phu, fontSize: s(14) }]}>
                            {t('vud_sumenh_m')}
                        </Text>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(200).duration(400)}>
                    <View style={[styles.card, { backgroundColor: mau.nen_the }]}>
                        <Text style={[styles.cardTitle, { color: mau.chu_chinh, fontSize: s(16) }]}>{t('vud_lienhe_t')}</Text>
                        <View style={styles.contactRow}>
                            <Ionicons name="mail" size={s(20)} color={mau.xanh_chinh} />
                            <Text style={[styles.contactText, { color: mau.chu_phu, fontSize: s(15) }]}>support@plantcare.ai</Text>
                        </View>
                        <View style={styles.contactRow}>
                            <Ionicons name="globe" size={s(20)} color={mau.xanh_chinh} />
                            <Text style={[styles.contactText, { color: mau.chu_phu, fontSize: s(15) }]}>www.plantcare.ai</Text>
                        </View>
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.footer}>
                    <Text style={[styles.copyright, { color: mau.chu_nhat, fontSize: s(12) }]}>
                        {t('vud_banquyen')}
                    </Text>
                    <Text style={[styles.copyright, { color: mau.chu_nhat, fontSize: s(12) }]}>
                        {t('vud_lamvoi')}
                    </Text>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 56,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: { fontWeight: '700' },
    content: { padding: 24 },
    logoSection: {
        alignItems: 'center',
        marginVertical: 30,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    appName: { fontWeight: '800' },
    versionText: { marginTop: 4 },
    card: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 16,
    },
    cardTitle: { fontWeight: '700', marginBottom: 12 },
    cardText: { lineHeight: 22 },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
    },
    contactText: {},
    footer: {
        marginTop: 40,
        alignItems: 'center',
        gap: 4,
    },
    copyright: {},
});

export default VeUngDungScreen;
