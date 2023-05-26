import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { darkGray, GlovalStyle, white } from '../../css/ThemeColor'
import { APIbackroundImage } from '../../services/GlobalVariable'
import { MiniComponent } from '../../services/utils/models/miniComponent.model'
import SkeletonLoader from '../loader/skeleton'

type props = { loading: boolean, show: MiniComponent, navigation: any }

const renderMini = (props: props) => {

    return (
        <View >
            <TouchableOpacity onPress={() => RedirectToDetailPage(props)}>
                <Image source={{ uri: `${APIbackroundImage}/w500${props.show.picture}` }} style={[{ width: '100%', height: '100%' }, styles.radius]} />
                {props.show.type === 'person' ?
                    <View style={styles.acteurNamecontainer}>
                        <Text style={[GlovalStyle.fontSizeNormal, { color: white }]} >{props.show.acteurName}</Text>
                    </View>
                    :
                    undefined}
            </TouchableOpacity>
        </View>
    )
}



const ShowComponent = (props: props) => {
    const [isMini, setIsMini] = useState(true)

    return (
        <View style={[styles.miniSize]}>
            {props.loading ? <SkeletonLoader radius={10} from={-0.2} to={2.5} duration={1300} /> : renderMini(props)}
        </View>
    )


}

const RedirectToDetailPage = (props: props) => {
    switch (props.show.type) {
        case 'tv':
            console.log('tv'); break;
        case 'movie':
            console.log('movie : ' + props); props.navigation.push('DetailMovie', { id: props.show.id, navigation: props.navigation }); break;
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

    },
    acteurNamecontainer: {
        position: 'absolute',
        bottom: 0, 
        width: '100%',
        minHeight: 40,
        backgroundColor: darkGray,
        opacity: 0.90,
        paddingLeft: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius :5,
        display:'flex',
        justifyContent:'center'
    }
})
export default ShowComponent


