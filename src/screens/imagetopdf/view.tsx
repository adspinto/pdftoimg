import React from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  Platform,
  UIManager,
} from 'react-native';

import ImageItem from '../../components/imageItem';

import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableFlatList from 'react-native-draggable-flatlist';
import ConvertModal from '../../components/convertModal';
import {Bar} from 'react-native-progress';
import Ad from '../../components/ad';
import {ImageToPdfViewProps} from './interface';
import styles from './styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ImageToPdfView = (props: ImageToPdfViewProps) => {
  const {
    status,
    converter,
    convertMessage,
    progress,
    imageList,
    onPressUp,
    onPressDown,
    onPressRemove,
    onError,
    setImageList,
    escolher,
    onRequestClose,
  } = props;

  return (
    <View style={styles.root}>
      {status === 'pending' && (
        <View style={[styles.adContainer]}>
          <Ad screen={'loading'} size={'MEDIUM_RECTANGLE'} />
          <Bar
            color={'#fff'}
            progress={progress}
            useNativeDriver={true}
            style={styles.adBar}
            width={Dimensions.get('screen').width * 0.8}
            height={10}
          />
          <Text style={styles.converting}>Converting...</Text>
        </View>
      )}
      <View style={styles.iconContainer}>
        <Icon color={'#ABABAB'} name="image" size={170} />
        {/* <Image style={{ width: '100%'}} resizeMode={'contain'} source={require('../assets/teste_paolla.png')}></Image> */}
      </View>

      <DraggableFlatList
        onDragEnd={({data}: {data: any}) => setImageList(data)}
        data={imageList}
        keyExtractor={(item: any, index: number) => `${item.name}-${index}`}
        renderItem={({item, index, isActive, drag}) => (
          <ImageItem
            isActive={isActive}
            drag={drag}
            onPressUp={onPressUp}
            onPressDown={onPressDown}
            onPressRemove={onPressRemove}
            index={index}
            onError={onError}
            width={item.width}
            height={item.height}
            name={item.filename}
            source={{uri: item.path}}
          />
        )}
      />

      <View
        style={[
          styles.buttonContainer,
          {
            opacity: status === 'pending' ? 0.6 : 1,
          },
        ]}>
        <Button
          color={'#B0B0B0'}
          onPress={escolher}
          title={'Escolha as imagens'}
        />
      </View>

      <View
        style={[
          styles.buttonContainer,
          {
            opacity: status === 'pending' ? 0.4 : 1,
          },
        ]}>
        <Button
          color={'#B0B0B0'}
          onPress={converter}
          title={'Converter imediatamente'}
        />
      </View>

      <ConvertModal
        adScreen={
          status === 'rejected'
            ? 'imgtopdfscreenfailModal'
            : 'imgtopdfscreensuccessModal'
        }
        onRequestClose={onRequestClose}
        convertStatus={status}
        convertMessage={convertMessage}
      />
      <View style={styles.bottomAdContainer}>
        <Ad screen={'imgtopdfscreen'} size={'BANNER'} type={'banner'} />
      </View>
    </View>
  );
};

export default ImageToPdfView;
