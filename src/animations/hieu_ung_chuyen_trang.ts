// Transition animations cho React Navigation

// Custom slide animation config
export const hieuUngTruot = {
    animation: 'slide_from_right' as const,
    gestureEnabled: true,
    gestureDirection: 'horizontal' as const,
};

export const hieuUngModal = {
    animation: 'slide_from_bottom' as const,
    presentation: 'modal' as const,
    gestureEnabled: true,
    gestureDirection: 'vertical' as const,
};

export const hieuUngFade = {
    animation: 'fade' as const,
    gestureEnabled: false,
};

export const hieuUngKhong = {
    animation: 'none' as const,
    gestureEnabled: false,
};
