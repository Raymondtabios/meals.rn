import React from 'react';
import { Platform } from 'react-native'
import { createStackNavigator, HeaderTitle } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer'; 

import FavoritesScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors';
import FilterScreen from '../screens/FilterScreen';


const defaultStackNavOptions ={
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : Colors.funColor
  },
  //font of header
  headerTitleStyle:{
    fontFamily: 'open-sans-bold',
    fontSize: 22
  },
  // for next page header (back button)
  headerBackTitileStyle:{
    fontFamily: 'open-sans',
    fontSize: 22
  },
    headerTintColor: 
      Platform.OS === 'android' ? Colors.accentColor : Colors.primaryColor,  
    headerTitle: 'A Screen'
}; 

const MealsNavigator = createStackNavigator({
  Categories: {
    screen: CategoriesScreen, 
  },
  CategoryMeals: {
    screen: CategoryMealsScreen,
  },
  MealDetail: MealDetailScreen
  }, {
    defaultNavigationOptions: defaultStackNavOptions
  });

const FavNavigator = createStackNavigator({
  Favorites: FavoritesScreen,
  MealDetail: MealDetailScreen
}, {
  defaultNavigationOptions: defaultStackNavOptions      
});

const tabScreenConfig = {
    Meals: {
      screen: MealsNavigator, 
      navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
        <Ionicons 
            name='ios-restaurant' 
            size={28} 
            color={tabInfo.tintColor} 
           />
        );
      },
      //default screen tab color
      tabBarColor: Colors.primaryColor,
        //for android to change buttom tab label ad design    
        //tabBarLabel: <Text styles={styles.etc}> Meals!! or Favs!! </Text>
        // you can use Platform.OS because younly need this for android
   }
},
      Favorites: {
        screen: FavNavigator, 
        navigationOptions:{
        tabBarIcon: (tabInfo) => {
        return (
          <Ionicons 
              name='ios-star' 
              size={28} 
              color={tabInfo.tintColor} 
             />
            );
          },
          //favorites buttom color tab android
          tabBarColor: '#778899'
        }
      }
   };
  
// tabBarColor only works on shifting true
// or tou can add a barStyle: {backgroundColor:}
//Creating tabs under the app
const MealsFavNavigator = 
  Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
      //color of icons on buttom tab (white)
      activeTintColor: Colors.accentColor,
      shifting: true,
      barStyle: {
        backgroundColor: 'blue'
      }
    })
    : createBottomTabNavigator(tabScreenConfig, {
          // To style buttom tab, refer to docs online
          tabBarOptions: {
            //font on buttom bar
            labelStyle:{
              fontFamily: 'open-sans-bold'
            },
            //color when pressed
            activeTintColor: Colors.alternateColor
          }
        });

const FiltersNavigator = createStackNavigator ({
  Filters: FilterScreen
  }, 
    {
      //navigationOptions: {
      //drawerLabel: 'Filters!'
      //},
    defaultNavigationOptions: defaultStackNavOptions      
    }
);
// to change color of tabs same with tabs
  const MainNavigator = createDrawerNavigator ({
    MealsFavs : {
      screen: MealsFavNavigator, 
      navigationOptions: {
        drawerLabel: 'Meals'
    }
  },
    Filters: FiltersNavigator
  }, {
    //left tab design
    contentOptions: {
      activeTintColor: '#b22222',
      labelStyle: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
      }
    }
  });

export default createAppContainer(MainNavigator);