import React, { useRef, useEffect } from 'react'
import { View, Image, Text, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Modal, Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

import Ad from './ad'

const ConvertModal = ({ convertStatus, convertMessage, onRequestClose }) => {
    useEffect(() => {

    }, [])

    return (
        <Modal
            visible={convertStatus === "rejected" || convertStatus === "resolved"}
            onRequestClose={onRequestClose}
            transparent={true}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
                <View style={{
                    width: Dimensions.get("window").width * 0.8,
                    height: Dimensions.get("window").height * 0.8,
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#fff",

                }}>

                    <View>
                        <Icon color={ convertStatus === "rejected" ? "#FF7069": "#4DE89D"} name={convertStatus === "rejected" ? "times-circle" : "check-circle"} size={148} />

                    </View>
                    <View >
                        <Ad screen={convertStatus === "rejected" ? "failModal" : "successModal"} size={"MEDIUM_RECTANGLE"} type={"banner"} />
                    </View>

                    <View style={{ alignItems: "center" }} >
                        <Text style={{ marginVertical: 10 }}>
                            {convertMessage}
                        </Text>
                        <View style={{ width: Dimensions.get("window").width * 0.5 }} >

                            <Button color={"#B0B0B0"} title={"Ok"} onPress={onRequestClose} />
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default ConvertModal;