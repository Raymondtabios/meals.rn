import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const DefaultText = props => {
    return <Text style={styles.text}> {props.children} </Text>
};

const styles = StyleSheet.create({
    text: {
       fontFamily: 'open-sans',
       fontSize: 20, 
       color: Colors.primaryColor
    }
});

export default DefaultText;