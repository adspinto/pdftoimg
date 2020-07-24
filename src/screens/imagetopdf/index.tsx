import React, {useState} from 'react';
import {
  PermissionsAndroid,
  Dimensions,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

import RNFetchBlob from 'rn-fetch-blob';
import {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import ImageSize from 'react-native-image-size';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {ImageToPdfProps} from './interface';

import VectorIconsHeaderButton from '../../components/icons/vectorIconsHeaderButton';
import ImageToPdfview from './view';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ImageToPdf = (props: ImageToPdfProps) => {
  const [imageList, setImageList] = useState([]);
  // const [convertEnd, setConvertEnd] = useState(false);
  const [convertPath, setConvertPath] = useState('');

  const [convertStatus, setConvertStatus] = useState({
    status: 'iddle',
    convertMessage: '',
  });

  const [progress, setProgress] = useState(0);

  const pickFiles = async () => {
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      });
      // console.log(res);
      res.map((item, index) => {
        RNFetchBlob.fs
          .stat(item.uri)
          .then((response: any) => {
            console.log('RNFetchBlob.fs.stat', res);
            let file = 'file://';
            response.realPath = response.path;
            response.path = file + response.path;

            ImageSize.getSize(response.path).then((size) => {
              // size.height
              // size.width
              console.log(size);
              response.width = size.width;
              response.height = size.height;
              response.index = index;
              console.log(response);
              setImageList((prevImageList) => [...prevImageList, response]);
            });
          })
          .catch(console.log);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('Document picker cancelled by the user');
      } else {
        throw err;
      }
    }
  };

  const escolher = () => {
    try {
      console.log('start choosing');
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then((permission) => {
        if (permission) {
          pickFiles();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          )
            .then((perm) => {
              if (perm === 'granted') {
                pickFiles();
              }
            })
            .catch((err) => {
              console.log(err, 'user didnt accept');
            });
        }
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log(err);
        // throw err;
      }
    }
  };
  const converter = async () => {
    try {
      if (imageList.length <= 0) {
        throw {err: 'Você precisa de imagens para converter'};
      }
      let pathToWrite = `${
        RNFetchBlob.fs.dirs.DownloadDir
      }/converted/converted-${Date.now()}.pdf`;

      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      setConvertStatus({status: 'pending', convertMessage: 'carregando...'});

      setConvertPath(pathToWrite);

      const {width} = Dimensions.get('screen');

      let document = PDFDocument.create(pathToWrite);
      setProgress(0.1);

      [...imageList].map((item: any) => {
        let computedWidth = (width / item.width) * item.width;
        let computedHeight = (item.height * computedWidth) / item.width;
        console.log(computedHeight, computedWidth);
        let settings: any = {
          width: computedWidth,
          height: computedHeight,
        };

        let page: any = PDFPage.create()
          .setMediaBox(computedWidth, computedHeight)
          .drawImage(`${item.realPath}`, 'png', settings); //if png is removed it wont convert

        document.addPages(page);
      });

      setProgress(0.3);

      RNFetchBlob.fs.exists(pathToWrite).then((exist) => {
        setProgress(0.2);
        if (exist) {
          console.log(exist, 'exist');
          setProgress(0.4);
          document
            .write()
            .then((path) => {
              console.log('PDF created at: ' + path);
              setProgress(1);
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setConvertStatus({
                status: 'resolved',
                convertMessage: 'Images converted successfully!',
              });
            })
            .catch(() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
              setConvertStatus({
                status: 'rejected',
                convertMessage: 'Failed to convert images!',
              });
            });
        } else {
          RNFetchBlob.fs.writeFile(pathToWrite, '1').then(() => {
            setProgress(0.8);
            document
              .write()
              .then(() => {
                setProgress(1);
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setConvertStatus({
                  status: 'resolved',
                  convertMessage: 'Images converted successfully!',
                });
              })
              .catch(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                setConvertStatus({
                  status: 'rejected',
                  convertMessage: 'Failed to convert images!',
                });
              });
          });
        }
      });
    } catch (err) {
      console.log(err);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setConvertStatus({
        status: 'rejected',
        convertMessage: 'Failed to convert images!',
      });
    }
  };
  const onError = (error: any) => {
    console.log(error);
  };

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      // in your app, extract the arrow function into a separate component
      // to avoid creating a new one every time
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={VectorIconsHeaderButton}>
          <Item
            title="Clear"
            onPress={() => {
              setImageList([]);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);

  const onPressRemove = (index: number) => {
    setImageList(imageList.filter((item, i) => i !== index));
  };

  const onPressUp = (index: number) => {
    if (index < imageList.length - 1) {
      let nextArray: any = arrayMove([...imageList], index, index + 1);
      setImageList(nextArray);
    }
  };

  const onPressDown = (index: number) => {
    if (index > 0) {
      let nextArray: any = arrayMove([...imageList], index, index - 1);
      setImageList(nextArray);
    }
  };

  const arrayMove = (array: any[], oldIndex: number, newIndex: number) => {
    let nextArr = [...array];
    if (oldIndex >= nextArr.length) {
      var k = newIndex - nextArr.length + 1;
      while (k--) {
        nextArr.push(undefined);
      }
    }
    nextArr.splice(newIndex, 0, nextArr.splice(oldIndex, 1)[0]);
    return nextArr;
  };

  const onRequestClose = () => {
    setProgress(0);
    setConvertStatus({status: 'iddle', convertMessage: ''});

    if (convertStatus.status === 'resolved') {
      const android = RNFetchBlob.android;
      android.actionViewIntent(convertPath, 'application/pdf');
    }
  };

  return (
    <ImageToPdfview
      status={convertStatus.status}
      converter={converter}
      convertMessage={convertStatus.convertMessage}
      progress={progress}
      imageList={imageList}
      onPressUp={onPressUp}
      onPressDown={onPressDown}
      onPressRemove={onPressRemove}
      onError={onError}
      setImageList={setImageList}
      escolher={escolher}
      onRequestClose={onRequestClose}
    />
  );
};

export default ImageToPdf;
