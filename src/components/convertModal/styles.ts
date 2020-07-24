import {StyleSheet, Dimensions} from 'react-native';

import {IStyles} from './interface';

const styles = StyleSheet.create<IStyles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  subContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {alignItems: 'center'},
  buttonTextTitle: {marginVertical: 10},
  button: {width: Dimensions.get('window').width * 0.5},
});

export default styles;
