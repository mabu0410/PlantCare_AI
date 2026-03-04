// TheThuyTinh — Glassmorphism card component
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useChuDe } from '../theme/chu_de';

interface Props {
    children: React.ReactNode;
    style?: ViewStyle;
    intensity?: number;
    noPadding?: boolean;
}

const TheThuyTinh: React.FC<Props> = ({
    children,
    style,
    intensity = 40,
    noPadding = false,
}) => {
    const { mau, laToi } = useChuDe();

    return (
        <View
            style={[
                styles.container,
                {
                    borderColor: laToi
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(0,0,0,0.06)',
                    backgroundColor: mau.nen_kinh,
                },
                style,
            ]}
        >
            <BlurView
                intensity={intensity}
                tint={laToi ? 'dark' : 'light'}
                style={[styles.blur, !noPadding && styles.padding]}
            >
                {children}
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
    },
    blur: {
        overflow: 'hidden',
        borderRadius: 20,
    },
    padding: {
        padding: 18,
    },
});

export default React.memo(TheThuyTinh);
