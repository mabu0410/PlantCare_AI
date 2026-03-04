// Main Stack Navigator
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/splash_screen';
import OnboardingScreen from '../screens/onboarding_screen';
import DangNhapScreen from '../screens/dang_nhap_screen';
import DangKyScreen from '../screens/dang_ky_screen';
import DieuHuongTab from './dieu_huong_tab';
import CameraScreen from '../screens/camera_screen';
import XemTruocAnhScreen from '../screens/xem_truoc_anh_screen';
import KetQuaScreen from '../screens/ket_qua_screen';
import ChiTietBenhScreen from '../screens/chi_tiet_benh_screen';
import CaiDatScreen from '../screens/cai_dat_screen';

const Stack = createNativeStackNavigator();

const DieuHuongChinh: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
            }}
            initialRouteName="Splash"
        >
            {/* Auth flow */}
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{ animation: 'fade' }}
            />
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{ animation: 'fade', gestureEnabled: false }}
            />
            <Stack.Screen
                name="DangNhap"
                component={DangNhapScreen}
                options={{ animation: 'fade', gestureEnabled: false }}
            />
            <Stack.Screen
                name="DangKy"
                component={DangKyScreen}
                options={{ animation: 'slide_from_right' }}
            />

            {/* Main app */}
            <Stack.Screen
                name="TabChinh"
                component={DieuHuongTab}
                options={{ animation: 'fade', gestureEnabled: false }}
            />

            {/* Scan flow */}
            <Stack.Screen
                name="Camera"
                component={CameraScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="XemTruocAnh"
                component={XemTruocAnhScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="KetQua"
                component={KetQuaScreen}
                options={{ animation: 'slide_from_right' }}
            />

            {/* Details */}
            <Stack.Screen
                name="ChiTietBenh"
                component={ChiTietBenhScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="CaiDat"
                component={CaiDatScreen}
                options={{ animation: 'slide_from_right' }}
            />
        </Stack.Navigator>
    );
};

export default DieuHuongChinh;
