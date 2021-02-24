<template>
    <div ref="modal" @click="closeModal($event)" class="modal">
        <div v-if="!registration" class="content">
            <h2 class="title_form">Log in</h2>
            <form @submit.prevent class="form">
                <input v-model="emailLog" class="inp_item" type="text" placeholder="Email">
                <input v-model="passwordLog" class="inp_item" type="password" placeholder="Password">
                <button @click="logIn" class="btn_form">Log in</button>    
            </form>
        </div>
        <div v-else class="content">
            <h2 class="title_form">Sign up</h2>
            <form @submit.prevent class="form_reg">
                <input v-model="name" class="inp_item" type="text" placeholder="Name">
                <input v-model="email" class="inp_item" type="text" placeholder="Email">
                <input v-model="password" class="inp_item" type="password" placeholder="Password">
                <button class="btn_form" @click="signUp">Sign up</button>    
            </form>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import '../assets/sass/modal.sass';
import {computed, ref, reactive, toRefs} from 'vue';

export default {
    name: 'Modal',
    setup () {
        const store = useStore();
        const modal = ref(null);

        const state = reactive({
            name: '',
            email: '',
            password: '',
            emailLog: '',
            passwordLog: ''
        })

        function clearInputs () {
            state.name = '';
            state.email = '';
            state.password = '';
            state.emailLog = '';
            state.passwordLog = '';
        }

        function closeModal (event) {
            const target = modal.value;

            if (event.target === target) {
                store.dispatch('closeModal');
            }
        }

        function handleReg (formData, kind) {
            store.dispatch(kind, formData);
            setTimeout(() => {
                if (!store.state.error) {
                    clearInputs();
                    store.dispatch('closeModal');
                }
            }, 1000);
        }

        function signUp () {
            const formData = {
                name: state.name,
                email: state.email,
                password: state.password 
            }
            if (check(formData)) {
                alert('Enter the inputs');
            } else {
                handleReg(formData, 'signUp');
            }
        }

        function logIn () {
            const formData = {
                email: state.emailLog,
                password: state.passwordLog 
            }
            if (check(formData)) {
                alert('Enter the inputs');
            } else {
                handleReg(formData, 'logIn');
            }
        }

        function check (data) {
            const arr = [];
            for (let key in data) {
                arr.push(data[key]);
            }
            const result = arr.some((item) => {
                return item.length === 0;
            });
            return result;
        }

        return {
            closeModal,
            modal,
            registration: computed(() => store.state.registration),
            signUp,
            logIn,
            ...toRefs(state)
        }
    }
}
</script>