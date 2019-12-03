import React, {Component} from 'react';
import {View, Text, StyleSheet, Picker} from 'react-native';
import {connect} from "react-redux";
import {getProfile, updateProfile} from "../actions/profile.actions";
import {GENDER, MAX_AGE, MAX_HEIGHT, MAX_WEIGHT, MIN_AGE, MIN_HEIGHT, MIN_WEIGHT} from "../config/Constants";

class ProfileScreen extends Component {
    componentDidMount() {
        this.props.getProfile();
    }

    handleGenderChange = gender => {
        this.props.updateProfile({...this.props.profile, gender: gender});
    };

    handleAgeChange = age => {
        this.props.updateProfile({...this.props.profile, age: age});
    };

    handleHeightChange = height => {
        this.props.updateProfile({...this.props.profile, height: height});
    };

    handleWeightChange = weight => {
        this.props.updateProfile({...this.props.profile, weight: weight});
    };

    makeNumericPickerItems = (min, max) => {
        let pickerItems = [];
        for (let i = min; i <= max; i++) {
            pickerItems.push(<Picker.Item key={i} label={i.toString()} value={i} />);
        }
        return pickerItems;
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nameAndValue}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Gender : </Text>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.props.profile.gender}
                            style={styles.picker}
                            onValueChange={this.handleGenderChange}
                        >
                            <Picker.Item label={"Male"} value={GENDER.MALE} />
                            <Picker.Item label={"Female"} value={GENDER.FEMALE} />
                        </Picker>
                    </View>
                </View>
                <View style={styles.nameAndValue}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Age : </Text>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.props.profile.age}
                            style={styles.picker}
                            onValueChange={this.handleAgeChange}
                        >
                            {this.makeNumericPickerItems(MIN_AGE, MAX_AGE)}
                        </Picker>
                    </View>
                </View>
                <View style={styles.nameAndValue}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Height (cm) : </Text>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.props.profile.height}
                            style={styles.picker}
                            onValueChange={this.handleHeightChange}
                        >
                            {this.makeNumericPickerItems(MIN_HEIGHT, MAX_HEIGHT)}
                        </Picker>
                    </View>
                </View>
                <View style={styles.nameAndValue}>
                    <View style={styles.labelWrapper}>
                        <Text style={styles.label}>Weight (kg) : </Text>
                    </View>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={this.props.profile.weight}
                            style={styles.picker}
                            onValueChange={this.handleWeightChange}
                        >
                            {this.makeNumericPickerItems(MIN_WEIGHT, MAX_WEIGHT)}
                        </Picker>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    nameAndValue: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelWrapper: {
        width: '50%',
        alignItems: 'flex-end',
    },
    label: {
        color: '#FFFFFF',
    },
    pickerWrapper: {
        width: '50%',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#cdcdcd',
    },
});

const mapStateToProps = state => {
    return {
        profile: state.profile,
    };
};

export default connect(mapStateToProps, {
    getProfile,
    updateProfile,
})(ProfileScreen);
