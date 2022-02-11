import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeArea } from '../../../utils/safe-area.component'
import { RoundedButton } from '../../../../app_components/RoundedButton'
import { Title, MediumText, SmallText } from '../../botton.styles'
import { myData } from '../../../../app_services/authentication/network/user'
import { LogOutUser } from '../.././../../app_services/authentication/network'
import { UpdateUser } from '../../../../app_services/authentication/network/user'
import { LOADING_START, LOADING_STOP } from '../../../../app_services/authentication/context/actions/type'
import { Store } from '../../../../app_services/authentication/context/store'
import { clearAsyncStorage } from '../../../../app_services/authentication/asyncStorage'
import { uuid } from '../../../../app_services/authentication/utility/constants'
import { Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
//import ImagePicker from 'react-native-image-crop-picker'

import { storage } from '../../../../app_services/firebase_database/storage'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const Setting = ({ navigation }) => {
    const globalState = useContext(Store);
    const { dispatchLoaderAction } = globalState;
    const [user, setUser] = useState(null);
    const [image, setImage] = useState()

    //Functions
    useEffect(() => {
        myData(useData)

    }, [])

    const useData = (info) => {
        setUser(info)
        setImage(info.profileImg)
        //downloadFromStorage(info.profileImg)
    }

    const logout = () => {
        LogOutUser()
            .then(() => {
                clearAsyncStorage()
                    .then(() => {
                        navigation.replace("Login");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    //Firebase storage

    uriToBlob = (uri) => {

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();

            xhr.onload = function () {
                // return the blob
                resolve(xhr.response);
            };

            xhr.onerror = function () {
                // something went wrong
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                reject(new Error('uriToBlob failed'));
            };

            // this helps us get a blob
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send(null);

        });

    }

    uploadToFirebase = async (blob) => {

        const profileImagesRef = ref(storage, `profilePictures/${user?.uuid}`);
        const snapshot = await uploadBytes(profileImagesRef, blob).then((snapshot) => {

            blob.close();

        }).catch((error) => {
            dispatchLoaderAction({
                type: LOADING_STOP,
            });
            console.log(error);

        });

    }

    const downloadFromStorage = async () => {
        const img = ref(storage, `profilePictures/${uuid}`);
        getDownloadURL(img)
            .then((url) => {
                setImage(url)
                UpdateUser(uuid, url)
                    .catch(() => {
                        alert(err);
                        dispatchLoaderAction({
                            type: LOADING_STOP,
                        });
                    });
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
            })
            .catch((error) => {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        alert("File doesn't exist")
                        break;
                    case 'storage/unauthorized':
                        alert("User doesn't have permission to access the object")
                        break;
                    case 'storage/canceled':
                        alert("User canceled the upload")
                        break;

                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            });
    }

    const selectPhotoTapped = async (type) => {

        if (type == 'media') {
            // ImagePicker.openPicker({
            //     width: 300,
            //     height: 400,
            //     cropping: false,
            // }).then(async image => {
            //     console.log(image)
            //     let fileName = image.path.substring(image.path.lastIndexOf('/') + 1)
            //     const extension = fileName.split('.').pop()

            //     const profileImagesRef = ref(storage, `profilePictures/${user?.uuid}.${extension}`);
            //     const snapshot = await uploadBytes(profileImagesRef, image.path)
            // })
            ImagePicker.launchImageLibraryAsync({
                mediaTypes: "Images",
                allowsEditing: true,
                aspect: [3, 3],
                quality: 1,
            }).then((result) => {
                if (!result.cancelled) {
                    // User picked an image
                    const { height, width, type, uri } = result;
                    dispatchLoaderAction({
                        type: LOADING_START,
                    });
                    return uriToBlob(uri)
                }

            }).then((blob) => {

                return uploadToFirebase(blob);

            }).then((snapshot) => {
                downloadFromStorage()
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                console.log("File uploaded");

            }).catch((error) => {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                throw error;

            });

        }


        else if (type == 'cam') {

            ImagePicker.launchCameraAsync().then((result) => {

                if (!result.cancelled) {
                    // User picked an image
                    const { height, width, type, uri } = result;
                    dispatchLoaderAction({
                        type: LOADING_START,
                    });
                    return uriToBlob(uri);

                }

            }).then((blob) => {

                return uploadToFirebase(blob);

            }).then((snapshot) => {
                downloadFromStorage()
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                console.log("File uploaded");


            }).catch((error) => {
                dispatchLoaderAction({
                    type: LOADING_STOP,
                });
                throw error;

            });

        }




        /////////////////////////////
        //const task = storage().ref(fileName).putFile(uploadUrl)
        //set transfer state //ux feature
        // task.on('state_changed', taskSnapshot => {
        //     console.log(`${taskSnapshot.bytesTransfered} transfered out of ${taskSnapshot.totalBytes}`)
        // })
        // try {
        //     await task;
        // }
        // catch (e) {
        //     console.log(e)

        ///////////////////////////////////////////




        //}


    };

    return (
        <>
            <View style={styles.container}>

                <View style={{ flex: 1, width: '100%', paddingLeft: '5%', paddingRight: '5%', paddingTop: '10%' }}>
                    <View style={styles.line1}>
                        <View style={{ position: 'absolute', left: 0, bottom: 0, top: 0 }}>
                            <Image
                                style={{ width: 50, height: 25, backgroundColor: 'transparent' }}
                                source={require('../../../../../assets/logo.png')}
                            /></View>

                        <View style={{ height: '50%', width: '25%', backgroundColor: 'transparent', borderRadius: 4, position: 'absolute', justifyContent: 'center', right: 0, bottom: 0, top: 0 }}>
                            <AntDesign
                                name="logout"
                                style={{ position: 'absolute', right: 0 }}
                                size={30}
                                onPress={() => Alert.alert(
                                    "Logout",
                                    "Are you sure to log out?",
                                    [
                                        {
                                            text: "Yes",
                                            onPress: () => logout(),
                                        },
                                        {
                                            text: "No",
                                        },
                                    ],
                                    { cancelable: false }
                                )}
                            />
                        </View>

                    </View>
                    <Title>Account</Title>
                    <View style={styles.line3}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Photo</Text>
                        <View style={{ justifyContent: 'center', paddingLeft: '30%', paddingTop: '10%', }}>
                            <TouchableWithoutFeedback onPress={() => { user ? navigation.navigate('View', { name: user.name, img: image && image }) : null }}>
                                <Avatar.Image
                                    source={{
                                        uri: image
                                    }}
                                    size={110}
                                    style={{ alignContent: 'stretch', borderWidth: 1, borderRadius: 40, backgroundColor: image ? 'transparent' : 'green' }}
                                /></TouchableWithoutFeedback>
                            <TouchableOpacity style={{ flexDirection: 'column' }}
                                onPress={() => {
                                    Alert.alert(
                                        "Choose",
                                        "Select where to upload from",
                                        [
                                            {
                                                text: "Camera",
                                                onPress: () => selectPhotoTapped('cam'),
                                            },
                                            {
                                                text: "Media",
                                                onPress: () => selectPhotoTapped('media'),
                                            },
                                        ],
                                        { cancelable: false }
                                    )
                                }}>
                                <Ionicons
                                    name="create-outline"
                                    color='#0AA49A'
                                    size={22}
                                    style={{ left: '50%', paddingTop: '5%' }}
                                />
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginBottom: '10%', color: '#0AA49A', fontSize: 16 }}>Change Image</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                    <View style={styles.line4567}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Name</Text>
                        <View style={{ paddingLeft: '20%', }}>
                            <Text style={{ color: '#000000', fontSize: 16 }}>{user && user.name}</Text>
                            <View style={{ elevation: 1, width: '100%', borderWidth: 1, borderColor: '#f4f4f4', marginTop: '5%' }} />
                        </View>
                    </View>
                    <View style={[styles.line4567, { paddingTop: '10%', }]}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Gender</Text>
                        <View style={{ paddingLeft: '20%', flexDirection: 'row' }}>
                            <RoundedButton size={35} color={user && (user.gender ? 'green' : '#F0EFEF')} title='M' style={{ marginRight: 20 }} />
                            <RoundedButton size={35} color={user && user.gender ? '#F0EFEF' : 'green'} title='F' />

                        </View>
                    </View>
                    <View style={styles.line4567}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Phone   </Text>
                        <View style={{ paddingLeft: '20%', }}>
                            <Text style={{ color: '#000000', fontSize: 16 }}>{user && user.phone}</Text>
                        </View>
                    </View>
                    <View style={[styles.line4567, { paddingBottom: '10%' }]}>
                        <Text style={{ marginLeft: '5%', color: '#828282', fontSize: 16 }}>Mail   </Text>
                        <View style={{ height: '200%', paddingLeft: '20%', paddingRight: '5%' }}>
                            <Text style={{ color: '#000000', fontSize: 16, }}>{user && user.email}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    font: {
        color: 'green'
    },
    line1: {
        flexDirection: 'row',
        flex: 2,
        height: '100%',
        width: '100%',
    },
    line3: {
        flexDirection: 'row',
        paddingTop: '4%',
        paddingBottom: '10%',
        flex: 3,
        height: '100%',
        width: '100%',
    },
    line4567: {
        paddingTop: '10%',
        flexDirection: 'row',
        flex: 1,
        height: '100%',
        width: '100%',
    },
})