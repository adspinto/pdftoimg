import {StyleSheet} from 'react-native';

import {IStyles} from './interface';

const styles = StyleSheet.create<IStyles>({
  container: {
    backgroundColor: '#fff',
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
  },
  containerActive: {
    backgroundColor: '#D6EAF8',
  },
  iconContainer: {alignSelf: 'flex-end'},
  touchableMargin: {margin: 5},
  image: {width: '100%', height: '100%'},
  textContainer: {justifyContent: 'center', alignItems: 'center'},
  textSubContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  imageMargin: {marginVertical: 10},
});

export default styles;
