// Đăng nhập Screen
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
    ActivityIndicator,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useChuDe } from '../theme/chu_de';
import { useNgonNgu, useCoChu } from '../utils/ngon_ngu';
import { useAuthStore } from '../store/auth_store';
import NutBam from '../components/nut_bam';
import TheThuyTinh from '../components/the_thuy_tinh';

interface Props {
    navigation: any;
}

const DangNhapScreen: React.FC<Props> = ({ navigation }) => {
    const { mau } = useChuDe();
    const t = useNgonNgu();
    const s = useCoChu();
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [hienMatKhau, setHienMatKhau] = useState(false);
    const { dangNhap, dang_tai } = useAuthStore();

    const handleDangNhap = async () => {
        if (!email || !matKhau) return;
        const ok = await dangNhap(email, matKhau);
        if (ok) {
            navigation.replace('TabChinh');
        }
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
                    <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.header}>
                        <View style={styles.logoSmall}>
                            <Ionicons name="leaf" size={s(32)} color={mau.xanh_chinh} />
                        </View>
                        <Text style={[styles.welcomeText, { fontSize: s(28) }]}>{t('dn_chaomung')}</Text>
                        <Text style={[styles.welcomeSub, { fontSize: s(16) }]}>{t('dn_tieptheo')}</Text>
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

                            <View style={styles.inputGroup}>
                                <Text style={[styles.label, { color: mau.chu_phu, fontSize: s(14) }]}>{t('dn_matkhau_label')}</Text>
                                <View style={[styles.inputWrap, { borderColor: mau.vien, backgroundColor: mau.nen }]}>
                                    <Ionicons name="lock-closed-outline" size={s(20)} color={mau.chu_nhat} />
                                    <TextInput
                                        style={[styles.input, { color: mau.chu_chinh, fontSize: s(15) }]}
                                        placeholder={t('dn_matkhau_placeholder')}
                                        placeholderTextColor={mau.chu_nhat}
                                        value={matKhau}
                                        onChangeText={setMatKhau}
                                        secureTextEntry={!hienMatKhau}
                                    />
                                    <TouchableOpacity onPress={() => setHienMatKhau(!hienMatKhau)}>
                                        <Ionicons
                                            name={hienMatKhau ? 'eye-off-outline' : 'eye-outline'}
                                            size={s(20)}
                                            color={mau.chu_nhat}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.forgotBtn}>
                                <Text style={[styles.forgotText, { color: mau.xanh_chinh, fontSize: s(14) }]}>
                                    {t('dn_quenmatkhau')}
                                </Text>
                            </TouchableOpacity>

                            <NutBam
                                tieu_de={dang_tai ? t('dn_dang_dangnhap') : t('dn_dangnhap')}
                                onPress={handleDangNhap}
                                disabled={dang_tai || !email || !matKhau}
                                fullWidth
                                icon={
                                    dang_tai ? (
                                        <ActivityIndicator size="small" color="#FFF" />
                                    ) : (
                                        <Ionicons name="log-in-outline" size={s(20)} color="#FFF" />
                                    )
                                }
                            />
                        </TheThuyTinh>
                    </Animated.View>

                    {/* Register link */}
                    <Animated.View entering={FadeInDown.delay(500).duration(500)} style={styles.registerRow}>
                        <Text style={[styles.registerText, { color: mau.chu_phu, fontSize: s(15) }]}>
                            {t('dn_chuacotaikhoan')}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('DangKy')}>
                            <Text style={[styles.registerLink, { color: mau.xanh_nhat, fontSize: s(15) }]}>
                                {t('dn_dangkyngay')}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Skip for demo */}
                    <Animated.View entering={FadeInDown.delay(600).duration(500)}>
                        <TouchableOpacity
                            style={styles.skipBtn}
                            onPress={() => navigation.replace('TabChinh')}
                        >
                            <Text style={[styles.skipText, { color: mau.chu_nhat, fontSize: s(14) }]}>
                                {t('dn_boqua')}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flex: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 60,
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
        marginBottom: 6,
    },
    welcomeSub: {
        color: 'rgba(255,255,255,0.7)',
    },
    formCard: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 18,
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
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        fontWeight: '600',
    },
    registerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
    },
    registerLink: {
        fontWeight: '700',
    },
    skipBtn: {
        alignItems: 'center',
        marginTop: 20,
        padding: 12,
    },
    skipText: {
        fontWeight: '500',
    },
});

export default DangNhapScreen;
