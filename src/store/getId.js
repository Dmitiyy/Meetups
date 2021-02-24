import firebase from 'firebase/app';

async function getId (item) {
    let users = [];
    let staticUsers = [];

    await firebase.firestore().collection('users').get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
            if (doc.data().email === item) {
                users.push(doc.data());
                staticUsers.push(doc.id);
            }
        });
    })

    const iterator = users.indexOf(users[0]);
    const ourId = staticUsers[iterator];


    return {ourId, users};
}

export default getId;