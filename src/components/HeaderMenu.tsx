import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { IconButton, SegmentedButtons } from 'react-native-paper'
import { darkpage, GlovalStyle, primary } from '../css/ThemeColor'









type props = { menu: { menu: any, setMenu: any }, options: { value: string, label: string }[], leftButton?: { icon: string, action: any } }
const HeaderMenu = (props: props) => {
    const renderMiddleButton = () => {
        if (props.options.length > 1) {
            return (
                <SegmentedButtons
                    value={props.menu.menu}
                    onValueChange={props.menu.setMenu}
                    buttons={
                        props.options.map(e => {
                            return {
                                value: e.value, label: e.label, checkedColor: 'white', uncheckedColor: 'white', 
                                style: [{ backgroundColor: props.menu.menu === e.value ? primary : darkpage, borderWidth: 0 }, GlovalStyle.round]
                            }
                        })
                    }
                    style={[{ width: '65%'}, styles.border, GlovalStyle.round]}
                ></SegmentedButtons>)
        }
    }

    return (
        <View style={styles.MenuContainer}>
            <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>
                    <IconButton
                        icon={props.leftButton ? props.leftButton.icon : 'search'}
                        iconColor={'white'}
                        containerColor={darkpage}
                        style={[GlovalStyle.round, styles.border]}
                        onPress={props.leftButton ? props.leftButton.action : undefined}
                    />

                </View>
                <View style={[styles.partMenuContainer, { width: '60%'}]}>
                    {renderMiddleButton()}

                </View>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>
                    <IconButton
                        icon='account-circle'
                        iconColor={'white'}
                        containerColor={darkpage}
                        style={[GlovalStyle.round, styles.border]}

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
        zIndex: 3,
    },
    partMenuContainer: {
        height: '100%', justifyContent: 'center', alignItems: 'center',      

    },
    border: {
        borderWidth: 1,
        borderColor: '#fff'
    }


})
export default HeaderMenu