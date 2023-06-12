import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Image, FlatList } from 'react-native'
import HeaderMenu from '../components/HeaderMenu';
import ScreenSplit from '../components/ScreenSplit';
import type { genre } from '../services/Genre/model/genre.model';
import CarouselTemplate from '../components/actions/CarouselTemplate';
import { Movie } from '../services/Movie/model/movie.model';
import { GetAllMovieAffiche, GetMovieCredit, GetMovieDetail, GetMovieProvider, GetMovieRecommendations, GetMovieSimilar, GetMovieVideos } from '../services/Movie/MovieService';
import { APIbackroundImage } from '../services/GlobalVariable';
import { Button, IconButton, Text } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';
import LinearSelect from '../components/actions/LinearSelect';
import { darkGray, GlovalStyle, primary, red, white } from '../css/ThemeColor';
import YoutubeIframe from 'react-native-youtube-iframe';
import SkeletonLoader from '../components/loader/skeleton';
import ShowProvider from '../components/View/ShowProvider';
import ShowComponent from '../components/View/ShowComponent';
import ShowRating from '../components/View/ShowRating';
import { MiniComponent } from '../services/utils/models/miniComponent.model';
import { likeShow, unLikeShow, getShow } from '../services/User/user.service';

type data<T> = { loading: boolean, data: T }





const renderAffiche = ({ item, index }: any) => {
    return (
        <Image style={{ width: "100%", height: "100%" }} source={{ uri: `${APIbackroundImage}/w1280${item.file_path}` }} />
    );
}



type dataName = 'recomendation' | 'similarity'

const content: { title: string, dataName: dataName }[] = [
    { title: 'Recommendations ', dataName: 'recomendation' },
    { title: 'Similarité ', dataName: 'similarity' }
]



