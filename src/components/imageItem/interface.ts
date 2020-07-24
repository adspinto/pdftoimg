import {StackNavigationProp} from '@react-navigation/stack';
import {
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

export interface HomeScreenProps {
  navigation: StackNavigationProp<any, 'Home'>;
}

export interface IStyles {
  container: ViewStyle;
  containerActive: ViewStyle;
  iconContainer: ViewStyle;
  touchableMargin: ViewStyle;
  image: ImageStyle;
  textContainer: ViewStyle;
  textSubContainer: ViewStyle;
  imageMargin: ViewStyle;
}

export interface ImageItemProps {
  height: number;
  width: number;
  index: number | undefined;
  onError: (error: any) => void;
  onPressRemove: (index: number) => void;
  onPressDown: (index: number) => void;
  onPressUp: (index: number) => void;
  drag: () => void;
  isActive: boolean;
  source: ImageSourcePropType;
  name: string;
}
