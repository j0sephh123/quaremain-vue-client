<template>
  <div>
    <div class="form-group form-row">
      <div class="col-6">
        <input 
          v-model="fields['name']" 
          class="form-control" 
          type="text" 
          placeholder="name" 
        />
      </div>
      <div class="col-6">
        <input
          v-model="fields['description']"
          class="form-control"
          type="text"
          placeholder="description"
        />
      </div>
    </div>



    <div class="form-group form-row">
      <div class="col-4">
        <input
          v-model="fields['costPerPackage']"
          placeholder="cost per package"
          class="form-control"
          type="number"
          step="0.01"
          min="0"
        />
      </div>
      <div class="col-4">
        <input
          v-model="fields['stockAmount']"
          placeholder="amount"
          class="form-control"
          type="number"
          name="amount"
        />
      </div>

      <div v-if="activeTab === 'food'" class="col-4">
        <input
          v-model="fields['caloriesPerPackage']"
          placeholder="Calories per package"
          class="form-control"
          type="number"
        />
      </div>
      <div v-if="activeTab === 'water'" class="col-4">
        <input
          v-model="fields['millilitrePerPackage']"
          placeholder="Millilitre per package"
          class="form-control"
          type="number"
        />
      </div>

    </div>
    <div class="form-group">
      <button 
        @click="$store.dispatch('submit', fields)" 
        class="btn btn-secondary btn-block">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeTab: String,
  },
  data:() => ({
    fields: {
      "name"                   : "qrw",
      "stockAmount"           : "2",
      "costPerPackage"       : "3",
      "description"            : "4",
      "millilitrePerPackage" : "5",
      "caloriesPerPackage"   : "6",
    },
    thirdRow: [
      
    ],
  }),
  computed: {

  },
};
</script>

<style>
</style>