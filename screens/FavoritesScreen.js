import {HeaderButtons,Item} from 'react-navigation-header-buttons';
import React from 'react';
import {Text,View,StyleSheet} from 'react-native'

import MealList from '../components/MealList';
import { useSelector } from 'react-redux' 
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = props => {
    const favMeals = useSelector (state => state.meals.favoriteMeals);

    if (favMeals.length === 0|| !favMeals) {
      return <View style={styles.content}>
      <Text style={styles.text}>Start adding Favorite Meals</Text>
      </View>
    }

    return <MealList listData={favMeals} navigation={props.navigation} />;
}; 

FavoritesScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Your Favorites',
    //instead of headerLeft: headerLeft:() =>
    headerLeft:() => <HeaderButtons HeaderButtonComponent={HeaderButton} > 
      <Item title = "Menu" iconName = 'ios-menu' onPress={() => {
        navData.navigation.toggleDrawer();
        }} />
     </HeaderButtons>
  };  
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: '#b55555'
  }
});

export default FavoritesScreen;