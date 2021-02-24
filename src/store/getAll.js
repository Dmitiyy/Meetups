import firebase from 'firebase/app';

async function getAll () {
    let data = [];
    await firebase.firestore().collection('all_posts').get()
        .then((querySnapshot) => {
            querySnapshot.forEach(item => {
                data.push({...item.data(), fireId: item.id});
            });
        });
    return data;
}

export default getAll;