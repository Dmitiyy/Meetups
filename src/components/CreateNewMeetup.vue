<template>
  <div class="createMeetup">
    <h2>Create new meetup</h2>
    <input v-model="name" type="text" placeholder="Enter name of meetup" >
    <textarea v-model="descr" placeholder="Enter description of meetup"></textarea>
    <button @click="createMeetup">Add meetup</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import '../assets/sass/createNewMeetup.sass';
import { useStore } from 'vuex';
export default {
    name: 'CreateNewMeetup',
    setup() {
      const name = ref('');
      const descr = ref('');
      const store = useStore();

      function createMeetup () {
        if (name.value.length === 0 || descr.value.length === 0) {
          alert('Please, fill the fields');
        } else if (name.value.length > 14) {
          alert('Name is too long');
        } else {
          const data = {
            id: `id${(~~(Math.random()*1e8)).toString(16)}`,
            name: name.value, 
            descr: descr.value,
            user: store.state.user.email,
            added: []
          }
          store.dispatch('createMeetup', data);
        }
      }

      return {name, descr, createMeetup}
    }
}
</script>