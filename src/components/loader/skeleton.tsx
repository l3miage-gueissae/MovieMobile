import React, { useEffect } from 'react'
import { StyleSheet, View, Animated, Text, TouchableOpacity, ImageBackground } from 'react-native'









const SkeletonLoader = (props: { radius: number, from:number, to:number, duration:number }) => {

    const skeleltonLightPosition = new Animated.Value(props.from)

    const leftToRight = skeleltonLightPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 100]
    })

    const skeletonAnimation = () => {
        Animated.loop(
            Animated.timing(
                skeleltonLightPosition, {
                toValue: props.to,
                duration: props.duration,
                useNativeDriver: true,
            }
            ),
            { iterations: -1 }
        ).start()
    }

    useEffect(() => {
        skeletonAnimation()
    })


    return (
        <ImageBackground source={require('../../assets/logo.png')} blurRadius={15}  style={[styles.backGround, { borderRadius: props.radius }]} >
            <Animated.View    style={[styles.bar, { transform: [{ translateX: leftToRight }] }]} />
        </ImageBackground>
    )
}




const styles = StyleSheet.create({
    backGround: {
        backgroundColor: 'gray',
        width: '100%',
        height: '100%',
        overflow:'hidden',
    },
    bar: {
        backgroundColor: 'white',
        
        width: '15%',
        height: '100%',
        opacity:0.5,

    }

})
export default SkeletonLoader