<template>
  <div class="container mt-3">
    <h3>Mb show one of these 4 depending on some calculation</h3>
      <div 
        v-if="this.activeAlert"
        :class="'alert alert-dismissible alert-' + this.activeAlert.alertClassName">
        <button 
          @click="activeAlert = null"
          type="button" 
          class="close">&times;</button>
        {{this.activeAlert.text}}
      </div>
  </div>
</template>

<script>
import { api } from '../classes/Api';

// {
//     "error": "Total required survival resources is too low! Consider stocking more food and water!",
//     "status": 404
// }

// {
//     "totalSurvivalDays": 1,
//     "status": 200,
//     "survivalAlertType": "warning" | "info" "success"
// }

/**
 * 
 */

export default {
  data: () => ({
    // alertClassName: enum [success, info, warning, danger]
    activeAlert: null,
  }),
  async mounted() {
    
    this.activeAlert = await api.getSurvival();
    console.log(this.activeAlert);
  },
}
</script>