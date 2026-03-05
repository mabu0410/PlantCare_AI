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
import ChinhSuaHoSoScreen from '../screens/chinh_sua_ho_so_screen';
import DaLuuScreen from '../screens/da_luu_screen';
import VeUngDungScreen from '../screens/ve_ung_dung_screen';
import ThongBaoScreen from '../screens/thong_bao_screen';
import PhanHoiScreen from '../screens/phan_hoi_screen';
import ChinhSachScreen from '../screens/chinh_sach_screen';
import DieuKhoanScreen from '../screens/dieu_khoan_screen';
import HuongDanQuetScreen from '../screens/huong_dan_quet_screen';

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
            <Stack.Screen
                name="ChinhSuaHoSo"
                component={ChinhSuaHoSoScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="DaLuu"
                component={DaLuuScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="VeUngDung"
                component={VeUngDungScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="ThongBao"
                component={ThongBaoScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="PhanHoi"
                component={PhanHoiScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
            <Stack.Screen
                name="ChinhSach"
                component={ChinhSachScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="DieuKhoan"
                component={DieuKhoanScreen}
                options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
                name="HuongDanQuet"
                component={HuongDanQuetScreen}
                options={{ animation: 'slide_from_bottom' }}
            />
        </Stack.Navigator>
    );
};

export default DieuHuongChinh;
