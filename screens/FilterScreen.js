import React, {useState, useEffect,useCallback} from 'react';
import {View,Text,StyleSheet,Switch, Platform} from 'react-native';
import {HeaderButtons,Item} from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import {setFilters} from '../store/actions/meals1';

const FilterSwitch = props => {
  return(
    <View style={styles.filterContainer}>
    <Text style={styles.options}>{props.label}</Text>
    <Switch 
      trackColor={{true: Colors.maroon}}//true is when on, false default color/color when toggled
      thumbColor={Platform.OS === 'android' ? Colors.maroon : Colors.accentColor}
      value={props.state} 
      onValueChange={props.onChange} 
    />
  </View>
  );
};

const FilterScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

const saveFilters = useCallback(() => {
  const appliedFilters = {
    glutenfree: isGlutenFree,
    lactosrFree: isLactoseFree,
    vegan: isVegan,
    vegetarian: isVegetarian
 };

 dispatch(setFilters(appliedFilters));
}, [isGlutenFree,isLactoseFree,isVegan,isVegetarian,dispatch]);

useEffect(() => {
  navigation.setParams({save: saveFilters});
}, [saveFilters]);
  return(  
    <View style={styles.screen}>
      <Text style={styles.text}> Available Filters / Restrictions</Text>
      <FilterSwitch label='Gluten Free' 
      state={isGlutenFree} 
      onChange={newValue => setIsGlutenFree(newValue)}  
      />
       <FilterSwitch label='Lactose Free' 
      state={isLactoseFree} 
      onChange={newValue => setIsLactoseFree(newValue)}  
      />
       <FilterSwitch label='Vegan' 
      state={isVegan} 
      onChange={newValue => setIsVegan(newValue)}  
      />
       <FilterSwitch label='Vegetarian' 
      state={isVegetarian} 
      onChange={newValue => setIsVegetarian(newValue)}  
      />
    </View>
    );
};

FilterScreen.navigationOptions = (navData) => {
    return {
      headerTitle: 'Filter Meals',
    //instead of headerLeft: headerLeft:() =>
    headerLeft:() => <HeaderButtons HeaderButtonComponent={HeaderButton} > 
      <Item title = "Menu" iconName = 'ios-menu' onPress={() => {
        navData.navigation.toggleDrawer();
        }}
      />
     </HeaderButtons>,
      headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} > 
      <Item
       title = "Save" 
       iconName = 'ios-save' 
       onPress={
        navData.navigation.getParam('save')} 
      />
     </HeaderButtons>,
  };
};

const styles=StyleSheet.create ({
    screen: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',       
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '80%',
      marginVertical: 5
    },
    text: {
      fontSize: 22,
      fontFamily: 'open-sans-bold',
      margin: 20,
      textAlign: 'center',
      color: Colors.maroon
    },
    options: {
      fontSize: 20,
      color: Colors.primaryColor,
      fontFamily: 'open-sans-bold',
      margin: 10
    }
 });

export default FilterScreen;