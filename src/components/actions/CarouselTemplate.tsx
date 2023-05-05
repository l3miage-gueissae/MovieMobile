import React, { useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';






type props = { data: any[], renderItem: ({ index }: any) => any }
const CarouselTemplate = (props: props) => {
    const width = Dimensions.get('window').width;
    const [activeSlide, setActiveSlide] = useState(0)

    return (
        <View style={{position:'relative'}}>
            <Carousel
                layout={'default'}
                data={props.data}
                renderItem={props.renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => setActiveSlide(index) }

            />
            <Pagination
                dotsLength={props.data.length}
                activeDotIndex={activeSlide}
                inactiveDotOpacity={0.4}
                containerStyle={{  position:'absolute', bottom:0, width:'100%'}}
                
            />
        </View>

    )
}


const styles = StyleSheet.create({

})


export default CarouselTemplate
