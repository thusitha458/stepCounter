import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import ToolbarIcon from "./ToolbarIcon";
import {SCREENS, TOOLBAR_HEIGHT} from "../config/Constants";
import {connect} from "react-redux";
import {selectScreen} from '../actions/screens.actions';

class Toolbar extends Component {
    handleIconPress = screen => {
        if (this.props.selectedScreen !== screen) {
            this.props.selectScreen(screen);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ToolbarIcon
                    imageSource={require('../assets/walking-icon.png')}
                    selected={this.props.selectedScreen === SCREENS.STEPS}
                    onPress={() => this.handleIconPress(SCREENS.STEPS)}
                />
                <ToolbarIcon
                    imageSource={require('../assets/graph-icon.png')}
                    selected={this.props.selectedScreen === SCREENS.HISTORY}
                    onPress={() => this.handleIconPress(SCREENS.HISTORY)}
                />
                <ToolbarIcon
                    imageSource={require('../assets/white-profile-icon.jpg')}
                    selected={this.props.selectedScreen === SCREENS.PROFILE}
                    onPress={() => this.handleIconPress(SCREENS.PROFILE)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: TOOLBAR_HEIGHT,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#1E1E1E',
        elevation: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});

const mapStateToProps = state => {
    return {
        selectedScreen: state.screens.selectedScreen,
    };
};

export default connect(mapStateToProps, {selectScreen})(Toolbar);
