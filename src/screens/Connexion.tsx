import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { googleLogin } from '../services/Auth/google';
import { darkpage, white } from '../css/ThemeColor';
import { Button, Card, Text } from 'react-native-paper';








const Connexion = ({ navigation, route }) => {
    // const { user } = route.params;
    const connect =  () => {
        googleLogin().then(() => {
            
            navigation.replace('Home')
        }).catch((error:any) => {
            console.log(error);
            
        })
        
    }
    return (
        <View style={{ backgroundColor: darkpage, height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
            <Card style={{ backgroundColor: white, height: '30%', width: '80%', }}>
                <Card.Content style={{ justifyContent: 'center', }}>
                    <Text variant="titleLarge" style={{ textAlign: 'center', textAlignVertical: 'center',  height: '40%' }}>Connexion</Text>
                    <View style={{  height: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <Button mode="contained-tonal"
                            onPress={() => connect()}
                        >
                            Google connexion
                        </Button>
                    </View>
                </Card.Content>


            </Card>
        </View>
    )
}




const styles = StyleSheet.create({

})

export default Connexion
