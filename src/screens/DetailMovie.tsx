import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text  } from 'react-native'
import HeaderMenu from '../components/HeaderMenu';
import ScreenSplit from '../components/ScreenSplit';
import { genre } from '../services/Genre/model/genre.model';
import { media_type } from '../services/Movie/model/trending.model';
import CarouselTemplate from '../components/actions/CarouselTemplate';
import { Movie } from '../services/Movie/model/movie.model';

type data<T> = { loading: boolean, data: T }
type dataHome = {
    trend: data<any>,
    genre: data<genre[]>,

}
type dataName = 'trend'

const content: { title: string, dataName: dataName }[] = [
    { title: 'Tendance', dataName: 'trend' }
]



// content display in the top of the component, will disepear in scrolling
const TopContent = (setAffiche: any, data: any) => {
    setAffiche({
        loading: false,
        data: (
            <View >
                <CarouselTemplate data={[1,2,3]} renderItem={renderItem}/>
                {/* <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${APIbackroundImage}/w500${data.backdrop_path}` }} />
                <View style={styles.absolutePosition}>
                    <View style={styles.contextOnImage}>
                        <Text style={styles.afficheTitle}>{data.title ? data.title : data.name}</Text>
                    </View>
                </View> */}
            </View>
        )
    })
}



const renderItem = ({ item, index }: any) => {
    return (
        <View style={{ backgroundColor: 'orange', height: '100%' }}>
            <Text>tot {index}</Text>
        </View>
    );
}


type props = {id:number}
const DetailMovie = (navigation:any) => {

    const [menu, setMenu] = useState('affiche' as media_type)
    const [affiche, setAffiche] = useState({loading:true,data:[{},{},{}]})
    const [mainContentView, setMainContentView] :[any,any] = useState()
    const props : props = navigation.route.params
    const [dataMovie, setdataMovie] :[Movie,any] = useState({
        id:props.id,
        category:{loading:true,data:[]},
        description:'',
        imagesPath:{loading:true,data:['','','']},
        videos:{loading:true,data:[{},{},{}]},
        opinions:{loading:true,data:[]},
        people:{loading:true,data:[{},{},{}]},
        provider:{loading:true,data:[{},{},{}]},
        recomendation:{loading:true,data:[{},{},{}]},
        similarity:{loading:true,data:[{},{},{}]},
    })


    useEffect(() => {
        TopContent(setAffiche,affiche)
    },[ affiche.loading])
    // the content of the component, will stay in scrolling
    const MainContent = () => {
        // console.log(dataHome.showByGenre.data.results.length)
        setMainContentView(
            <View>

                

            </View>
        )
    }

    return (
        <View>
            <HeaderMenu menu={{ menu: menu, setMenu: setMenu }} options={[{value:'affiche',label:'Affiche'}, {value:'trailer',label:'Bande annonce'}]}></HeaderMenu>
            <ScreenSplit TopContent={affiche} MainContent={mainContentView}></ScreenSplit>
        </View>
    )


}




const styles = StyleSheet.create({
    absolutePosition: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
    },
    afficheTitle: {
        display: 'flex',
        width: '90%',
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'

    },
    paddingTitle: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    contextOnImage: { display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: '80%', width: '100%', justifyContent: 'center' }
})
export default DetailMovie