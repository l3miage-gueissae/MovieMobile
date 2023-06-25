import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Animated } from 'react-native'
import { Avatar, Drawer, IconButton, SegmentedButtons } from 'react-native-paper'
import { darkGray, darkpage, GlovalStyle, primary, white } from '../css/ThemeColor'
import { User, UserService } from '../services/User/user.service'







type props = { menu: { menu: any, setMenu: any }, options: { value: string, label: string }[], leftButton?: { icon: string, action: any }, navigation: any }
const HeaderMenu = (props: props) => {
    
    //middle button of header
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
                    style={[{ width: '65%' }, styles.border, GlovalStyle.round]}
                ></SegmentedButtons>)
        }
    }

    //drawer aniamtion
    const [drawer, setDrawer] = useState<any>(undefined)

    const translateX = useRef(new Animated.Value(20)).current;
    const open = Animated.timing(translateX, {
        toValue: 0,
        duration: 350,
        useNativeDriver: false,
    })
    const close = Animated.timing(translateX, {
        toValue: 60,
        duration: 350,
        useNativeDriver: false,
    })

    const OpenDrawer = () => {
        if (drawer !== undefined) {
            close.start()
            setDrawer(undefined)
        } else {
            setDrawer(true); open.start()
        }
    }

    const logout = () => {
        UserService.disconnectUser().then(() => {
            props.navigation.replace('Connexion')
        }).catch(() => {
            console.error('Can\'t logout');

        })
    }

    return [
        <View style={styles.MenuContainer} key={'headerMenu-absolute-top-00001'}>
            <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>
                    <IconButton
                        icon={props.leftButton ? props.leftButton.icon : 'search'}
                        iconColor={'white'}
                        containerColor={darkpage}
                        style={[GlovalStyle.round, styles.border]}
                        onPress={props.leftButton ? props.leftButton.action : undefined}
                        size={25}
                    />

                </View>
                <View style={[styles.partMenuContainer, { width: '60%' }]}>
                    {renderMiddleButton()}

                </View>
                <View style={[styles.partMenuContainer, { width: '20%' }]}>

                    {User ? <TouchableOpacity onPress={() => { OpenDrawer() }}><Avatar.Image size={40} source={{ uri: User?.photoURL }} /></TouchableOpacity>
                        : <IconButton
                            icon='account-circle'
                            iconColor={'white'}
                            containerColor={darkpage}
                            style={[GlovalStyle.round, styles.border]}

                        />}

                </View>
            </View>
        </View>,
        // <Drawer.Section title="Some title" style={styles.drawer}  showDivider={false}>
        <View style={[styles.drawer, { width: drawer ? '100%' : '0%' }]}  key={'headerMenu-drawer-absolute-00001'}>
            <Animated.View style={[{ width: '100%', height: '100%' }, { marginLeft: '-20%', transform: [{ translateX: translateX }] }]}>
                <TouchableOpacity style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.5 }}
                    onPress={() => { OpenDrawer(); }}
                />
            </Animated.View>
            <Animated.View style={[styles.drawerMenu, { transform: [{ translateX: translateX }] }]}>
                <TouchableOpacity onPress={() => { OpenDrawer(); }}>{User ? <Avatar.Image size={40} source={{ uri: User?.photoURL }} /> : undefined }</TouchableOpacity>
                <IconButton
                    icon="logout"
                    iconColor={'white'}
                    containerColor={darkpage}
                    style={[GlovalStyle.round, styles.border, { marginTop: '25%' }]}
                    onPress={() => logout()}
                />
            </Animated.View>

        </View>
    ]
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
    },
    drawer: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 3,
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',

    },
    drawerMenu: {
        position: 'relative',
        width: '20%',
        height: '100%',
        paddingTop: 15,
        backgroundColor: darkpage,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }


})
export default HeaderMenu