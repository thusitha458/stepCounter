import React from 'react';
import {Button, Platform} from 'react-native';

const DarkButton = props => {
    return (
        <Button {...props} color={Platform.OS === 'ios' ? '#FFFFFF' : '#000000'} />
    );
};

export default DarkButton;
