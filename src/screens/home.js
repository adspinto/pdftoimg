import React, { useState, useEffect } from 'react'
import { View, Text, Button, FlatList, PermissionsAndroid, Modal, Linking } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import ImageItem from '../components/imageItem'
import RNFetchBlob from 'rn-fetch-blob'
import PDFLib, { PDFDocument, PDFPage } from 'react-native-pdf-lib';


const HomeScreen = (props) => {
    const [imageList, setImageList] = useState([]);
    const [convertEnd, setConvertEnd] = useState(false);
    const [convertPath, setConvertPath] = useState("");

    const statFile = async (uri) => {

        return await RNFetchBlob.fs.stat(uri)
        // .then(res => {
        //     console.log(res)
        //     return res
        // })
        // .catch(err => {
        //     console.log(err)
        // })

    }
    const pickFiles = async () => {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.images],
            });
            console.log(res);
            res.map(item => {
                RNFetchBlob.fs.stat(item.uri)
                    .then(res => {
                        console.log(res);
                        let file = 'file://';
                        res.path = file + res.path;
                        setImageList(prevImageList => ([...prevImageList, res]))
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

    const escolher = async () => {
        try {


            await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
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
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
    const converter = async () => {
        try {

            let pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/converted/converted-${Date.now()}.pdf`;

            const page1 = PDFPage
                .create()
                .setMediaBox(200, 200)
                .drawText('You can add text and rectangles to the PDF!', {
                    x: 5,
                    y: 235,
                    color: '#007386',
                })
                .drawRectangle({
                    x: 25,
                    y: 25,
                    width: 150,
                    height: 150,
                    color: '#FF99CC',
                })
                .drawRectangle({
                    x: 75,
                    y: 75,
                    width: 50,
                    height: 50,
                    color: '#99FFCC',
                });

            // setConvertPath(pathToWrite)
            // let length = imageList.length
            // imageList.map((item, index) => {
            //     console.log(item)
            //     RNFetchBlob.fs.readFile(item.path, 'base64')
            //         .then(res => {
            //             console.log(res)
            //             RNFetchBlob.fs.writeFile(pathToWrite, 'data:application/pdf;base64,' + res, 'base64')
            //                 .then((res) => {
            //                     console.log("page written");
            //                     if (index >= length - 1) {
            //                         setConvertEnd(true)
            //                     }
            //                 })
            //         })

            // })




        } catch (err) {



        }
    }
    const onError = (error) => {
        console.log(error)
    }

    useEffect(() => {
        if (convertEnd) {
            console.log(convertEnd, "it finished")
            Linking.openURL(convertPath)
        }

    }, [convertEnd])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text>
                IMAGEM PARA PDF
            </Text>

            <FlatList
                data={imageList}
                keyExtractor={(item, index) => `${item.name}-${index}`}
                renderItem={({ item }) => <ImageItem onError={onError} name={item.filename} source={{ uri: item.path }} />}
            />

            <View style={{ marginVertical: 5, width: '90%' }}>

                <Button onPress={escolher} title={'Escolher Imagens'} />
            </View>

            <View style={{ marginVertical: 5, width: '90%' }}>
                <Button onPress={converter} title={'Converter'} />
            </View>

            {/* <Modal /> */}
        </View>
    )
}

export default HomeScreen