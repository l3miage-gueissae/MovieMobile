import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, Animated, FlatList } from 'react-native'
import { Dimensions } from 'react-native';
import LinearSelect from '../components/actions/LinearSelect';
import HeaderMenu from '../components/HeaderMenu';
import ScreenSplit from '../components/ScreenSplit';
import ShowComponent from '../components/View/ShowComponent';
import { ShowDiscovery, MovieTrend } from '../services/Discovery/discovery.service';
import { paramDiscovery } from '../services/Discovery/model/discovery.model';
import { getAllGenre } from '../services/Genre/genre.service';
import { genre } from '../services/Genre/model/genre.model';
import { APIbackroundImage } from '../services/GlobalVariable';
import { media_type } from '../services/Movie/model/trending.model';
import { getShows } from '../services/User/user.service'
import { useFocusEffect } from '@react-navigation/native';

type data<T> = { loading: boolean, data: T }
type dataHome = {
    trend: data<any>,
    genre: data<genre[]>,
    showByGenre: data<any>,
    likes: data<any>


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
            <View  key={'home-topContent-00001'}>
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

const loadDataTopContent = async (menu: media_type, setDatahome: any) => {
    const discovey: paramDiscovery = { include_adult: false, include_video: false, sort_by: 'popularity.desc' }

    const res: any = await Promise.all([
        MovieTrend(menu),
        getAllGenre(menu),
        ShowDiscovery(menu, discovey, 1),
        getShows()
    ]).catch((err) => {
        console.log(err);
    })
    setDatahome((datahome: any) => ({
        ...datahome,
        trend: { loading: false, data: res[0].data.results },
        genre: { loading: false, data: res[1].data },
        showByGenre: { loading: false, data: res[2].data },
        likes: { loading: false, data: res[3] }
    }))
}

const loadMoviefromGenreMovie = (menu: media_type, genres: number[], setDatahome: any) => {
    console.log(genres)
    setDatahome((datahome: any) => ({ ...datahome, showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] } }))

    const discovey: paramDiscovery = { genres: genres, include_adult: false, include_video: false, sort_by: 'popularity.desc' }
    ShowDiscovery(menu, discovey, 1).then((res) => {
        if (res.success)
            setDatahome((datahome: any) => ({ ...datahome, showByGenre: { loading: false, data: res.data } }))
    })
}








const Home = ({ navigation }) => {
    const [affiche, setAffiche] = useState({ loading: true, data: '' })
    const [mainContentView, setMainContentView]: [any, any] = useState()
    const [dataHome, setDatahome] = useState({
        trend: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] },
        genre: { loading: true, data: [] },
        showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] },
        likes: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] }

    } as dataHome)
    const [menu, setMenu] = useState('movie' as media_type)
    useEffect(() => {
        setDatahome({
            trend: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] },
            genre: { loading: true, data: [] },
            showByGenre: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] }, // objet vide permet l'effet de chargement
            likes: { loading: true, data: [{}, {}, {}, {}, {}, {}, {}, {}] }

        })
        loadDataTopContent(menu, setDatahome)
    }, [menu])

    // 
    useFocusEffect(
        useCallback(() => {
            setDatahome((datahome: any) => ({
                ...datahome,
                likes: { loading: true, data: [] }
            }))
            getShows().then(data => {
                setDatahome((datahome: any) => ({
                    ...datahome,
                    likes: { loading: false, data: data }
                }))
            })

        }, []))


    useEffect(() => {
        MainContent()
    }, [dataHome.trend.loading, dataHome.genre.loading, dataHome.showByGenre.loading, dataHome.likes.loading])
    useEffect(() => {
        TopContent(setAffiche, dataHome.trend.data[0])
    }, [dataHome.trend.loading])



    // the content of the component, will stay in scrolling
    const MainContent = () => {
        console.log(dataHome.trend.data.length)
        // console.log(dataHome.showByGenre.data.results.length)
        setMainContentView(
            <View  key={'home-mainContent-00001'}>

                {content.map((list) => {
                    return (<View>
                        <Text style={[styles.afficheTitle, styles.paddingTitle]}>{list.title}</Text>
                        <FlatList

                            horizontal={true}
                            data={dataHome[list.dataName].data}
                            renderItem={({ item }) => <ShowComponent loading={dataHome[list.dataName].loading} show={{ picture: item.poster_path, id: item.id, type: menu }} navigation={navigation} />}
                            keyExtractor={(item, index) => index as any}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>

                    )
                })}
                <Text style={[styles.afficheTitle, styles.paddingTitle]}>Catégories</Text>

                <LinearSelect genres={dataHome.genre.data} selected={(genres: number[]) => loadMoviefromGenreMovie(menu, genres, setDatahome)} />
                <FlatList

                    horizontal={true}
                    data={dataHome.showByGenre.data}
                    renderItem={({ item }) => <ShowComponent loading={dataHome.showByGenre.loading} show={{ picture: item.poster_path, id: item.id, type: menu }} navigation={navigation} />}
                    keyExtractor={(item, index) => index as any}
                    showsHorizontalScrollIndicator={false}
                />
                <Text style={[styles.afficheTitle, styles.paddingTitle]}>Favoris</Text>

                {/* <LinearSelect genres={dataHome.genre.data} selected={(genres: number[]) => loadMoviefromGenreMovie(menu,genres, setDatahome)} />
                */}
                <FlatList

                    horizontal={true}
                    data={dataHome.likes.data}
                    renderItem={({ item }) => <ShowComponent loading={dataHome.showByGenre.loading} show={item} navigation={navigation} />}
                    keyExtractor={(item, index) => index as any}
                    showsHorizontalScrollIndicator={false}
                />



            </View>
        )
    }

    return (
        <View key={'home-screen-00001'}>
            <HeaderMenu menu={{ menu: menu, setMenu: setMenu }} options={[{ value: 'movie', label: 'Film' }, { value: 'tv', label: 'Série' }]} navigation={navigation}
             key={'home-headerMenu-instance-0000212'}/>
            <ScreenSplit TopContent={affiche} MainContent={mainContentView} key={'home-ScreenSplit-instance-0256451'}></ScreenSplit>
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