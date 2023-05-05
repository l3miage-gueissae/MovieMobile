import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { Button } from 'react-native-paper'
import { darkGray } from '../../css/ThemeColor'

type buttonData = { id: number, name: string }


type props = {genres:buttonData[],selected: (selection:number[]) => void }

const LinearSelect = (props:props) => {
    const [selected, setSelected] : [number[],any] = useState([])

    useEffect(() => {
        props.selected(selected)
    },[selected.length])

    useEffect(() => {
        // props.selected([selected])
        setSelected([])
    },[props.genres])

    const renderButton = (item: buttonData) => {

        const isSelect = selected.includes(item.id)
        return (
            <Button mode="contained-tonal" onPress={() => isSelect ? setSelected(selected.filter((i) => i !== item.id )) : setSelected([...selected, item.id])} style={styles.button} buttonColor={isSelect ? '#fff' : darkGray} textColor={!isSelect ? '#fff' : darkGray}>
                {item.name}
            </Button>
        )
    }

    return (
            <FlatList
                horizontal={true}
                data={props.genres}
                renderItem={({ item }) => renderButton(item)}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
            />
    )
}




const styles = StyleSheet.create({
    button: {
        borderRadius:5,
        marginRight:5
    }
})


export default LinearSelect