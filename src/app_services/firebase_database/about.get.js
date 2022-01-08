import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const getAbout = async (data) => {
    let p1 = ''
    let p2 = ''
    let p3 = ''

    await firebase.firestore().collection('About').doc('1').get().then((snapshot) => {
        p1 = snapshot.data()
    })
    await firebase.firestore().collection('About').doc('2').get().then((snapshot) => {
        p2 = snapshot.data()
    })
    await firebase.firestore().collection('About').doc('3').get().then((snapshot) => {
        p3 = snapshot.data()

    })
    data(p1, p2, p3);
}
export const getVersion = async (data) => {
    let version = ''
    await firebase.firestore().collection('About').doc('VersionControl').get().then((snapshot) => { version = snapshot.data().version })
    data(version)
}