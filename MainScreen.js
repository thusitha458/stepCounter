import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {CALORIE_COUNT_UPDATE_INTERVAL, SCREENS} from "./config/Constants";
import StepCounterScreen from "./screens/StepCounterScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Toolbar from "./components/Toolbar";
import {connect} from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";
import {isPedometerAvailable, onStepCount} from "./utils/Pedometer";
import {setPedometerAvailability} from "./actions/stepCounter.actions";
import {loadHistory} from "./actions/history.actions";
import {getProfile} from "./actions/profile.actions";

class MainScreen extends Component {
    _isMounted = false;
    _pedometerSubscription = null;
    _updateCalorieCountSubscription = null;

    componentDidMount() {
        this._isMounted = true;
        isPedometerAvailable().then(result => {
            if (this._isMounted) {
                this.props.setPedometerAvailability(result === true);
            }
        }).catch();
        this.props.loadHistory();
        this.props.getProfile();
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.removeSubscription();
    }

    addSubscription = (onStepCountCallback, updateCalorieCount) => {
        this._pedometerSubscription = onStepCount(onStepCountCallback);
        this._updateCalorieCountSubscription = setInterval(updateCalorieCount, CALORIE_COUNT_UPDATE_INTERVAL);
    };

    removeSubscription = () => {
        this._pedometerSubscription && this._pedometerSubscription.remove();
        this._pedometerSubscription = null;
        this._updateCalorieCountSubscription && clearInterval(this._updateCalorieCountSubscription);
        this._updateCalorieCountSubscription = null;
    };

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.selectedScreen === SCREENS.STEPS &&
                    <StepCounterScreen
                        addSubscription={this.addSubscription}
                        removeSubscription={this.removeSubscription}
                    />
                }
                {this.props.selectedScreen === SCREENS.HISTORY && <HistoryScreen />}
                {this.props.selectedScreen === SCREENS.PROFILE && <ProfileScreen />}
                <Toolbar />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
    },
});

const mapStateToProps = state => {
    return {
        selectedScreen: state.screens.selectedScreen,
    };
};

export default connect(mapStateToProps, {
    setPedometerAvailability,
    loadHistory,
    getProfile,
})(MainScreen);
