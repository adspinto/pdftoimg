import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'



const ImageItem = (props) => {


    return (
        <View style={{ flex: 1,height: 250, justifyContent: 'center', alignItems: 'center', padding: 10, margin: 10 }}>
            <Image style={{ width: "100%", height:"100%" }} onError={props.onError} source={props.source} />
            <Text>{props.name}</Text>
        </View>
    )
}

export default ImageItem