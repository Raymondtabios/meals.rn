import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import Colors from '../constants/Colors';

const MealItem = props => {
    return(
   <View style={styles.mealItem}>     
   <TouchableOpacity onPress={props.onSelectMeal}>     
    <View>
        <View style={{...styles.mealRow, ...styles.mealHeader}}>
           <ImageBackground 
                source={{uri: props.image}} 
                style={styles.bgImage}> 

               <View style={styles.titleContainer}> 
                    <Text style={styles.title} numberOfLines={1}>
                    {props.title}
                    </Text>
                </View>    
            </ImageBackground> 
        </View>
        <View style={{...styles.mealRow, ...styles.mealDetail}} >
            <Text style={styles.mealText}>{props.duration}m</Text>
            <Text style={styles.mealText}>{props.complexity.toUpperCase()}</Text>
            <Text style={styles.mealText}>{props.affordability.toUpperCase()}</Text>
        </View>    
    </View>
   </TouchableOpacity> 
   </View>
    );
};

const styles = StyleSheet.create({
    mealHeader: {
       height: '85%',
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%'
    },
    mealItem:{
        height: 200,
        width: '100%',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10

    },
    mealRow: {
        flexDirection: 'row',
    },
    bgImage: {
        width: '100%',
        height: '100%',
        justifyContent: "flex-end"
    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'mintcream',
        textAlign: 'center'
    },
    titleContainer:{
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        },
    mealText: {
        fontSize: 16,
        color: '#b55555'
    }    
});

export default MealItem;