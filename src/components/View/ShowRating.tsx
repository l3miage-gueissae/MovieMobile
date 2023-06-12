import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { darkpage, GlovalStyle, green, orange, red, white } from '../../css/ThemeColor'
import { CountUp } from 'use-count-up'


const screenWidth = Dimensions.get('window').width




type props = { rating: number } // 'N / 100'
const ShowRating = (props: props) => {
    // animation slide
    const translateX = useRef(new Animated.Value(-screenWidth)).current;
    const translateAnimation = Animated.timing(translateX, {
        toValue: - (100 - props.rating * 10) / 100 * screenWidth,
        duration: 1500,
        useNativeDriver: false,
    })
    // animation Color
    const colorValue = useRef(new Animated.Value(0)).current;
    const boxInterpolation = colorValue.interpolate({
        inputRange: [0, 6, 8],
        outputRange: [red, orange, green]
    })
    const colorAnimation = Animated.timing(colorValue, {
        toValue: 8,
        duration: 1500,
        useNativeDriver: false,
    });

    useEffect(() => {
        translateAnimation.start()
        colorAnimation.start()
    }, [props.rating]);


    return [
        <Animated.View style={[styles.slideBar, {
            transform: [{ translateX: translateX }], backgroundColor: boxInterpolation
        }]}>
        </Animated.View>,
        <Animated.View style={[styles.ratingRound,{ backgroundColor: boxInterpolation, alignItems: 'center', height: 25, marginTop: -10, transform: [{ translateX: translateX }] }, GlovalStyle.round]}>

            <Text style={{ color: white, fontWeight: '700', fontSize: 13 }}><CountUp isCounting start={0} end={props.rating} duration={1.5} decimalPlaces={1} /></Text>
        </Animated.View>


    ]
}




const styles = StyleSheet.create({
    slideBar: {
        position: 'absolute',
        left: 0,
        top: Dimensions.get('window').height * 0.272,
        zIndex: 2,
        width: '100%',
        height: 25
    },
    ratingRound: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        right: -12.5,
        top: Dimensions.get('window').height * 0.27,
        zIndex: 3,
        width: 25,
    }
})

export default ShowRating
