// Toast / Snackbar Context + Component
import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useRef,
    ReactNode,
} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    Easing,
    runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastLoai = 'thanh_cong' | 'loi' | 'canh_bao' | 'thong_tin';

interface ToastItem {
    id: string;
    tieu_de: string;
    mo_ta?: string;
    loai: ToastLoai;
}

interface ToastContextType {
    hienToast: (tieu_de: string, loai?: ToastLoai, mo_ta?: string) => void;
}

const ToastContext = createContext<ToastContextType>({
    hienToast: () => { },
});

export const useToast = () => useContext(ToastContext);
export const useThongBaoToast = useToast;

const MAUMAU: Record<ToastLoai, { bg: string; icon: string; color: string }> = {
    thanh_cong: { bg: '#10B98120', icon: 'checkmark-circle', color: '#34D399' },
    loi: { bg: '#F8717120', icon: 'close-circle', color: '#F87171' },
    canh_bao: { bg: '#FBBF2420', icon: 'warning', color: '#FBBF24' },
    thong_tin: { bg: '#60A5FA20', icon: 'information-circle', color: '#60A5FA' },
};

const ToastItem: React.FC<{ toast: ToastItem; onHide: () => void }> = ({ toast, onHide }) => {
    const insets = useSafeAreaInsets();
    const translateY = useSharedValue(-100);
    const opacity = useSharedValue(0);
    const config = MAUMAU[toast.loai];

    React.useEffect(() => {
        // Slide in
        translateY.value = withTiming(0, { duration: 350, easing: Easing.out(Easing.exp) });
        opacity.value = withTiming(1, { duration: 300 });

        // Auto hide sau 3 giây
        translateY.value = withDelay(
            3000,
            withTiming(-120, { duration: 350 }, (finished) => {
                if (finished) runOnJS(onHide)();
            })
        );
        opacity.value = withDelay(3000, withTiming(0, { duration: 300 }));
    }, []);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    return (
        <Animated.View
            style={[
                styles.toastCard,
                { marginTop: insets.top + 8, backgroundColor: config.bg, borderColor: config.color + '40' },
                animStyle,
            ]}
        >
            <Ionicons name={config.icon as any} size={22} color={config.color} />
            <View style={styles.toastText}>
                <Text style={[styles.toastTitle, { color: '#F1F5F9' }]}>{toast.tieu_de}</Text>
                {toast.mo_ta ? (
                    <Text style={[styles.toastDesc, { color: '#94A3B8' }]}>{toast.mo_ta}</Text>
                ) : null}
            </View>
        </Animated.View>
    );
};

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const counterRef = useRef(0);

    const hienToast = useCallback((tieu_de: string, loai: ToastLoai = 'thong_tin', mo_ta?: string) => {
        counterRef.current += 1;
        const id = `toast-${counterRef.current}`;
        setToasts(prev => [...prev.slice(-1), { id, tieu_de, loai, mo_ta }]);
    }, []);

    const xoaToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ hienToast }}>
            {children}
            <View style={styles.container} pointerEvents="none">
                {toasts.map(t => (
                    <ToastItem key={t.id} toast={t} onHide={() => xoaToast(t.id)} />
                ))}
            </View>
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    toastCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 14,
        gap: 12,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
        width: '100%',
        maxWidth: 400,
    },
    toastText: { flex: 1 },
    toastTitle: { fontSize: 14, fontWeight: '700' },
    toastDesc: { fontSize: 12, marginTop: 2 },
});
