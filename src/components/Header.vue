<template>
    <header>
        <div class="logo_wrap">
            <img src="../assets/images/logo.png" alt="logo">
        </div>
        <div v-if="!logIn" class="btns_wrap">
            <button class="btn_auth" @click="openModal(false)">Log in</button>
            <button class="btn_auth" @click="openModalReg(true)">Sign up</button>
        </div>
        <div v-else class="reg_wrap">
            <h2 class="userName">Hello, {{name}}</h2>
            <button class="btn_auth" @click="logOut">Log out</button>
        </div>
    </header>
</template>

<script>
import '../assets/sass/header.sass';
import {useStore} from 'vuex';
import { computed, ref, watch } from 'vue';

export default {
    name: 'Header',
    setup () {
        const store = useStore();

        const logIn = ref(false);
        const name = ref('');

        const user = computed(() => store.state.user);
        const altName = computed(() => store.state.altName);

        function openModal (reg = false) {
            store.dispatch('openModal', reg);
        }
        
        function openModalReg (reg = false) {
            store.dispatch('openModal', reg);
        }

        watch(user, () => {
            if (user.value !== null) {
                name.value = user.value.displayName || altName.value;
                logIn.value = true;
            } else {
                logIn.value = false;
            }
        });

        function logOut () {
            store.dispatch('logOut');
        }

        return {
            openModal,
            openModalReg,
            logIn,
            name: computed(() => name.value),
            logOut
        }
    }
}
</script>