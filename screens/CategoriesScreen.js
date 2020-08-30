import React from 'react';
import {StyleSheet,FlatList,} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import {CATEGORIES} from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = props => {
  const renderGridData = (itemData) => {
    return (
    <CategoryGridTile 
    title={itemData.item.title} 
    color={itemData.item.color}
    onSelect={() => {
      props.navigation.navigate({
        routeName: 'CategoryMeals', 
        params: {
        categoryId: itemData.item.id
        }
       });
      }} 
     />
    );
  };
      
 return(
   <FlatList 
   keyExtractor={(item,index) => item.id}
   data={CATEGORIES} 
   renderItem={renderGridData} 
   numColumns={2}
   />
  );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Meal Categories',
    //instead of headerLeft: headerLeft:() =>
    headerLeft:() => <HeaderButtons HeaderButtonComponent={HeaderButton} > 
      <Item title = "Menu" iconName = 'ios-menu' onPress={() => {
        navData.navigation.toggleDrawer();
        }} />
     </HeaderButtons>
  };  
};

const styles = StyleSheet.create ({
 screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'      
        },
           
  });

export default CategoriesScreen;

// props.navigation.replace() - best used for log in screen
// renderitem - takes an item from data na renders it into the list
// function => is an object