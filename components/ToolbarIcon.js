import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';

const ToolbarIcon = props => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.iconWrapper, props.selected ? styles.selectedIconWrapper : {}]}>
                <Image style={styles.iconImage} source={props.imageSource}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconWrapper: {
        backgroundColor: 'transparent',
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedIconWrapper: {
        backgroundColor: '#000000',
    },
    iconImage: {
        height: 20,
        width: 20,
    },
});

export default ToolbarIcon;
