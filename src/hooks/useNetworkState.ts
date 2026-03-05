// Hook detect trạng thái mạng — safe cho cả Web lẫn Native
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';

interface NetworkState {
    isConnected: boolean;
    isInternetReachable: boolean | null;
}

export const useNetworkState = (): NetworkState => {
    const [state, setState] = useState<NetworkState>({
        isConnected: true,
        isInternetReachable: true,
    });

    useEffect(() => {
        // Web: dùng browser navigator.onLine API thay vì NetInfo
        if (Platform.OS === 'web') {
            const handleOnline = () => setState({ isConnected: true, isInternetReachable: true });
            const handleOffline = () => setState({ isConnected: false, isInternetReachable: false });

            setState({
                isConnected: navigator.onLine,
                isInternetReachable: navigator.onLine,
            });

            window.addEventListener('online', handleOnline);
            window.addEventListener('offline', handleOffline);
            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
            };
        }

        // Native: dùng @react-native-community/netinfo
        // Dùng require động để web không bị crash khi import
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const NetInfo = require('@react-native-community/netinfo').default;

            NetInfo.fetch().then((netState: any) => {
                setState({
                    isConnected: netState.isConnected ?? true,
                    isInternetReachable: netState.isInternetReachable,
                });
            });

            const unsubscribe = NetInfo.addEventListener((netState: any) => {
                setState({
                    isConnected: netState.isConnected ?? true,
                    isInternetReachable: netState.isInternetReachable,
                });
            });

            return unsubscribe;
        } catch {
            // Nếu module không load được, giữ mặc định isConnected = true
        }
    }, []);

    return state;
};
