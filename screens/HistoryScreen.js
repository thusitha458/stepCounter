import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {TOOLBAR_HEIGHT, TOP_MARGIN_OF_SCREEN} from "../config/Constants";
import HistoryItem from "../components/HistoryItem";
import {connect} from "react-redux";
import {extractKey} from "../utils/HistoryStore";
import {loadHistory, deleteHistoryItem} from "../actions/history.actions";

const data = [
    {id: '1', stepCount: 100, target: 250, calorieCount: 254.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '2', stepCount: 120, target: 150, calorieCount: 2545.35, startTime: 1574319708796, endTime: 1574319838796},
    {id: '3', stepCount: 999999, target: 999999, calorieCount: 1254.55, startTime: 1574319708796, endTime: 1574319838796},
    {id: '11', stepCount: 140, target: 150, calorieCount: 24.654444, startTime: 1574319708796, endTime: 1574319838796},
    {id: '12', stepCount: 1250, target: 1950, calorieCount: 15565888254.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '13', stepCount: 100, target: 250, calorieCount: 25514.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '21', stepCount: 1040, target: 2350, calorieCount: 23563254.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '22', stepCount: 1220, target: 1250, calorieCount: 2235154.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '23', stepCount: 1300, target: 2450, calorieCount: 2.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '31', stepCount: 250, target: 2850, calorieCount: 25414.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '32', stepCount: 1240, target: 3150, calorieCount: 2123454.65, startTime: 1574319708796, endTime: 1574319838796},
    {id: '33', stepCount: 100, target: 150, calorieCount: 6853254.65, startTime: 1574319708796, endTime: 1574319838796},
];

class HistoryScreen extends Component {
    state = {
        data: [...data],
    };

    componentDidMount() {
        this.props.loadHistory();
    }

    handleDeleteButtonPress = deleteKey => {
        this.props.deleteHistoryItem(deleteKey);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.history}
                    renderItem={({item}) => {
                        return (
                            <HistoryItem
                                deleteKey={extractKey(item)}
                                startTime={item.startTime}
                                duration={Math.max(item.endTime - item.startTime, 0)}
                                stepCount={item.stepCount}
                                target={item.target}
                                calorieCount={Math.round(item.calorieCount)}
                                onPressDelete={this.handleDeleteButtonPress}
                            />
                        );
                    }}
                    keyExtractor={extractKey}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        marginTop: TOP_MARGIN_OF_SCREEN,
        marginBottom: TOOLBAR_HEIGHT,
    },
});

const mapStateToProps = state => {
    return {
        history: state.history.history,
    };
};

export default connect(mapStateToProps, {
    loadHistory,
    deleteHistoryItem,
})(HistoryScreen);
