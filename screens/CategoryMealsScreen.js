import React from 'react';
import {useSelector} from 'react-redux'

import {CATEGORIES} from '../data/dummy-data';
import MealList from '../components/MealList';
import { View, Text, StyleSheet } from 'react-native';

const CategoryMealScreen = props => {

   const catId = props.navigation.getParam('categoryId');
   
  const availableMeals = useSelector (state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter(
        meal => meal.categoryIds.indexOf(catId) >= 0
    );

    if (displayedMeals.length === 0) {
      return <View style={styles.content}>
      <Text style={styles.text}>No Meals Found, Check your Filters</Text>
      </View>
    }

   return <MealList listData = {displayedMeals} navigation={props.navigation} />;
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
 
  const selectedCategory = CATEGORIES.find(cat => cat.id ===catId);

  return {
      headerTitle: selectedCategory.title
  };
};

const styles = StyleSheet.create ({
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

export default CategoryMealScreen;