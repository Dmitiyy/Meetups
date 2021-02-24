import { createStore } from 'vuex';
import firebase from 'firebase/app';
import getId from "./getId";
import getAll from './getAll';

const store = createStore({
    state () {
        return {
            modalShow: false,
            registration: false,
            user: null,
            error: false,
            altName: '',
            meetups: [],
            loading: false,
            ourId: '',
            yourMeetups: [],
            loadingYour: false,
            loadingCurrent: false,
            openedMeetup: {},
            findMeetups: []
        }
    },
    mutations: {
        openModal (state, reg) {
            state.registration = reg;
            state.modalShow = true;
        },
        closeModal (state) {
            state.modalShow = false;
        },
        setUser (state, user) {
            state.user = user;
        },
        error (state, onErr = false) {
            if (onErr) {
                state.error = true;
            } else {
                state.error = false;
            }
        },
        onAltName (state, name) {
            state.altName = name;
        },
        getAllMeetups (state, data) {
            state.meetups = data;
        },
        onLoad (state, data) {
            state.loading = data
        },
        setId (state, id) {
            state.ourId = id;
        },
        getYourMeetups (state, data) {
            state.yourMeetups = [...data.yourPosts];
        },
        onLoadYour (state, data) {
            state.loadingYour = data;
        },
        onLoadCurrent (state, data) {
            state.loadingCurrent = data;
        },
        open (state, item) {
            state.openedMeetup = item;
        },
        search (state, data) {
            state.findMeetups = data;
        }
    },
    actions: {
        openModal: ({commit}, reg = false) => commit('openModal', reg),
        closeModal: ({commit}) => commit('closeModal'),
        setUser: ({commit}, user) => commit('setUser', user),
        signUp: async ({commit}, {name, email, password}) => {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(result => {
                        commit('error', false)
                        commit('onAltName', name);
                        return result.user.updateProfile({
                            displayName: name
                        })
                    });
                await firebase.firestore().collection('users').add({
                    name: name,
                    email: email,
                    yourPosts: [],
                }).then(() => console.log('user is added succefully'));
            } catch (e) {console.log(e); commit('error', true);}
        },
        logIn: async ({commit}, {email, password}) => {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                .then(commit('error'));
            } catch (e) {console.log(e); commit('error', true)}
        },
        logOut: async ({commit}) => {
            try {
                await firebase.auth().signOut()
                .then(commit('error', false))
                .catch(commit('error', true))
            } catch (e) {console.log(e);}
        },
        getAllMeetups: async ({commit}) => {
            try {
                commit('onLoad', true);
                getAll().then((data) => {
                    commit('getAllMeetups', data);
                    commit('onLoad', false);
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            } catch (e) {console.log(e);}
        },
        reloadItems: async ({commit}) => {
            try {
                getAll().then((data) => {
                    commit('getAllMeetups', data);
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            } catch (e) {console.log(e);}
        },
        onLoad: ({commit}, data) => commit('onLoad', data),
        createMeetup: async (_, data) => {
            try {
                console.log(data);
                await firebase.firestore().collection('all_posts').add(data).then(() => {
                    alert('post is added succefully');
                });
            } catch (e) {console.log(e);}
        },
        addToYourMeetups: async ({commit, state}, item,) => {
            try {
                let usersA = [];
                let ourIdA = '';
                await getId(state.user.email).then(({ourId, users}) => {
                    usersA = users;
                    ourIdA = ourId;
                });
                await firebase.firestore().collection('all_posts').doc(item.fireId).update({
                    added: [...item.added, state.user.email]
                });
                await firebase.firestore().collection('users').doc(ourIdA).update({
                    yourPosts: [...usersA[0].yourPosts, 
                    {...item, added: [...item.added, state.user.email]}],
                }).then(console.log('Post added'));
                await getAll().then((data) => {
                    commit('getAllMeetups', data);
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            } catch (e) {console.log(e);}
        },
        getYourMeetups: async ({commit, state},) => {
            try {
                let ourIdUser = '';
                commit('onLoadYour', true);
                await getId(state.user.email)
                .then(({ourId}) => {
                    ourIdUser = ourId;
                }).then(() => {
                    commit('setId', ourIdUser);
                }).then(async () => {
                    await firebase.firestore().collection('users').doc(ourIdUser).get().then((doc) => {
                        if (doc) {
                            commit('getYourMeetups', doc.data());
                        }
                    })
                    commit('onLoadYour', false);
                })
            } catch (e) {console.log(e);}
        },
        removeFromYourMeetups: async ({commit, state}, item) => {
            try {
                let usersC = [];
                let ourIdC = '';
                const getStaticData = [];
                await firebase.firestore().collection('all_posts').doc(item.fireId).get().then(doc => {
                    if (doc) {
                        getStaticData.push(doc.data());
                    }
                });
                const added = getStaticData[0].added;
                const setArr = added.filter(doc => {
                    return doc !== state.user.email;
                });
                await firebase.firestore().collection('all_posts').doc(item.fireId).update({
                    added: [...setArr]
                });
                await getId(state.user.email).then(({ourId, users}) => {
                    usersC = users;
                    ourIdC = ourId;
                });
                let posts = [...usersC[0].yourPosts];
                posts = posts.filter(doc => doc.id !== item.id);
                await firebase.firestore().collection('users').doc(ourIdC).update({
                    yourPosts: [...posts],
                }).then(console.log('Post removed'));

                await getAll().then((data) => {
                    commit('getAllMeetups', data);
                }).catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            } catch (e) {console.log(e);}
        }
    },
    getters: {
        getMeetups (state) {
            return state;
        }
    }
});

export default store;