// App.tsx — Main entry point
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { ChuDeProvider, useChuDe } from './src/theme/chu_de';
import DieuHuongChinh from './src/navigation/dieu_huong_chinh';

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
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ChuDeProvider>
                <AppContent />
            </ChuDeProvider>
        </GestureHandlerRootView>
    );
}
