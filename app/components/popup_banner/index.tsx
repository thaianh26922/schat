// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
    visible: boolean;
    message: string;
    onClose: () => void;
};

const PopupBanner = ({visible, message, onClose}: Props) => {
    const translateY = React.useRef(new Animated.Value(-80)).current;
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (visible) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
        Animated.timing(translateY, {
            toValue: -160,
            duration: 300,
            useNativeDriver: true,
        }).start();

        return undefined;
    }, [visible]);

    if (!visible) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{translateY}],
                    top: insets.top, // Đẩy xuống dưới phần tai thỏ/dynamic island
                },
            ]}
        >
            <TouchableOpacity
                style={styles.touch}
                onPress={onClose}
                activeOpacity={0.8}
            >
                <Text style={styles.text}>{message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        backgroundColor: '#31b34b',
        paddingVertical: 16,
        zIndex: 9999,
        alignItems: 'center',
        elevation: 10,
    },
    touch: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default PopupBanner;
