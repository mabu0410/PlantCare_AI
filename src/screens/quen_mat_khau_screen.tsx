import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import NutBam from '../components/nut_bam';
import TheThuyTinh from '../components/the_thuy_tinh';
import { useThongBaoToast } from '../components/thong_bao_toast';

interface Props {
    navigation: any;
}

const QuenMatKhauScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const { hienToast } = useThongBaoToast();
    const [email, setEmail] = useState('');

    const handleGuiLink = () => {
        if (!email) return;
        hienToast('Đã gửi liên kết khôi phục!', 'thanh_cong');
        setTimeout(() => navigation.goBack(), 1500);
    };

    return (
        <LinearGradient
            colors={mau.gradient_hero}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Header */}
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFF" />
                    </TouchableOpacity>

                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                        <View style={styles.logoSmall}>
                            <Ionicons name="key" size={s(32)} color={mau.xanh_chinh} />
                        </View>
                        <Text style={[styles.welcomeText, { fontSize: s(28) }]}>Quên mật khẩu?</Text>
                        <Text style={[styles.welcomeSub, { fontSize: s(16), textAlign: 'center', marginTop: 10 }]}>Nhập email của bạn để nhận liên kết đặt lại mật khẩu</Text>
                    </Animated.View>

                    {/* Form */}
                    <Animated.View entering={FadeInDown.delay(300).duration(500)}>
                        <TheThuyTinh style={styles.formCard}>
                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: mau.chu_phu, fontSize: s(14) }]}>{t('dn_email_label')}</Text>
                                <View style={[styles.inputWrap, { borderColor: mau.vien, backgroundColor: mau.nen }]}>
                                    <Ionicons name="mail-outline" size={s(20)} color={mau.chu_nhat} />
                                    <TextInput
                                        style={[styles.input, { color: mau.chu_chinh, fontSize: s(15) }]}
                                        placeholder={t('dn_email_placeholder')}
                                        placeholderTextColor={mau.chu_nhat}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            <NutBam
                                tieu_de="Gửi liên kết"
                                onPress={handleGuiLink}
                                disabled={!email}
                                fullWidth
                                icon={<Ionicons name="send-outline" size={s(20)} color="#FFF" />}
                            />
                        </TheThuyTinh>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    flex: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 60,
    },
    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255,255,255,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoSmall: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    welcomeText: {
        fontWeight: '800',
        color: '#FFFFFF',
    },
    welcomeSub: {
        color: 'rgba(255,255,255,0.8)',
    },
    formCard: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontWeight: '600',
        marginBottom: 8,
    },
    inputWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 14,
        paddingHorizontal: 14,
        height: 52,
        gap: 10,
    },
    input: {
        flex: 1,
        fontWeight: '500',
    },
});

export default QuenMatKhauScreen;
