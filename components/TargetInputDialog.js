import React, {Component} from 'react';
import DialogInput from './DialogInput';
import {MAX_NUMBER_OF_TARGET_STEPS} from "../config/Constants";

class TargetInputDialog extends Component {
    state = {
        error: undefined,
    };

    isValid = text => {
        if (isNaN(text)) {
            return false;
        }
        let number = Number(text);
        return Number.isInteger(number) && number > 0 && number <= MAX_NUMBER_OF_TARGET_STEPS;
    };

    handleChangeText = text => {
        this.setState({error: this.isValid(text) ? undefined : 'Invalid value!'});
    };

    handleSubmit = text => {
        if (this.isValid(text)) {
            this.props.onSubmitInput(Number(text));
        } else {
            this.props.onCloseDialog();
        }
    };

    render() {
        return (
            <DialogInput
                isDialogVisible={this.props.visible}
                title={"Target Steps"}
                message={"Please enter the target number of steps"}
                submitInput={this.handleSubmit}
                closeDialog={this.props.onCloseDialog}
                onChangeText={this.handleChangeText}
                textInputProps={{keyboardType: 'numeric'}}
                initValueTextInput={this.props.initValue}
                error={this.state.error}
            />
        );
    }
}

export default TargetInputDialog;
