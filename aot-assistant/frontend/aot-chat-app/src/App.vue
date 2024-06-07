<template>
  <v-app>
    <ChatComponent />
  </v-app>
</template>

<script>
import ChatComponent from './components/ChatComponent.vue';

export default {
  name: 'App',
  components: {
    ChatComponent,
  },
};
</script>

<style>
/* Add any global styles here */
</style>
