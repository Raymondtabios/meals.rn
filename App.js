import React, { useState } from 'react';
import { Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo'; 
// AppLoading prolongs the app screen when screen starts until fomts are loaded

import {createStore,combineReducers} from 'redux';
import MealsNavigator from './navigation/MealsNavigator';
import {enableScreens} from 'react-native-screens';
import mealsReducer from './store/actions/reducers/meals';
import {Provider} from 'react-redux';


enableScreens();
//useScreens is now enableScreens
const rootReducer = combineReducers({
  meals : mealsReducer
});

const store = createStore(rootReducer);

// fetchFonts a fuction that will use font
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded) {
    return(
      <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      /> // this will make sure screen will not load until fonts are loaded
    );
  };

  return (
  <Provider store={store}>
    <MealsNavigator/>
  </Provider>
  );
}
