import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBNN1t82sFc-CWUyyW8Mpsmo4zQnqot63s",
    authDomain: "dma-5c98f.firebaseapp.com",
    projectId: "dma-5c98f",
    storageBucket: "dma-5c98f.appspot.com",
    messagingSenderId: "601101583020",
    appId: "1:601101583020:web:08fcb8e80fa3e898fe9509",
    measurementId: "G-8T01HY2VVN",
    storageBucket: "gs://dma-5c98f.appspot.com"

};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);