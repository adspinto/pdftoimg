import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {ImageItemProps} from './interface';

const ImageItem = (props: ImageItemProps) => {
  const {width, height} = Dimensions.get('screen');
  const {
    height: itemHeight,
    width: itemWidth,
    onError,
    onPressDown,
    onPressRemove,
    onPressUp,
    name,
    index,
    source,
    drag,
    isActive,
  } = props;
  const [sizes, setSizes] = useState({
    width: 0,
    height: 0,
  });

  const calculateStyleOverride = useCallback(() => {
    let computedWidth =
      itemWidth > width
        ? (width / itemWidth) * itemWidth * 0.8
        : itemWidth * 0.8;
    let computedHeight =
      itemHeight > height
        ? ((itemHeight * computedWidth) / itemWidth) * 0.8
        : itemHeight * 0.8;

    setSizes({height: computedHeight, width: computedWidth});
  }, [itemWidth, width, itemHeight, height]);

  useEffect(() => {
    calculateStyleOverride();
  }, [itemWidth, itemHeight, calculateStyleOverride]);

  return (
    <TouchableWithoutFeedback onLongPress={drag}>
      <View style={[styles.container, isActive ? styles.containerActive : {}]}>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => onPressRemove(index)}
            style={styles.touchableMargin}>
            <Icon color={'#ABABAB'} name="times-circle" size={23} />
          </TouchableOpacity>
        </View>

        <View style={[styles.imageMargin, sizes]}>
          <Image
            resizeMode={'contain'}
            style={styles.image}
            onError={onError}
            source={source}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={styles.textSubContainer}>
            <TouchableOpacity
              onPress={() => onPressDown(index)}
              style={styles.touchableMargin}>
              <Icon color={'#ABABAB'} name="chevron-circle-up" size={23} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressUp(index)}
              style={styles.touchableMargin}>
              <Icon color={'#ABABAB'} name="chevron-circle-down" size={23} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{name}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageItem;
