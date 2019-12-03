import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CalorieInfo = props => {
    return (
        <View style={styles.container}>
            <View style={styles.labelWrapper}>
                <Image style={styles.labelImage} source={require('../assets/white-flame.png')}/>
                <Text style={styles.label}> Calories</Text>
            </View>
            <View style={styles.valueWrapper}>
                <Text style={styles.valueText}>{props.calorieCount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    labelImage: {
        width: 15,
        height: 15,
    },
    valueWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default CalorieInfo;
