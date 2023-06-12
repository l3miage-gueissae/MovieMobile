import React, { useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { darkpage } from '../css/ThemeColor'
import { googleLogin } from '../services/Auth/google';
import { User } from '../services/User/user.service';







const Start = ({navigation,route}) => {
    const connect = async  () => {
        await  googleLogin()
    }
    connect()
    setTimeout(() => {
        
        if(User !== undefined)
            navigation.replace('Home')
        else{
            navigation.replace('Connexion')
        }
    }, 2920);
    return (
        <View style={{backgroundColor:darkpage, height:'100%', flexDirection:'row', alignItems:'center'}}  >
            <Image
                source={require('../assets/gifs/logoAnimated.gif')}
                style={{ width: '100%', height:'40%'  }}
            />
        </View>
    )
}




const styles = StyleSheet.create({

})

export default Start