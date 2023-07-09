<template>
  <v-snackbar
      v-model="messageStore.state.showMessage"
      multi-line
    >
    <ul>
      <li v-for="message in messageStore.state.messages" :key="message" >
        {{ message }}
      </li>
    </ul>
      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="messageStore.state.showMessage = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  <router-view />
</template>

<script lang="ts" setup>
import messageStore from '@/store/message_store'


</script>
