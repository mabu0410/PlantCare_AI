import React from 'react';
import { Text } from 'react-native';
import ToanCauLoi from './src/components/toan_cau_loi';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ChuDeProvider, useChuDe } from './src/theme/chu_de';
import DieuHuongChinh from './src/navigation/dieu_huong_chinh';
import { useFonts } from 'expo-font';
import {
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';

// Áp dụng font chữ mặc định cho toàn bộ app
const TextRef = Text as any;
if (!TextRef.defaultProps) TextRef.defaultProps = {};
TextRef.defaultProps.style = [
    { fontFamily: 'PlusJakartaSans_500Medium' },
    TextRef.defaultProps.style
];

const AppContent: React.FC = () => {
    const { laToi } = useChuDe();
    return (
        <>
            <StatusBar style={laToi ? 'light' : 'dark'} />
            <NavigationContainer>
                <DieuHuongChinh />
            </NavigationContainer>
        </>
    );
};

export default function App() {
    let [fontsLoaded] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        PlusJakartaSans_800ExtraBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ToanCauLoi>
                <ChuDeProvider>
                    <AppContent />
                </ChuDeProvider>
            </ToanCauLoi>
        </GestureHandlerRootView>
    );
}
