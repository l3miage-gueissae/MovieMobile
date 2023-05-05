import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { IconButton, SegmentedButtons } from 'react-native-paper'
import { darkpage } from '../css/ThemeColor'









type props = { menu: { menu: any, setMenu: any }, options:{value:string,label:string}[]}
const HeaderMenu = (props: props) => {


    return (
        <View style={styles.MenuContainer}>
            <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>
                    <IconButton
                        icon='search'
                        iconColor={'white'}
                        containerColor={darkpage}
                        style={[styles.radius, styles.border]}
                    />

                </View>
                <View style={[styles.partMenuContainer, { width: '60%', }]}>
                    <SegmentedButtons
                        value={props.menu.menu}
                        onValueChange={props.menu.setMenu}
                        buttons={
                            props.options.map(e => { 
                                return  { value: e.value, label: e.label, checkedColor: 'white', uncheckedColor: 'white',
                                style: [{ backgroundColor: props.menu.menu === e.value ? '#7f5af0' : '#16161a',borderWidth:0},styles.radius]
                            }})
                        } 
                        style={[{ width: '65%' },styles.border, styles.radius]}
                    ></SegmentedButtons>


                </View>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>
                    <IconButton
                        icon='account-circle'
                        iconColor={'white'}
                        containerColor={darkpage}
                        style={[styles.radius, styles.border]}

                    />
                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    MenuContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 75,
        zIndex: 3
    },
    partMenuContainer: {
        height: '100%', justifyContent: 'center', alignItems: 'center'
    },
    border: {
      borderWidth:1,
      borderColor:'#fff'
    },
    radius:{
        borderRadius:10

    }

})
export default HeaderMenu