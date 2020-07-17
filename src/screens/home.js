import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, PermissionsAndroid, Modal, Linking, Dimensions, Platform, LayoutAnimation, UIManager, ActivityIndicator, Image } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import ImageItem from '../components/imageItem'
import RNFetchBlob from 'rn-fetch-blob'
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';
import _ from 'lodash'
import ImageSize from 'react-native-image-size'
import {
    HeaderButtons,
    HeaderButton,
    Item,
    HiddenItem,
    OverflowMenu,
} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/FontAwesome';
import DraggableFlatList from 'react-native-draggable-flatlist'
import ConvertModal from '../components/convertModal';
import { Bar } from 'react-native-progress';
import Ad from '../components/ad'


if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}


const VectorIconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton {...props} IconComponent={Icon} iconSize={23} />
);

const ReusableSelectItem = ({ onPress }) => <Item title="Edit" onPress={onPress} />;

const ReusableHiddenItem = ({ onPress }) => <HiddenItem title="hidden2" onPress={onPress} />;


const HomeScreen = (props) => {
    const [imageList, setImageList] = useState([]);
    // const [convertEnd, setConvertEnd] = useState(false);
    const [convertPath, setConvertPath] = useState("");

    const [convertStatus, setConvertStatus] = useState({ status: "iddle", convertMessage: "" });

    const [progress, setProgress] = useState(0)



    const pickFiles = async () => {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            // console.log(res);
            res.map((item, index) => {
                RNFetchBlob.fs.stat(item.uri)
                    .then(res => {
                        console.log("RNFetchBlob.fs.stat", res);
                        let file = 'file://';
                        res.realPath = res.path
                        res.path = file + res.path;

                        ImageSize.getSize(res.path).then(size => {
                            // size.height
                            // size.width
                            res.width = size.width
                            res.height = size.height
                            res.index = index
                            setImageList(prevImageList => ([...prevImageList, res]))
                        })


                    })
                    .catch(console.log)

            })

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log("DOcument picker cancelled by the user")
            } else {
                throw err;
            }
        }

    }

    const escolher = () => {

        try {

            console.log("start choosing")
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                .then(permission => {
                    console.log("permission", permission)
                    if (permission) {
                        pickFiles();
                    } else {
                        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                            .then(permission => {
                                console.log(permission)
                                if (permission == "granted") {
                                    pickFiles();
                                }
                            })
                            .catch(err => {
                                console.log(err, "user didnt accept")
                            })
                    }
                })




        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log(err)
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                console.log(err)
                // throw err;
            }
        }
    }
    const converter = async () => {
        try {

            if (imageList.length <= 0) throw { err: "Você precisa de imagens para converter" };
            let pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/converted/converted-${Date.now()}.pdf`;

            LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
            setConvertStatus({ status: "pending", convertMessage: "carregando..." });

            setConvertPath(pathToWrite);


            const { width, height } = Dimensions.get("screen");

            let document = PDFDocument.create(pathToWrite)
            setProgress(0.1)
            let pageList = [...imageList].map((item, index) => {

                let computedWidth = (width / item.width) * item.width;
                let computedHeight = (item.height * computedWidth) / item.width

                let settings = {
                    width: computedWidth,
                    height: computedHeight,
                }


                let page = PDFPage
                    .create()
                    .setMediaBox(computedWidth, computedHeight)
                    .drawImage(`${item.realPath}`, 'png', settings);


                document.addPages(page)

            })

            setProgress(0.3)

            RNFetchBlob.fs.exists(pathToWrite)
                .then(exist => {
                    setProgress(0.2)
                    if (exist) {
                        console.log(exist, "exist")
                        setProgress(0.4)
                        document.write()
                            .then(path => {
                                console.log('PDF created at: ' + path);
                                setProgress(1)
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                setConvertStatus({ status: "resolved", convertMessage: "Images converted successfully!" })

                            })
                            .catch(err => {
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                setConvertStatus({ status: "rejected", convertMessage: "Failed to convert images!" })

                            })
                    } else {
                        RNFetchBlob.fs.writeFile(pathToWrite, "1")
                            .then(res => {
                                setProgress(0.8)
                                document.write()
                                    .then(path => {
                                        setProgress(1)
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                        setConvertStatus({ status: "resolved", convertMessage: "Images converted successfully!" })
                                    })
                                    .catch(err => {
                                        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                                        setConvertStatus({ status: "rejected", convertMessage: "Failed to convert images!" })
                                    })
                            })
                    }
                })

        } catch (err) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            setConvertStatus({ status: "rejected", convertMessage: "Failed to convert images!" })
        }
    }
    const onError = (error) => {
        console.log(error)
    }

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            // in your app, extract the arrow function into a separate component
            // to avoid creating a new one every time
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={VectorIconsHeaderButton}>
                    <Item title="Clear" onPress={() => {
                        setImageList([])
                    }} />
                </HeaderButtons>
            ),
        });
    }, [props.navigation]);

    const onPressRemove = (index) => {
        setImageList(imageList.filter((item, i) => i !== index))
    }

    const onPressUp = (index) => {
        if (index < imageList.length - 1) {
            let nextArray = arrayMove([...imageList], index, index + 1)
            setImageList(nextArray)
        }

    }

    const onPressDown = (index) => {
        if (index > 0) {
            let nextArray = arrayMove([...imageList], index, index - 1)
            setImageList(nextArray)
        }
    }

    const arrayMove = (array, oldIndex, newIndex) => {
        let nextArr = [...array]
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
        setProgress(0)
        setConvertStatus({ status: "iddle", convertMessage: "" })

        if (convertStatus.status === "resolved") {

            const android = RNFetchBlob.android;
            android.actionViewIntent(convertPath, "application/pdf")
        }
    }


    return (
        
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    convertStatus.status === "pending" &&

                    <View style={{ position: "absolute", zIndex: 10, justifyContent: "center", alignItems: "center", width: Dimensions.get("screen").width, height: Dimensions.get("screen").height, backgroundColor: "rgba(0,0,0,0.7)" }}>
                        <Ad screen={"loading"} size={"MEDIUM_RECTANGLE"} />
                        <Bar color={'#fff'} progress={progress} useNativeDriver={true} style={{ margin: 10 }} width={Dimensions.get("screen").width * 0.8} height={10} />
                        <Text style={{ color: "#fff" }}>Converting...</Text>
                    </View>
                }
                <View style={{ position: "absolute", top: (Dimensions.get("window").height * 0.5) - 350, opacity: 0.6, width: 400 }}>
                    {/* <Icon color={"#ABABAB"} name="image" size={170} /> */}
                    <Image style={{ width: '100%'}} resizeMode={'contain'} source={require('../assets/teste_paolla.png')}></Image>
                </View>

                <DraggableFlatList
                    onDragEnd={({ data }) => setImageList(data)}
                    data={imageList}
                    keyExtractor={(item, index) => `${item.name}-${index}`}
                    renderItem={({ item, index, isActive, drag }) => <ImageItem
                        isActive={isActive}
                        drag={drag}
                        onPressUp={onPressUp}
                        onPressDown={onPressDown}
                        onPressRemove={onPressRemove}
                        index={index}
                        onError={onError}
                        width={item.width}
                        height={item.height}
                        name={item.filename}
                        source={{ uri: item.path }} />}
                />

                <View style={{ marginVertical: 5, width: '90%', opacity: convertStatus.status === "pending" ? 0.6 : 1 }}>
                    <Button color={"#B0B0B0"} onPress={escolher} title={'Escolha a imagem'} />
                </View>

                <View style={{ marginVertical: 5, width: '90%', opacity: convertStatus.status === "pending" ? 0.4 : 1 }}>
                    <Button color={"#B0B0B0"} onPress={converter} title={'Convert'} />
                </View>




                <ConvertModal onRequestClose={onRequestClose} convertStatus={convertStatus.status} convertMessage={convertStatus.convertMessage} />
                <Ad screen={"home"} size={"BANNER"} type={"banner"} />
            </View>
        
    )
}

export default HomeScreen