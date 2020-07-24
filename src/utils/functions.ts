import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const guidelineBaseWidth = 360;

// const guidelineBaseHeight = 680;

export const scale = (size: number) => {
  if (width < height) {
    return (width / guidelineBaseWidth) * size;
  }
  return size;
};

export const scaleImage = (size: number, type: string) => {
  //used when image got from XD have max resolution
  if (type === 'height') {
    return (size * height) / 2340;
  }
  return (size * width) / 1080;
};