type props = { show: MiniComponent }
const DetailMovie = (navigation: any) => {

    let [menuOptions, setMenuOptions]: [{ value: string, label: string }[], any] = useState([])
    const [menu, setMenu] = useState('affiche')
    const [affiche, setAffiche] = useState({ loading: true, data: <View></View> })
    const [betweenContent, setBetweenContent]: [any, any] = useState()
    const [mainContentView, setMainContentView]: [any, any] = useState()
    const props: props = navigation.route.params
    const [dataMovie, setdataMovie] = useState<Movie>({
        id: props.show.id,
        category: { loading: true, data: [] as genre[] },
        title: '',
        description: '',
        imagesPath: { loading: true, data: ['', '', ''] },
        videos: { loading: true, data: [] },
        opinions: { loading: true, data: [] },
        credits: { loading: true, data: [{}, {}, {}] },
        provider: { loading: true, data: [{}, {}, {}] },
        recomendation: { loading: true, data: [{}, {}, {}] },
        similarity: { loading: true, data: [{}, {}, {}] },
        state: '',
        voteAverage: 0,
        isLike: false
    } as Movie)
    // bande annonce is ready
    const [BAReady, setBAReady] = useState(false)
    const [creaditFilter, setCreditFilter]: [any, any] = useState({ options: new Set(), dataFilter: [{}, {}, {}] })


    const LoadingData = async (idMovie: number) => {
        const isLike = getShow(props.show) >=0 
          
        const res: any = await Promise.all([
            GetAllMovieAffiche(idMovie),
            GetMovieDetail(idMovie),
            GetMovieVideos(idMovie),
            GetMovieProvider(idMovie),
            GetMovieCredit(idMovie),
            GetMovieRecommendations(idMovie),
            GetMovieSimilar(idMovie)
        ]).catch((err) => {
            console.log(err);
        })
        console.log('loading');
        // console.log(res[1].data);
        // console.log(res[2].data.filter((v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')));
        const filterMovie = res[2].data.filter((v: any) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'))
        const distinctThings: Set<string> = new Set(res[4].data.map((e: any) => { return e.known_for_department }))
        setCreditFilter({ options: Array.from(distinctThings).map((e: string) => { return { id: e, name: e } }), dataFilter: res[4].data })

        setdataMovie((dataMovie: Movie) => (
            {
                ...dataMovie,
                imagesPath: { loading: false, data: res[0].data.backdrops.slice(0, 5).filter((e: any) => e.iso_639_1 === null) },
                title: res[1].data.title,
                description: res[1].data.overview,
                voteAverage: res[1].data.vote_average,
                category: { loading: false, data: res[1].data.genres },
                videos: { loading: false, data: filterMovie },
                provider: { loading: false, data: res[3].data?.buy || [] },
                credits: { loading: false, data: res[4].data.filter((e: any) => e?.profile_path) },
                recomendation: { loading: false, data: res[5].data.results },
                similarity: { loading: false, data: res[6].data.results },
                isLike: isLike
                //vérif les porfil image, certain acteur n'apparaiise pas 
            }
        ))

        if (filterMovie.length > 0) {
            setMenuOptions([{ value: 'affiche', label: 'Affiche' }, { value: 'trailer', label: 'B.A.' }])

        }


        // res[4].data.reduce((i:any,t:any)=> console.log(t));

    }
    useEffect(() => {

        LoadingData(props.show.id)
    }, [true])


    //this will be use to slide image under the title (transmition work but not the snapToNext methode)
    const [slideNext, setSlideNext] = useState(0 as number);
    const [slidePrev, setSlidePrev] = useState(0 as number);

    useEffect(() => {
        TopContent(dataMovie.imagesPath.data, dataMovie.title)
        // console.log(dataMovie.videos);

    }, [dataMovie.imagesPath.loading, dataMovie.videos.loading, slideNext, slidePrev, menu, BAReady])

    useEffect(() => {
        BetweenContent()
    }, [dataMovie.category.loading])

    useEffect(() => {
        MainContent()
    }, [dataMovie.category.loading, dataMovie.provider.loading, dataMovie.credits.loading, creaditFilter.dataFilter.length, dataMovie.isLike])


    const likeMovie = async () => {
        if (await likeShow(props.show))
            setdataMovie((dataMovie: Movie) => (
                {
                    ...dataMovie,
                    isLike: true
                }))
    }
    const unLikeMovie = async () => {
        if (await unLikeShow(props.show))
            setdataMovie((dataMovie: Movie) => (
                {
                    ...dataMovie,
                    isLike: false
                }))
    }


    // the content of the component, will stay in scrolling
    // content display in the top of the component, will disepear in scrolling
    const TopContent = (backdrops: any[], title: string) => {

        setAffiche({
            loading: false,
            data: menu === 'affiche' ? (
                <View >
                    <CarouselTemplate data={backdrops} renderItem={renderAffiche} next={slideNext} previous={slidePrev} loop />
                    <View style={styles.absolutePosition}>
                        <GestureRecognizer style={styles.contextOnImage}

                            onSwipeLeft={() => setSlideNext((e) => e + 1)}
                            onSwipeRight={() => setSlidePrev((e) => e + 1)}
                        >
                            <Text style={styles.afficheTitle}>{title} </Text>

                        </GestureRecognizer>

                    </View>


                </View>
            ) : (
                <CarouselTemplate data={dataMovie.videos.data} renderItem={({ item, index }: any) => renderVideo(item, index)} />

            )
        })
    }

    const BetweenContent = () => {
        setBetweenContent(<ShowRating rating={dataMovie.voteAverage} />)
    }

    const MainContent = () => {
        setMainContentView(
            <View >


                <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }} >

                    <View style={{ padding: 10, width: '80%' }}>
                        <LinearSelect genres={dataMovie.category.data} selected={() => []} disabled />
                    </View>
                    <View style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton onPress={() => dataMovie.isLike ? unLikeMovie() : likeMovie()} icon={'favorite'} iconColor={dataMovie.isLike ? red : darkGray} style={[GlovalStyle.round, { backgroundColor: white }]} />
                    </View>
                    <View style={{ alignItems: 'center', width: '100%' }}>
                        <Text style={[GlovalStyle.rounded, { backgroundColor: darkGray, width: '95%', color: white, padding: 10, textAlign: 'justify' }, GlovalStyle.fontSizeNormal]}>
                            {dataMovie.description}
                        </Text>
                    </View>
                    {dataMovie.provider.data.length > 0 ? (
                        <View>
                            <Text style={[styles.afficheTitle, styles.paddingTitle]}>Fournisseurs</Text>
                            <View style={styles.paddingTitle}>
                                <FlatList
                                    data={dataMovie.provider.data}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => <ShowProvider path={item.logo_path} />}
                                    keyExtractor={(item, index) => index as any}

                                />
                            </View></View>) : undefined
                    }
                    <View style={styles.paddingTitle}>
                        <Text style={[styles.afficheTitle, styles.paddingTitle]}>Personne</Text>
                        <LinearSelect genres={creaditFilter.options} selected={filterCredit} />
                        <FlatList
                            data={creaditFilter.dataFilter}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => <ShowComponent loading={dataMovie.credits.loading} show={{ picture: item.profile_path, id: item.id, type: 'person', acteurName: item.name }} navigation={navigation} />}
                            keyExtractor={(item, index) => index as any}
                        />
                    </View>

                    {content.map((list) => {
                        return dataMovie[list.dataName].data.length > 0 ? (<View>
                            <Text style={[styles.afficheTitle, styles.paddingTitle]}>{list.title}</Text>
                            <FlatList

                                horizontal={true}
                                data={dataMovie[list.dataName].data}
                                renderItem={({ item }) => <ShowComponent loading={dataMovie[list.dataName].loading} show={{ picture: item.poster_path, id: item.id, type: 'movie' }} navigation={navigation.navigation} />}
                                keyExtractor={(item, index) => index as any}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        ) : undefined
                    })}

                </View>
            </View>

        )

    }


    //utils functions 
    const renderVideo = (item: any, index: number) => {

        return (
            <View>
                <YoutubeIframe height={BAReady ? 500 : 0} play={false} videoId={item.key} onReady={() => { setBAReady(true) }} />
                {!BAReady ?
                    <SkeletonLoader radius={10} from={-0.2} to={3.5} duration={1800} /> : undefined}
            </View>
        )
    }

    const filterCredit = (selectFilter: string[]) => {
        setCreditFilter((data: any) => ({ ...data, dataFilter: selectFilter.length > 0 ? dataMovie.credits.data.filter(e => selectFilter.includes(e.known_for_department)) : dataMovie.credits.data }))

    }



    return (
        <View>
            <HeaderMenu menu={{ menu: menu, setMenu: setMenu }}
                options={menuOptions}
                leftButton={{ icon: 'arrow-back', action: navigation.navigation.goBack }}
            ></HeaderMenu>
            <ScreenSplit TopContent={affiche} MainContent={mainContentView} BetweenContent={betweenContent}></ScreenSplit>
        </View>
    )


}




const styles = StyleSheet.create({
    absolutePosition: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
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
    contextOnImage: { display: 'flex', flexDirection: 'row', alignItems: 'flex-end', height: '80%', width: '100%', justifyContent: 'center' },
})
export default DetailMovie