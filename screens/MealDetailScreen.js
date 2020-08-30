import React, { useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import {useSelector, useDispatch} from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import {toggleFavorite} from '../store/actions/meals1';
import { color } from 'react-native-reanimated';

const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}

const MealDetailScreen = props => {
    const availableMeals = useSelector(state => state.meals.meals);
    const mealId = props.navigation.getParam('mealId');
    
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));
    
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);

    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect (() => {
    //props.navigation.setParams({mealTitle: selectedMeal.title});
        props.navigation.setParams({toggleFav: toggleFavoriteHandler});
    }, [toggleFavoriteHandler]);

    useEffect (() => {
        props.navigation.setParams({isFav: currentMealIsFavorite});
    }, [currentMealIsFavorite]);

    return(
 <ScrollView style={{backgroundColor:'white'}}> 
  <Image source ={{uri: selectedMeal.imageUrl}} style={styles.image} />  
    <View style={styles.details}>
      <Text style={styles.mealText}>{selectedMeal.duration}m</Text>
      <Text style={styles.mealText}>{selectedMeal.complexity.toUpperCase()}</Text>
      <Text style={styles.mealText}>{selectedMeal.affordability.toUpperCase()}</Text>
    </View>
        <Text style={styles.textTitle}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
        ))}
            <Text style={styles.textTitle}>Steps</Text>
            {selectedMeal.steps.map(step => (
            <ListItem key={step}>{step}</ListItem>
            ))}
</ScrollView> 
  );
};

MealDetailScreen.navigationOptions = navigationData => {
    //const mealId = navigationData.navigation.getParam('mealId');
    const mealTitle = navigationData.navigation.getParam('mealTitle');
    const toggleFavorite = navigationData.navigation.getParam('toggleFav');
    const isFavorite = navigationData.navigation.getParam('isFav'); 
    //const selectedMeal = MEALS.find(meal => meal.id === mealId);
  
    return {
        headerTitle: mealTitle,
        //instead of headerRight: headerRight:()=> 
        headerRight:() => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
            title='Favorite' 
            iconName= {isFavorite ? 'ios-star' : 'ios-star-outline' }
            onPress={toggleFavorite}
            />
        </HeaderButtons>
       )
    };
  };
  

const styles=StyleSheet.create ({
    details: {
           flexDirection: 'row',
           padding: 15,
           justifyContent: 'space-around'  
        },
    textTitle:{
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
        color: '#b55555'
    },
    mealText: {
        fontSize: 18,
        color: '#b55555',
        fontFamily: 'open-sans-bold'
    },   
    image:{
        width: '100%',
        height: 200,
    } ,
    listItem:{
        marginVertical: 5,
        marginHorizontal: 20,
        padding: 2,
    }
});

export default MealDetailScreen;