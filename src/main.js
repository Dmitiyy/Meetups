import { createApp } from 'vue'
import App from './App.vue'
import store from "./store/";
import firebase from "firebase/app";
import { createRouter, createWebHistory } from 'vue-router';
import 'firebase/auth';
import "firebase/firestore";
import AllMeetups from "./components/AllMeetups.vue";
import YourMeetups from "./components/YourMeetups.vue";
import CreateNewMeetup from "./components/CreateNewMeetup.vue";
import Meetup from "./components/Meetup.vue";
import Find from "./components/Find.vue";

const firebaseConfig = {
    apiKey: "AIzaSyAliPDR5SzuByX4B-6oH12GpeZeIIMruDs",
    authDomain: "meetups-b8329.firebaseapp.com",
    projectId: "meetups-b8329",
    storageBucket: "meetups-b8329.appspot.com",
    messagingSenderId: "938816018348",
    appId: "1:938816018348:web:918e83cf0cd6ee105d8c09",
    measurementId: "G-NQMXD9QZ0T"
};

firebase.initializeApp(firebaseConfig);

const routes = [
    {path: '/', component: AllMeetups},
    {path: '/your', component: YourMeetups},
    {path: '/create', component: CreateNewMeetup, name: 'create'},
    {path: '/meetup', component: Meetup},
    {path: '/search', component: Find},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App)
.use(store)
.use(router)
.mount('#app');