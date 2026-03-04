// Bottom Tab Navigator — 4 tabs
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from 'react-native-reanimated';
import { useChuDe } from '../theme/chu_de';

import TrangChuScreen from '../screens/trang_chu_screen';
import LichSuScreen from '../screens/lich_su_screen';
import ThuVienCayScreen from '../screens/thu_vien_cay_screen';
import TaiKhoanScreen from '../screens/tai_khoan_screen';

const Tab = createBottomTabNavigator();

const TabIcon: React.FC<{
    focused: boolean;
    iconName: string;
    label: string;
    color: string;
}> = ({ focused, iconName, label, color }) => {
    return (
        <View style={styles.tabItem}>
            <Ionicons
                name={iconName as any}
                size={focused ? 24 : 22}
                color={color}
            />
            <Text
                style={[
                    styles.tabLabel,
                    { color, fontWeight: focused ? '700' : '500' },
                ]}
            >
                {label}
            </Text>
            {focused && <View style={[styles.indicator, { backgroundColor: color }]} />}
        </View>
    );
};

const DieuHuongTab: React.FC = () => {
    const { mau, laToi } = useChuDe();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: laToi ? '#0F1B30' : '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 12,
                    height: 80,
                    paddingTop: 8,
                    paddingBottom: 20,
                },
            }}
        >
            <Tab.Screen
                name="TrangChu"
                component={TrangChuScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            iconName={focused ? 'home' : 'home-outline'}
                            label="Trang chủ"
                            color={focused ? mau.xanh_chinh : mau.chu_nhat}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="LichSu"
                component={LichSuScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            iconName={focused ? 'time' : 'time-outline'}
                            label="Lịch sử"
                            color={focused ? mau.xanh_chinh : mau.chu_nhat}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="ThuVien"
                component={ThuVienCayScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            iconName={focused ? 'library' : 'library-outline'}
                            label="Thư viện"
                            color={focused ? mau.xanh_chinh : mau.chu_nhat}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="TaiKhoan"
                component={TaiKhoanScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            iconName={focused ? 'person' : 'person-outline'}
                            label="Tài khoản"
                            color={focused ? mau.xanh_chinh : mau.chu_nhat}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
    },
    tabLabel: {
        fontSize: 11,
    },
    indicator: {
        width: 18,
        height: 3,
        borderRadius: 1.5,
        marginTop: 2,
    },
});

export default DieuHuongTab;
