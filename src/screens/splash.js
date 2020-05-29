import React, { useState, useEffect } from 'react'
import { View, Text, Animated, Dimensions,StyleSheet } from 'react-native'
import { Bar } from 'react-native-progress';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingVertical: 20,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    circles: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    progress: {
      margin: 10,
    },
  });

const Splash = (props) => {
    // const [animation, setAnimation] = useState({0});
    const width = new Animated.Value(0);
    useEffect(() => {
       
      
        setTimeout(() => {
            props.navigation.replace("Home")
        }, 2500);
    }, [])
    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, padding: 20 }}>

            <Bar color={'#24AFFF'} progress={0}  useNativeDriver={true} style={styles.progress} indeterminate={true} width={Dimensions.get("window").width * 0.8} height={10}/>
            <Text>
                Imagem para PDF
           </Text>
        </View>
    )
}

export default Splash