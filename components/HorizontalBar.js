import React from 'react';
import {View, StyleSheet} from 'react-native';

const HorizontalBar = props => {
    let ratio = Math.floor(props.score / props.target * 100);
    let fillPercentage = `${Math.min(ratio, 100)}%`;

    let fillColor;
    if (ratio < 25) {
        fillColor = 'red';
    } else if (ratio < 50) {
        fillColor = 'orange';
    } else if (ratio < 75) {
        fillColor = 'yellow';
    } else {
        // fillColor = 'green';
        fillColor = '#00FF4C';
    }

    return (
        <View style={styles.container}>
            <View style={[styles.fill, {width: fillPercentage, backgroundColor: fillColor}]}>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(181,185,185,0.51)',
    },
    fill: {
        // backgroundColor: '#00FF4C',
        height: 10,
        borderRadius: 5,
    },
});

export default HorizontalBar;
