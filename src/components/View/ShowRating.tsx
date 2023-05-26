import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { darkpage, GlovalStyle, white } from '../../css/ThemeColor'


const screenWidth = Dimensions.get('window').width




type props = { rating: number } // 'N / 100'
const ShowRating = (props: props) => {
    // animation slide
    const translateX = useRef(new Animated.Value(-screenWidth)).current; // scroll Animation value
    const translateAnimation = Animated.timing(translateX, {
        toValue: - (100 - props.rating * 10) / 100 * screenWidth,
        duration: 1500,
        useNativeDriver: true,
    })
    translateAnimation.start()
//     // animation number
//     const note = useRef(new Animated.Value(0)).current; // scroll Animation value
//     const noteAnimation = Animated.timing(note, {
//         toValue: props.rating,
//         duration: 1500,
//         useNativeDriver: true,
//     })
//     noteAnimation.start()
// console.log(note);


    const color = (number:any) => {
        if(number === 0)
            return darkpage
        
        if(number <= 3 )
            return 'red'
        if(number <= 6)
            return 'orange'
        if(number <= 10)
            return 'green'
        return 'black'
    }
    
    
    return [
        <Animated.View style={{ position: 'absolute', left: 0, top: Dimensions.get('window').height * 0.272, zIndex: 2, width: '100%', backgroundColor: color(props.rating), height: 25, transform: [{ translateX: translateX }] }}>
        </Animated.View>,
        <Animated.View style={[{ position: 'absolute', display: 'flex', justifyContent: 'center', right: -12.5, top: Dimensions.get('window').height * 0.27, zIndex: 3, width: 25, backgroundColor: color(props.rating), alignItems: 'center', height: 25, marginTop: -10,  transform: [{ translateX: translateX }] }, GlovalStyle.round]}>
            <Text style={{ color: white, fontWeight:'700', fontSize:13 }}>{props.rating.toFixed(1)}</Text>
        </Animated.View>


    ]
}




const styles = StyleSheet.create({

})

export default ShowRating
