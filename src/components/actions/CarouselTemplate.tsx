import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';






type props = { data: any[], renderItem: ({ index }: any) => any, loop?: true, next?: number, previous?: number, activeSlide?: (i:number) => void }
const CarouselTemplate = (props: props) => {
    const width = Dimensions.get('window').width;
    const [activeSlide, setActiveSlide] = useState(0)
    const [desactiveLoop, setDesactiveLoop] = useState(props?.loop as boolean)
    let carouselRef: any;

    useEffect(() => {
        if (props.next !== 0) {
            // DesactivateLoop()
            activeSlide === props.data.length - 1 ? carouselRef.snapToItem(0) : carouselRef.snapToItem(activeSlide + 1)
        }
    }, [props.next])
    useEffect(() => {
        if (props.next !== 0) {
            // DesactivateLoop()
            activeSlide === 0 ? carouselRef.snapToItem(props.data.length - 1) : carouselRef.snapToItem(activeSlide - 1)
        }
    }, [props.previous])

// ne fonctionne pas 
    const DesactivateLoop = () => {        
        if (!desactiveLoop)
            setTimeout(() => {
                setDesactiveLoop(true)
            }, 10000);

        setDesactiveLoop(false)

    }
    return (
        <View style={{ position: 'relative' }}>
            <Carousel
                layout={'default'}
                data={props.data}
                renderItem={props.renderItem}
                sliderWidth={width}
                itemWidth={width}
                onSnapToItem={(index) => {setActiveSlide(index); if(props.activeSlide) props.activeSlide(index)}}
                autoplay={desactiveLoop}
                loop={true}
                autoplayDelay={1000}
                autoplayInterval={4000}
                lockScrollWhileSnapping={true}
                ref={(r: any) => carouselRef = r}


            />
            <Pagination
                dotsLength={props.data.length}
                dotStyle={{

                    backgroundColor: '#ffff'
                }}
                inactiveDotStyle={{
                    backgroundColor: '#ffff'
                }}
                activeDotIndex={activeSlide}
                inactiveDotOpacity={0.4}
                containerStyle={{ position: 'absolute', bottom: 0, width: '100%' }}

            />
        </View>

    )
}


const styles = StyleSheet.create({

})


export default CarouselTemplate
