<template>
  <div class="yourMeetups">
    <div v-if="loading" class="loadingYour">
      <Loading />
    </div>
    <div v-else-if="!loading && posts.length === 0" class="empty">
      <h2>You don't have any meetup</h2>
    </div>
    <div v-else-if="user === null" class="empty">
      <h2>You don't have any meetup</h2>
    </div>
    <div v-else v-for="item in posts" :key="item.id" class="item">
      <div class="wrap_title">
        <h2>{{item.name.length > 14 ? `${item.name.slice(0, 14)}...` : item.name}}</h2>
      </div>
      <div class="wrap_btn">
        <router-link to="/meetup"><button @click="open(item)">Open</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch,  } from 'vue';
import '../assets/sass/yourMeetups.sass';
import { useStore } from 'vuex';
import Loading from './Loading.vue';

export default {
    name: 'YourMeetups',
    setup() {
      const store = useStore();
      const user = computed(() => store.state.user);
      const posts = computed(() => store.state.yourMeetups);
      const loading = computed(() => store.state.loadingYour);

      watch(user, () => {
        if (user.value !== null) {
          store.dispatch('getYourMeetups', {user: user.value.email});
        }
      })

      onMounted(() => {
        if (user.value !== null) {
          store.dispatch('getYourMeetups', {user: user.value.email});
        }
      });

      function open (item) {
        store.commit('open', item);
      }

      return {posts,
      loading, open, user}
    },
    components: {
      Loading
    }
}
</script>