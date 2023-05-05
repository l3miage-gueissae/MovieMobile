import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { APIbackroundImage } from '../services/GlobalVariable'
import { MiniComponent } from '../services/utils/models/miniComponent.model'
import SkeletonLoader from './loader/skeleton'

import { useNavigation } from 'react-native-navigation-hooks'


type props = { loading: boolean, show: MiniComponent, navigation:any }

const renderMini = (props: props) => {

    return (
        <View >
            <TouchableOpacity onPress={() => RedirectToDetailPage(props)}>
                <Image source={{ uri: `${APIbackroundImage}/w500${props.show.picture}` }} style={[{ width: '100%', height: '100%' }, styles.radius]} />
            </TouchableOpacity>
        </View>
    )
}



const ShowComponent = (props: props) => {
    const [isMini, setIsMini] = useState(true)

    return (
        <View style={[styles.miniSize]}>
            {props.loading ? <SkeletonLoader radius={10} from={-0.2} to={2.5} duration={1300} /> : isMini ? renderMini(props) : ''}
        </View>
    )


}

const RedirectToDetailPage = (props: props) => {
    switch (props.show.type) {
        case 'tv':
            console.log('tv'); break;
        case 'movie':
            console.log('movie'); props.navigation.navigate('DetailMovie', {id:props.show.id}); break;
        case 'person':
            console.log('person'); break;

        default: break;
    }
}





const styles = StyleSheet.create({
    radius: {
        borderRadius: 10,
    },
    miniSize: {
        width: 200 * (2 / 3),
        height: 200,
        padding: 4,

    }
})
export default ShowComponent