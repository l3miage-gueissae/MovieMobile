import React, { useEffect } from 'react'
import { StyleSheet, Animated, ImageBackground, View } from 'react-native'
import { darkGray } from '../../css/ThemeColor'










const SkeletonLoader = (props: { radius: number, from: number, to: number, duration: number }) => {

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

        <View style={[styles.backGround, { borderRadius: props.radius }]} >
            <Animated.View style={[styles.bar, { transform: [{ translateX: leftToRight }] }]} />
        </View>
    )
}




const styles = StyleSheet.create({
    backGround: {
        backgroundColor: darkGray,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    bar: {
        backgroundColor: 'white',

        width: '15%',
        height: '100%',
        opacity: 0.5,

    }

})
export default SkeletonLoader