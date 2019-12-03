import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import StepsInfo from "../components/StepsInfo";
import ProgressChart from "../components/ProgressChart";
import {SCREEN_HEIGHT, SCREEN_WIDTH, TOP_MARGIN_OF_SCREEN} from "../config/Constants";
import DarkButton from "../components/DarkButton";
import TargetInputDialog from "../components/TargetInputDialog";
import {getCalorieCount} from "../utils/CalorieCounter";
import CalorieInfo from "../components/CalorieInfo";
import {connect} from "react-redux";
import {
    stepCounterStarted,
    stepCounterResumed,
    stepCounterStopped,
    stepCounterPaused,
    setStepCount,
    setCalorieCount,
    setStepTarget,
} from "../actions/stepCounter.actions";
import {insertHistoryItem} from "../actions/history.actions";

const PROGRESS_GRAPH_HEIGHT = Math.min(SCREEN_HEIGHT * 0.3, SCREEN_WIDTH);

class StepCounterScreen extends Component {
    state = {
        isTargetInputVisible: false,
    };

    handleStartButtonPress = () => {
        if (!this.props.running && this.props.isPedometerAvailable) {
            this.props.removeSubscription();
            this.props.stepCounterStarted();

            this.props.addSubscription(result => {
                if (result && result.steps) {
                    this.props.setStepCount(Math.max(result.steps - 1, 0));
                }
            }, () => {
                let stepsSinceLastCalorieUpdate = Math.max(Math.max(this.props.stepCount, 0) - this.props.lastCalorieUpdatedSteps, 0);
                let caloriesToAdd = getCalorieCount(this.props.profile, stepsSinceLastCalorieUpdate, this.props.lastCalorieUpdatedTime, new Date().getTime());
                this.props.setCalorieCount(this.props.calorieCount + caloriesToAdd);
            });
        }
    };

    handleResumeButtonPress = () => {
        if (!this.props.running && this.props.isPedometerAvailable) {
            this.props.removeSubscription();
            this.props.stepCounterResumed();

            this.props.addSubscription(result => {
                if (result && result.steps) {
                    this.props.setStepCount(Math.max(this.props.stepCountWhenPaused + result.steps - 1, 0));
                }
            }, () => {
                let stepsSinceLastCalorieUpdate = Math.max(this.props.stepCount - this.props.lastCalorieUpdatedSteps, 0);
                let caloriesToAdd = getCalorieCount(this.props.profile, stepsSinceLastCalorieUpdate, this.props.lastCalorieUpdatedTime, new Date().getTime());
                this.props.setCalorieCount(this.props.calorieCount + caloriesToAdd);
            });
        }
    };

    handleStopButtonPress = () => {
        if ((this.props.paused || this.props.running) && this.props.isPedometerAvailable) {
            this.props.removeSubscription();

            let endTime = new Date().getTime();

            let stepsSinceLastCalorieUpdate = this.props.stepCount - this.props.lastCalorieUpdatedSteps;
            let caloriesToAdd = getCalorieCount(this.props.profile, stepsSinceLastCalorieUpdate, this.props.lastCalorieUpdatedTime, new Date().getTime());

            this.props.stepCounterStopped(caloriesToAdd, endTime);
            this.props.insertHistoryItem({
                stepCount: this.props.stepCount,
                target: this.props.target,
                calorieCount: this.props.calorieCount + (caloriesToAdd || 0),
                startTime: this.props.startTime,
                endTime: endTime,
            });
        }
    };

    handlePauseButtonPress = () => {
        if (this.props.running && this.props.isPedometerAvailable) {
            this.props.removeSubscription();

            let stepsSinceLastCalorieUpdate = this.props.stepCount - this.props.lastCalorieUpdatedSteps;
            let caloriesToAdd = getCalorieCount(this.props.profile, stepsSinceLastCalorieUpdate, this.props.lastCalorieUpdatedTime, new Date().getTime());
            this.props.stepCounterPaused(caloriesToAdd || 0);
        }
    };

    handleTargetPress = () => {
        if (!this.state.isTargetInputVisible) {
            this.setState({isTargetInputVisible: true});
        }
    };

    handleSubmitTargetInput = target => {
        this.setState({isTargetInputVisible: false});
        this.props.setStepTarget(target);
    };

    handleCloseTargetDialog = () => {
        this.setState({isTargetInputVisible: false});
    };

    render() {
        return (
            <>
                <View style={styles.info}>
                    <StepsInfo
                        stepCount={this.props.stepCount}
                        target={this.props.target}
                        onTargetPress={this.handleTargetPress}
                        isTargetEditable={!this.props.running && this.props.stopped}
                    />
                    <View style={styles.margin20} />
                    <CalorieInfo
                        calorieCount={Math.round(this.props.calorieCount)}
                    />
                </View>
                <View style={styles.chart}>
                    <ProgressChart
                        score={this.props.stepCount}
                        target={this.props.target}
                        width={SCREEN_WIDTH}
                        height={PROGRESS_GRAPH_HEIGHT}
                    />
                </View>
                <View style={styles.buttonHolder}>
                    {this.props.paused && <View><DarkButton title={"Resume"} onPress={this.handleResumeButtonPress} /></View>}
                    {this.props.running && <View><DarkButton title={"Pause"} onPress={this.handlePauseButtonPress} /></View>}
                    {(this.props.paused || this.props.running) && <View style={styles.rightButtonWrapper}><DarkButton title={"Stop"} onPress={this.handleStopButtonPress} /></View>}
                    {(this.props.stopped && !this.props.paused) && <View><DarkButton title={"Start"} onPress={this.handleStartButtonPress} /></View>}
                </View>
                <TargetInputDialog
                    visible={this.state.isTargetInputVisible}
                    onSubmitInput={this.handleSubmitTargetInput}
                    onCloseDialog={this.handleCloseTargetDialog}
                    initValue={this.props.target.toString()}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    info: {
        marginTop: TOP_MARGIN_OF_SCREEN,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    chart: {
        marginTop: 20,
    },
    buttonHolder: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightButtonWrapper: {
        marginLeft: 10,
    },
    margin20: {
        marginTop: 20,
    },
});

const mapStateToProps = state => {
    return {
        isPedometerAvailable: state.stepCounter.isPedometerAvailable,
        running: state.stepCounter.running,
        paused: state.stepCounter.paused,
        stopped: state.stepCounter.stopped,
        stepCount: state.stepCounter.stepCount,
        lastCalorieUpdatedSteps: state.stepCounter.lastCalorieUpdatedSteps,
        lastCalorieUpdatedTime: state.stepCounter.lastCalorieUpdatedTime,
        calorieCount: state.stepCounter.calorieCount,
        stepCountWhenPaused: state.stepCounter.stepCountWhenPaused,
        target: state.stepCounter.target,
        startTime: state.stepCounter.startTime,
        endTime: state.stepCounter.endTime,
        profile: state.profile,
    };
};

export default connect(mapStateToProps, {
    stepCounterStarted,
    stepCounterResumed,
    stepCounterPaused,
    stepCounterStopped,
    setStepCount,
    setCalorieCount,
    setStepTarget,
    insertHistoryItem,
})(StepCounterScreen);
