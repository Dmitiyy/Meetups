<template>
    <div class="search">
        <div v-if="data.length !== 0" class="wrp_cont">
          <div v-for="(item) in data" :key="item" class="item">
            <div class="wrap_title">
                <h2>{{item.name}}</h2>
            </div>
            <div class="wrap_btn">
                <router-link to="/meetup"><button @click="open(item)">Open</button></router-link>
            </div>
          </div>
        </div>
        <div v-else class="empty">
          <h2>We could not load find</h2>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import '../assets/sass/search.sass';
export default {
    name: 'Find',
    setup () {
        const store = useStore();
        const data = computed(() => store.state.findMeetups);

        function open (item) {
            store.commit('open', item);
        }
        return {data, open};
    }
}
</script>