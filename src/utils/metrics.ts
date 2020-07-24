import {Dimensions, Platform} from 'react-native';
const {width, height} = Dimensions.get('screen');
// import {} from '../utils';
//TODO: REVER ESSA LOGICA DE ISLG;
const isLG = () => false;
const ios = Platform.OS === 'ios';

const screen = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  defaultWidthFull: '100%',
  defaultWidthPag: '93%',
  defaultWidthModal: '80%',
  defaultPaddingHorizontal: 12,
  defaultPaddingVertical: 25,
  modalWidth: '70%',
  defaultHitSlop: {right: 20, left: 20, top: 20, bottom: 20},
};

const typo = {
  defaultLineHeightTxt: 16,
  defaultTextAlignTitle: 'center',
  defaultFontWeightTitle: 'bold',
};

const buttons = {
  widthButton: 300,
  heightButton: 41,
  fontButton: 16,
};

const titles = {
  defaulth0: screen.screenWidth >= 600 ? 30 : ios ? 29.5 : 28,
  defaulth1: screen.screenWidth >= 600 ? 24 : ios ? 23.5 : 22,
  defaulth2: screen.screenWidth >= 600 ? 22 : ios ? 21.5 : 20,
  defaulth3: screen.screenWidth >= 600 ? 20 : ios ? 19.5 : 18,
  defaulth4: screen.screenWidth >= 600 ? 16 : ios ? 15.5 : 14,
};

const icons = {
  iconXs: screen.screenWidth >= 600 ? 14 : ios ? 13.5 : 12,
  iconXm: screen.screenWidth >= 600 ? 16 : ios ? 15.5 : 14,
  iconSm: screen.screenWidth >= 600 ? 18 : ios ? 17.5 : 16,
  iconMd: screen.screenWidth >= 600 ? 20 : ios ? 19.5 : 18,
  iconLd: screen.screenWidth >= 600 ? 22 : ios ? 21.5 : 20,
  iconLg: screen.screenWidth >= 600 ? 26 : ios ? 25.5 : 24,
  iconXl: screen.screenWidth >= 600 ? 28 : ios ? 27.5 : 26,
  iconModal: screen.screenWidth >= 600 ? 66 : ios ? 65 : 64,
};

const fontSizes = {
  defaultFontSizeMin:
    screen.screenWidth >= 600 ? (isLG() ? 12 : 14) : ios ? 13.5 : 12,
  defaultFontSizeMin2:
    screen.screenWidth >= 600 ? (isLG() ? 10 : 13) : ios ? 11.5 : 10,
  defaultFontSize0:
    screen.screenWidth >= 600 ? (isLG() ? 13 : 15) : ios ? 14.5 : 13,
  defaultFontSize:
    screen.screenWidth >= 600 ? (isLG() ? 14 : 16) : ios ? 15.5 : 14,
  defaultFontSize2:
    screen.screenWidth >= 600 ? (isLG() ? 15 : 17) : ios ? 16.5 : 15,
  defaultButtonSize:
    screen.screenWidth >= 600 ? (isLG() ? 18 : 16) : ios ? 17.5 : 16,
  defaultTitle:
    screen.screenWidth >= 600 ? (isLG() ? 18 : 16) : ios ? 17.5 : 16,
  defaultTitle2:
    screen.screenWidth >= 600 ? (isLG() ? 19 : 17) : ios ? 18.5 : 17,
  defaultTopTitle:
    screen.screenWidth >= 600 ? (isLG() ? 20 : 18) : ios ? 19.5 : 18,
  defaultTitleCustomModal:
    screen.screenWidth >= 600 ? (isLG() ? 27 : 25) : ios ? 26.5 : 25,
  defaultMarginBottomTitle:
    screen.screenWidth >= 600 ? (isLG() ? 22 : 20) : ios ? 21.5 : 20,
  xm: screen.screenWidth >= 600 ? (isLG() ? 10 : 12) : ios ? 11.5 : 10,
  sm: screen.screenWidth >= 600 ? (isLG() ? 12 : 14) : ios ? 13.5 : 12,
  sml: screen.screenWidth >= 600 ? (isLG() ? 15 : 14) : ios ? 15.5 : 14,
  md: screen.screenWidth >= 600 ? (isLG() ? 18 : 16) : ios ? 17.5 : 16,
  mdl: screen.screenWidth >= 600 ? (isLG() ? 20 : 18) : ios ? 19.5 : 18,
  ld: screen.screenWidth >= 600 ? (isLG() ? 24 : 22) : ios ? 23.5 : 22,
  lg: screen.screenWidth >= 600 ? (isLG() ? 28 : 26) : ios ? 27.5 : 26,
  xl: screen.screenWidth >= 600 ? (isLG() ? 34 : 32) : ios ? 31.5 : 32,
};

const fontFamilies = {
  defaultFamily: 'Open Sans',
};

export {titles, buttons, typo, screen, fontSizes, fontFamilies, icons};
