import React, {  useRef } from 'react'
import { StyleSheet, View, Text, Image, Animated } from 'react-native'
import { Dimensions } from 'react-native';
import { darkpage } from '../css/ThemeColor';
import SkeletonLoader from './loader/skeleton';

const screen = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}


type props  = {TopContent: any, MainContent:  any }

const ScreenSplit = (props:props) => {

    const headerHeight = screen.height * 0.30; // size of the first Affiche
    const scrolling = useRef(new Animated.Value(0)).current; // scroll Animation value

    return (
        <View >
            <Animated.ScrollView onScroll={Animated.event(
                [{
                    nativeEvent: {
                        contentOffset: {
                            y: scrolling,
                        },
                    },

                }], { useNativeDriver: true }

            )}>
                <Animated.View
                    style={{
                        height: headerHeight,
                        transform: [{ translateY: scrolling }],
                        zIndex: 1,
                        minHeight:250,
                        maxHeight:450
                    }}
                >
                    {props.TopContent.loading ?  <SkeletonLoader radius={0} from={-0.2} to={2.5} duration={1300}/>  : props.TopContent.data}

                    
                </Animated.View>


                <View style={styles.MainContent}>
                    {props.MainContent}
                </View>
            </Animated.ScrollView>
        </View>
    )
}




const styles = StyleSheet.create({
    MainContent: {
        backgroundColor: darkpage,
        minHeight: 800,
        zIndex: 2,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        marginTop:-20
    }
})
export default ScreenSplit