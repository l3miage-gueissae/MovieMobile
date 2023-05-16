import React, { useState } from 'react'
import {  StyleSheet, View} from 'react-native'
import { Image } from 'react-native'
import { GlovalStyle } from '../../css/ThemeColor'
import { APIbackroundImage } from '../../services/GlobalVariable'







type props = { path:string }

const ShowProvider = (props:props) => {
    return (
        <Image source={{uri:`${APIbackroundImage}/w500${props.path}`}} style={[{width:75, height:75, marginRight:7},GlovalStyle.rounded]} />
    )
}




const styles = StyleSheet.create({

})

export default ShowProvider