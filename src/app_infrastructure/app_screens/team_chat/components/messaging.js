import firebase from '../../chat/src/firebase/config';
export const senderMsg = async (msgValue, currentUserId, username, img) => {
    try {
        return await firebase
            .database()
            .ref('teammesseges/')
            .push({
                messege: {
                    sender: currentUserId,
                    username: username,
                    msg: msgValue,
                    img: img,
                },
            });
    } catch (error) {
        return error;
    }
};