<template>
  <div class="container mt-3">
    <h3>Mb show one of these 4 depending on some calculation</h3>
      <div 
        v-if="this.activeAlert"
        :class="'alert alert-dismissible alert-' + alerts[activeAlert]['type']">
        <button 
          @click="activeAlert = null"
          type="button" 
          class="close">&times;</button>
        {{alerts[activeAlert]['text']}}
      </div>
  </div>
</template>

<script>
import { api } from '../classes/Api';

export default {
  data: () => ({
    activeAlert: null,
    alerts: {
      1: {type: "success", text: "green text"},
      2: {type: "info", text: "blue text"},
      3: {type: "warning", text: "warning text"},
      4: {type: "danger", text: "red text"},
    },
  }),
  async mounted() {
    this.activeAlert = await api.getSurvival();
  },
}
</script>