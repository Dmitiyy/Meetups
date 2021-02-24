<template>
    <div class="meetup">
        <div class="meetup-wrap">
            <h2 class="meetup-title">{{item.name}}</h2>
            <p class="meetup-descr">{{item.descr}}</p>
            <p class="meetup-user">Organizer: <span :style="[{'text-shadow': '0px 0px 8px white'}, 
            {'color':'black'}, {'font-weight': 'bold'}]">{{item.user}}</span></p>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import '../assets/sass/meetup.sass';
export default {
    name: 'Meetup',
    setup () {
        const store = useStore();
        const item = computed(() => store.state.openedMeetup);
        return {item}
    }
}
</script>