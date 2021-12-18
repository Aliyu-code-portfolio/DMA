import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


export const updateDatabase = (item, type) => {
    if (type == 'pending') {
        item.forEach(data => {
            firebase.firestore().collection('Campaign').doc('Events').collection('pending').doc(data.Id).set({
                Id: data.Id,
                Event: data.Event,
                Date: data.Date,
                Venue: data.Venue,
                Cost: data.Cost,
                Vote: data.Vote,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        });
    }
    else if (type == 'approved') {
        item.forEach(data => {
            firebase.firestore().collection('Campaign').doc('Events').collection('approved').doc(data.Id).set({
                Id: data.Id,
                Event: data.Event,
                Date: data.Date,
                Venue: data.Venue,
                Cost: data.Cost,
                Vote: data.Vote,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            })
        });
    }

}



export const retrieveData = async (sendData) => {
    const pend = []
    const approve = []
    await firebase.firestore().collection('Campaign').doc('Events').collection('pending').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            pend.push(doc.data());

        });
    })
    await firebase.firestore().collection('Campaign').doc('Events').collection('approved').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            approve.push(doc.data());

        });
    })
    sendData(pend, approve)

}



export const finished = (data, type) => {
    if (type == 'delete') {
        firebase.firestore().collection('Campaign').doc('CompletedEvents').collection('Cancelled').doc(data.Id).set({
            Event: data.Event,
            Date: data.Date,
            Venue: data.Venue,
            Cost: data.Cost,
            Vote: data.Vote,
            cancelAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        firebase.firestore().collection('Campaign').doc('Events').collection('approved').doc(data.Id).delete()
    }
    else if (type == 'finish') {
        firebase.firestore().collection('Campaign').doc('CompletedEvents').collection('Completed').doc(data.Id).set({
            Event: data.Event,
            Date: data.Date,
            Venue: data.Venue,
            Cost: data.Cost,
            Vote: data.Vote,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        firebase.firestore().collection('Campaign').doc('Events').collection('approved').doc(data.Id).delete()
    }
}



export const eventVote = async (sendData) => {
    const event = [];
    await firebase.firestore().collection('Campaign').doc('Events').collection('pending').where('Vote', '!=', null).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            event.push(doc.data());

        });

    })
    sendData(event)
}

export const voteAnEvent = async (data) => {
    await firebase.firestore().collection('Campaign').doc('Events').collection('pending').doc(data.Id).get().then(item => { countVote(data, item.data().Vote) })


}
const countVote = (data, vote) => {
    firebase.firestore().collection('Campaign').doc('Events').collection('pending').doc(data.Id).set({
        Id: data.Id,
        Event: data.Event,
        Date: data.Date,
        Venue: data.Venue,
        Cost: data.Cost,
        Vote: vote + 1,
        createdAt: data.createdAt

    })
}





export const budget = async (sendData) => {
    const event = [];
    await firebase.firestore().collection('Campaign').doc('Events').collection('approved').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            event.push(doc.data());

        });

    })
    sendData(event)
}


export const changeBudget = async (data, cost) => {
    firebase.firestore().collection('Campaign').doc('Events').collection('approved').doc(data.Id).set({
        Id: data.Id,
        Event: data.Event,
        Date: data.Date,
        Venue: data.Venue,
        Cost: cost,
        Vote: data.Vote,
        createdAt: data.createdAt

    })


}


export const budgetTotal = async (send) => {
    const totalCost = []
    await firebase.firestore().collection('Campaign').doc('Events').collection('approved').get().then((snapshot) => {
        snapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            totalCost.push(doc.data().Cost);

        });

    })
    send(totalCost)
}