import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Animated, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import LinearSelect from '../components/actions/LinearSelect';
import HeaderMenu from '../components/HeaderMenu';
import ScreenSplit from '../components/ScreenSplit';
import ShowComponent from '../components/View/ShowComponent';
import { ShowDiscovery ,MovieTrend} from '../services/Discovery/discovery.service';
import { paramDiscovery } from '../services/Discovery/model/discovery.model';
import { getAllGenre } from '../services/Genre/genre.service';
import { genre } from '../services/Genre/model/genre.model';
import { APIbackroundImage } from '../services/GlobalVariable';
import { media_type } from '../services/Movie/model/trending.model';

type data<T> = { loading: boolean, data: T }
type dataHome = {
    trend: data<any>,
    genre: data<genre[]>,
    showByGenre: data<any>

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
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${APIbackroundImage}/w1280${data.backdrop_path}` }} />
                <View style={styles.absolutePosition}>
                    <View style={styles.contextOnImage}>
                        <Text style={styles.afficheTitle}>{data.title ? data.title : data.name}</Text>
                    </View>
                </View>
            </View>
        )
    })
}

const loadDataTopContent = (menu: media_type, setDatahome: any) => {
    MovieTrend(menu).then((res) => {
        if (res.success)
            setDatahome((datahome: any) => ({ ...datahome, trend: { loading: false, data: res.data.results } }))
    })
    getAllGenre(menu).then((res) => {
        if (res.success)
            setDatahome((datahome: any) => ({ ...datahome, genre: { loading: false, data: res.data } }))

    })
    const discovey: paramDiscovery = { include_adult: false, include_video: false, sort_by: 'popularity.desc' }
    ShowDiscovery(menu, discovey, 1).then((res) => {
        if (res.success)
            setDatahome((datahome: any) => ({ ...datahome, showByGenre: { loading: false, data: res.data } }))
    })

}

const loadMoviefromGenreMovie = (menu:media_type,genres: number[], setDatahome: any) => {
    console.log(genres)
    setDatahome((datahome: any) => ({ ...datahome, showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] } }))

    const discovey: paramDiscovery = { genres: genres, include_adult: false, include_video: false, sort_by: 'popularity.desc' }
    ShowDiscovery(menu, discovey, 1).then((res) => {
        if (res.success)
            setDatahome((datahome: any) => ({ ...datahome, showByGenre: { loading: false, data: res.data } }))
    })
}








const Home = ({navigation}) => {
    const [affiche, setAffiche] = useState({ loading: true, data: '' })
    const [mainContentView, setMainContentView] :[any,any] = useState()
    const [dataHome, setDatahome] = useState({
        trend: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] },
        genre: { loading: true, data: [] },
        showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] }

    } as dataHome)
    const [menu, setMenu] = useState('movie' as media_type)
    useEffect(() => {
        setDatahome({
            trend: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] },
            genre: { loading: true, data: [] },
            showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] }, // objet vide permet l'effet de chargement
        })

        loadDataTopContent(menu, setDatahome)
    }, [menu])

    useEffect(() => {
        MainContent()
    }, [dataHome.trend.loading, dataHome.genre.loading, dataHome.showByGenre.loading])
    useEffect(() => {
        TopContent(setAffiche, dataHome.trend.data[0])
    }, [dataHome.trend.loading])


    // the content of the component, will stay in scrolling
    const MainContent = () => {
        console.log(dataHome.trend.data.length)
        // console.log(dataHome.showByGenre.data.results.length)
        setMainContentView(
            <View>

                {content.map((list) => {                    
                    return (<View>
                        <Text style={[styles.afficheTitle, styles.paddingTitle]}>{list.title}</Text>
                        <FlatList

                            horizontal={true}
                            data={dataHome[list.dataName].data}
                            renderItem={({ item }) => <ShowComponent loading={dataHome[list.dataName].loading} show={{ picture: item.poster_path, id:item.id, type:menu }}  navigation={navigation} />}
                            keyExtractor={(item, index) => index as any}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    )
                })}
                <LinearSelect genres={dataHome.genre.data} selected={(genres: number[]) => loadMoviefromGenreMovie(menu,genres, setDatahome)} />
                <FlatList

                    horizontal={true}
                    data={dataHome.showByGenre.data}
                    renderItem={({ item }) => <ShowComponent loading={dataHome.showByGenre.loading} show={{ picture: item.poster_path, id:item.id, type:menu }} navigation={navigation} />}
                    keyExtractor={(item, index) => index as any}
                    showsHorizontalScrollIndicator={false}
                />



            </View>
        )
    }

    return (
        <View>
            <HeaderMenu menu={{ menu: menu, setMenu: setMenu }} options={[{value:'movie',label:'Film'}, {value:'tv',label:'Série'}]}></HeaderMenu>
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
export default Home