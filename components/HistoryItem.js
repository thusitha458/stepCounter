import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import HorizontalBar from "./HorizontalBar";
import {getDateFromEpochTime, getDurationFromMilliseconds} from "../utils/DateTime";

const HistoryItem = props => {
    return (
        <View style={styles.historyItem}>
            <View style={styles.topContent}>
                <View style={styles.stepSummary}>
                    {/*<Text style={styles.stepsLabelText}>STEPS </Text>*/}
                    <Image style={styles.stepLabelImage} source={require('../assets/walking-icon.png')}/>
                    <Text style={styles.stepCountText}> {props.stepCount}</Text>
                    <View style={styles.targetWrapper}>
                        <Text style={styles.stepSeparatorText}> / </Text>
                        <Text style={styles.targetText}>{props.target}</Text>
                    </View>
                </View>
                <View style={styles.calorieSummary}>
                    {/*<Text style={styles.caloriesLabelText}>CALORIES </Text>*/}
                    <Image style={styles.calorieLabelImage} source={require('../assets/white-flame.png')}/>
                    <Text style={styles.calorieCountText}> {props.calorieCount}</Text>
                </View>
            </View>

            <View style={styles.middleContent}>
                <View style={styles.startTimeWrapper}>
                    <Text style={styles.startTimeText}>{getDateFromEpochTime(props.startTime)}</Text>
                </View>
                <View style={styles.durationWrapper}>
                    <Text style={styles.durationText}>{getDurationFromMilliseconds(props.duration)}</Text>
                </View>
            </View>
            <View style={styles.bottomContent}>
                <HorizontalBar
                    score={props.stepCount}
                    target={props.target}
                />
            </View>
            <View style={styles.deleteButton}>
                <TouchableOpacity onPress={() => props.onPressDelete(props.deleteKey)}>
                    <Image style={styles.deleteButtonImage} source={require('../assets/trash-icon.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    historyItem: {
        justifyContent: 'center',
        padding: 5,
    },
    stepLabelImage: {
        height: 20,
        width: 20,
    },
    stepCountText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    stepSeparatorText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    targetText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    targetWrapper: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    // caloriesLabelText: {
    //     color: '#FFFFFF',
    //     fontSize: 15,
    //     fontWeight: 'bold',
    // },
    calorieLabelImage: {
        height: 15,
        width: 15,
    },
    calorieCountText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    startTimeText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    durationText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    startTimeWrapper: {
        alignItems: 'flex-start',
    },
    durationWrapper: {
        alignItems: 'flex-end',
    },
    stepSummary: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calorieSummary: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topContent: {
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleContent: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bottomContent: {
        marginTop: 5,
    },
    deleteButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        position: 'absolute',
        top: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonImage: {
        height: 20,
        width: 20,
    },
});

export default HistoryItem;
