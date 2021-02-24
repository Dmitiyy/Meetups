<template>
  <Container>
    <Header />
    <Navigation />
    <router-view />
    <Footer />
  </Container>
  <Modal v-show="open" />
</template>

<script>
import './assets/sass/fonts.sass';
import Header from './components/Header.vue';
import Container from './components/Container.vue';
import Modal from './components/Modal.vue';
import {useStore} from 'vuex';
import { computed, onMounted, } from 'vue';
import firebase from 'firebase/app';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Container,
    Modal,
    Navigation,
    Footer
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      firebase.auth().onAuthStateChanged(user => {
        store.dispatch('setUser', user);
      });
    }); 

    return {
      open: computed(() => store.state.modalShow)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>