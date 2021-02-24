<template>
    <div class="navigation">
        <div class="navigation_text">
            <router-link active-class="active" tag="li" to="/"><h2>All meetups</h2></router-link>
            <router-link active-class="active" to="/your"><h2>Your meetups</h2></router-link>
        </div>
        <div class="navigation_search">
            <input v-model="name" type="text" placeholder="Search">
            <router-link to="/search"><div @click="search" class='navigation_btn-search'>
                <img src="../assets/images/search.png" alt="search">
            </div></router-link>
        </div>
    </div>
</template>

<script>
import { computed, ref, } from 'vue';
import { useStore } from 'vuex';
import '../assets/sass/navigation.sass';

export default {
    name: 'Navigation',
    setup () {
        const store = useStore();
        const meetups = computed(() => store.state.meetups);
        const name = ref('');
        function search () {
            const data = meetups.value.filter(item => {
                return item.name.indexOf(name.value) !== -1;
            });
            store.commit('search', data);
        }
        return {name, search}
    }
}

</script>