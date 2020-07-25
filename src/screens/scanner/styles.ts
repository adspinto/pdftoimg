import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {IStyles} from './interface';
import {colors, scale} from '../../utils';

const styles = StyleSheet.create<IStyles>({
  root: {flex: 1, alignItems: 'center'},
  scannerContainer: {flex: 1, width},
  scanner: {flex: 1},
  controlsContainer: {
    // justifyContent: 'space-between',
    // bottom: 25,
    // flexDirection: 'column',
    // top: 25,
    // right: 25,
    // backgroundColor: 'white',
    alignItems: 'center',
    position: 'absolute',
    width,
    bottom: 80,
  },
  cameraButton: {
    backgroundColor: colors.primary.lightgray,
    height: scale(75),
    width: scale(75),
    borderRadius: scale(75) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSubButton: {
    backgroundColor: colors.primary.white,
    height: scale(65),
    width: scale(65),
    borderRadius: scale(65) / 2,
  },
  overlay: {
    bottom: 0,
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    // width,
    // height,
  },
});

export default styles;
