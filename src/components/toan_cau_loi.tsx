// ErrorBoundary — bắt crash, hiện UI thân thiện thay vì màn hình trắng
import React, { Component, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ToanCauLoi extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Tương lai: gửi lên Sentry
        console.error('[ErrorBoundary]', error, info.componentStack);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Ionicons name="warning-outline" size={56} color="#F87171" />
                        <Text style={styles.title}>Đã có sự cố xảy ra</Text>
                        <Text style={styles.message}>
                            {this.state.error?.message || 'Lỗi không xác định'}
                        </Text>
                        <TouchableOpacity style={styles.retryBtn} onPress={this.handleRetry}>
                            <Ionicons name="refresh-outline" size={18} color="#FFF" />
                            <Text style={styles.retryText}>Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A1628',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    card: {
        backgroundColor: '#152238',
        borderRadius: 20,
        padding: 28,
        alignItems: 'center',
        gap: 14,
        width: '100%',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        color: '#F1F5F9',
        textAlign: 'center',
    },
    message: {
        fontSize: 13,
        color: '#94A3B8',
        textAlign: 'center',
        lineHeight: 20,
    },
    retryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#52B788',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
        marginTop: 6,
    },
    retryText: { color: '#FFF', fontWeight: '700', fontSize: 15 },
});

export default ToanCauLoi;
