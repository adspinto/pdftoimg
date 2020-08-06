import {StyleSheet, Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {IStyles} from './interface';

const styles = StyleSheet.create<IStyles>({
  adContainer: {
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  root: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  adBar: {margin: 10},
  converting: {color: '#fff'},
  iconContainer: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.5 - 170,
    opacity: 0.6,
  },
  buttonContainer: {marginVertical: 5, width: '90%'},
  bottomAdContainer: {height: 50, justifyContent: 'center'},
});

export default styles;
