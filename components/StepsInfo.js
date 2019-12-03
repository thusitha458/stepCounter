import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const StepsInfo = props => {
    return (
        <View style={styles.container}>
            <View style={styles.labelWrapper}>
                <Image style={styles.labelImage} source={require('../assets/walking-icon.png')}/>
                <Text style={styles.label}> Steps</Text>
            </View>
            <View style={styles.valueWrapper}>
                <View style={styles.stepCountWrapper}>
                    <Text style={styles.stepCount}>{props.stepCount || 0}</Text>
                </View>
                <View style={styles.targetWrapper}>
                    <Text style={styles.targetText}>  / </Text>
                    <View style={props.isTargetEditable ? styles.targetEditable: styles.targetNotEditable}>
                        <TouchableOpacity onPress={props.onTargetPress}>
                            <Text style={styles.targetText}>{props.target || 0}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    labelImage: {
        width: 20,
        height: 20,
    },
    valueWrapper: {
        flexDirection: 'row',
    },
    stepCount: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    stepCountWrapper: {

    },
    targetText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    targetEditable: {
        backgroundColor: '#A9A9A9',
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    targetNotEditable: {
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    targetWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
});

export default StepsInfo;
