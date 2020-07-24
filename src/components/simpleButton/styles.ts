import {StyleSheet} from 'react-native';
// const {width, height} = Dimensions.get('screen');
import {colors, scale, scaleImage} from '../../utils';
import {IStyles} from './interface';

const styles = StyleSheet.create<IStyles>({
  buttonContainer: {
    backgroundColor: colors.primary.orange,
    marginTop: scale(40),
    borderRadius: 10,
    width: scaleImage(728, 'width'),
    height: scaleImage(125, 'height'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
