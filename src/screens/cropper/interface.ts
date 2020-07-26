import {StackNavigationProp} from '@react-navigation/stack';
import {ViewStyle, TextStyle, ImageStyle, Animated} from 'react-native';
// import Animated from 'react-native-reanimated';

export interface CropperProps {
  navigation: StackNavigationProp<any, 'Cropper'>;
}

export interface IStyles {
  root: ViewStyle;
  scanner: ViewStyle;
  scannerContainer: ViewStyle;
  controlsContainer: ViewStyle;
  cameraButton: ViewStyle;
  cameraSubButton: ViewStyle;
  overlay: ViewStyle;
}
export interface CropperViewProps {}
