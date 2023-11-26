<script lang='ts' setup>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const username = ref('');
const password = ref('');

function submitLogin() {
  api.post('api/login', {
    username: username.value,
    password: password.value
  }).then((response) => {
    $q.notify('You have successfully logged in!');
  }).catch((err) => {
    console.log(err);
    if (err.code == 'ERR_BAD_REQUEST') {
      $q.notify({ position: 'top-right', message: 'Username or Password incorrect' });
    }
  });
}
</script>

<template>
  <q-card class='flex column login-card'>
    <h4 class='q-m-auto'>Login Page</h4>
    <q-card-section>
      <q-form>
        <q-input v-model='username' :rules="[val => !!val || 'Field is required']" label='Username'
                 type='text'></q-input>
        <q-input v-model='password' :rules="[val => !!val || 'Field is required']" class='q-my-lg' label='Password'
                 type='password'></q-input>
        <q-btn color='primary' label='Login' @click='submitLogin' />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.login-card {
  width: 100%;
  max-width: 540px;
  margin: 0 auto;
}
</style>
