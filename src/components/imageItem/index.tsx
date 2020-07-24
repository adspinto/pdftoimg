import React, {useRef, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ImageItem = (props) => {
  const itemHeight = props.height;
  const itemWidth = props.width;
  const {width, height} = Dimensions.get('screen');

  let computedWidth =
    itemWidth > width ? (width / itemWidth) * itemWidth * 0.8 : itemWidth * 0.8;
  let computedHeight =
    itemHeight > height
      ? ((itemHeight * computedWidth) / itemWidth) * 0.8
      : itemHeight * 0.8;

  return (
    <TouchableWithoutFeedback onLongPress={props.drag}>
      <View
        style={{
          backgroundColor: props.isActive ? '#D6EAF8' : '#fff',
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          flex: 1,
          padding: 10,
          margin: 10,
        }}>
        <View style={{alignSelf: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => props.onPressRemove(props.index)}
            style={{margin: 5}}>
            <Icon color={'#ABABAB'} name="times-circle" size={23} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            height: computedHeight,
            width: computedWidth,
            marginVertical: 10,
          }}>
          <Image
            resizeMode={'contain'}
            style={{width: '100%', height: '100%'}}
            onError={props.onError}
            source={props.source}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity
              onPress={() => props.onPressDown(props.index)}
              style={{margin: 5}}>
              <Icon color={'#ABABAB'} name="chevron-circle-up" size={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => props.onPressUp(props.index)}
              style={{margin: 5}}>
              <Icon color={'#ABABAB'} name="chevron-circle-down" size={23} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{props.name}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageItem;
