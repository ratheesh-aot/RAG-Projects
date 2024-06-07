<template>
  <v-container class="chat">
    <h1>Chat with AOT Assistant</h1>
    <v-text-field
      v-model="query"
      label="Enter your question"
      @keyup.enter="sendQuery"
      outlined
    ></v-text-field>
    <v-btn @click="sendQuery" :disabled="loading" color="primary">
      Send
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="white"
        size="20"
        class="ml-2"
      ></v-progress-circular>
    </v-btn>
    <v-card v-if="response" class="mt-4">
      <v-card-title>Response</v-card-title>
      <v-card-text>
        <p>{{ response.result }}</p>
        <h3>Sources:</h3>
        <ul class="sources-list">
          <li v-for="source in response.sources" :key="source">
            <a :href="source" target="_blank">{{ source }}</a>
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ChatComponent',
  data() {
    return {
      query: '',
      response: null,
      loading: false,
    };
  },
  methods: {
    async sendQuery() {
      if (this.query.trim() === '') return;
      
      this.loading = true;
      this.response = null;
      
      try {
        const res = await axios.post('http://localhost:3000/query', { query: this.query });
        this.response = res.data.response;
      } catch (error) {
        console.error('Error querying the API:', error);
        alert('An error occurred while processing your request.');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.chat {
  max-width: 600px;
  margin: auto;
  text-align: center;
  padding-top: 20px;
}
.sources-list {
  list-style-type: none;
  padding: 0;
}
.sources-list li {
  margin-bottom: 5px;
}
</style>
