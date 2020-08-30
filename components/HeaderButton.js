import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import Colors from '../constants/Colors';

const CustomHeaderButton = props => {
   return( <HeaderButton {...props} 
   IconComponent={Ionicons} 
   iconSize ={28} 
   color={Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor}
   />
  );
};

export default CustomHeaderButton;