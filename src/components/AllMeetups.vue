<template>
  <div class="allMeetups">
    <div class="addNewMeetup">
      <div @click="createNewMeetup" class="circle">
        <img src="../assets/images/add.png" alt="photo">
      </div>
    </div>
    <div v-if="loading" class="loadingAll">
      <Loading />
    </div>
    <div v-else v-for="(item) in data" :key="item" class="item">
      <div class="wrap_title">
        <h2>{{item.name}}</h2>
      </div>
      <div class="wrap_btn">
        <router-link v-if="user === null" to="/meetup"><button @click="open(item)">Open</button></router-link>
        <button v-else @click="item.added.includes(user.email) ? removeFromYourMeetups(item, idx) 
        : addToYourMeetups(item)">{{item.added.includes(user.email) ? 'Remove' : 'Join'}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted,} from 'vue';
import '../assets/sass/allMeetups.sass';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Loading from './Loading.vue';

export default {
    name: 'AllMeetups',
    setup() {
      const store =  useStore();
      const router = useRouter();
      const user = computed(() => store.state.user);
      onMounted(() => {
        store.dispatch('getAllMeetups');
        if (user.value !== null) {
          store.dispatch('getYourMeetups', {user: user.value.email});
        }
      });

      const data = computed(() => store.state.meetups);
      const loading = computed(() => store.state.loading);

      function createNewMeetup () {
        if (user.value === null) {
          alert('Sign up, please');
        } else {
          router.push({name: 'create'});
        }
      }

      function findItem (item) {
        const docs = document.querySelectorAll('.item');
        docs.forEach(elem => {
          const title = elem.childNodes[0].childNodes[0];
          if (title.innerHTML === item.name) {
            const ourBlock = title.parentElement.parentElement;
            const visible = document.createElement('div');
            visible.classList.add('visible');
            visible.insertAdjacentHTML('beforeend', `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <circle cx="50" cy="50" fill="none" stroke="#202020" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.9174311926605504s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
            </circle></svg>`);
            ourBlock.append(visible);
          }
        });
      }

      function addToYourMeetups (item) {
        findItem(item);
        store.dispatch('addToYourMeetups', item, user.value.email);
      }

      function removeFromYourMeetups (item, i) {
        findItem(item);
        store.dispatch('removeFromYourMeetups', item, i);
      }

      function open (item) {
        store.commit('open', item);
      }

      function handleActive (item) {
        const arr = [item.added];
        console.log(arr);
        const a = arr.includes(user.value.email); 
        console.log(a);
        return a;
      }

      return {data, createNewMeetup, loading, 
      addToYourMeetups, removeFromYourMeetups, user, open, handleActive};
    },
    components: {
      Loading,
    }
}
</script>