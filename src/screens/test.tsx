
import React from "react";
import { Animated, Image, ScrollView, Text, View } from "react-native";

export default class test extends React.Component {
    state = { text: "", scrollOffset: new Animated.Value(0) };

    render() {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: "white" }}
                // Mis à jour de scrollOffset sur l'évènement onScroll
                onScroll={e => this.setState({ scrollOffset: e.nativeEvent.contentOffset.y })}
                // scrollEventThrottle={1} est nécessaire afin d'être notifié
                // de tous les évènements de défilement
                scrollEventThrottle={1}
            >
                {this.renderHeader()}
                {this.renderContent()}
            </ScrollView>
        );
    }

    renderHeader() {
        const headerHeight = 240;

        return (
            <Animated.View

                style={{
                    height: headerHeight,
                    transform: [{ translateY: this.state.scrollOffset }],
                    zIndex: 1,
                }}
            >
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: 'https://cdn.pixabay.com/photo/2023/03/19/16/15/butterfly-7862893_1280.jpg' }}
                />



            </Animated.View>
        );
    }

    renderContent() {
        return (
            <View style={{ padding: 20, backgroundColor: 'red', height: 10000, zIndex:2}}>
                <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 16 }}>
                    BORDEAUXazeaze
                </Text>
                <Text>{this.state.text}</Text>
            </View>
        );
    }


}
