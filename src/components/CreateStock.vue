<template>
  <div>
    <div class="form-group form-row">
      <div class="col-9">
        <label for="name" class="bold">Name</label>
        <input 
          v-model="fields['name']" 
          class="form-control" 
          type="text" 
          placeholder="name" 
        />
      </div>
      <div class="description_toggle col-3">
        <div class="custom-control custom-switch">
          <input 
            id="toggleDecription"
            type="checkbox" 
            @change="toggle()"
            class="custom-control-input" 
            :checked="checked">
          <label 
            for="toggleDecription"
            class="bold custom-control-label">Toggle description</label>
        </div>
      </div>
    </div>

    <div v-if="showDescr" class="form-group">
      <div class="p-0 col-12">
        <label class="bold" for="description">Decription</label>
        <textarea 
          v-model="fields['description']"
          placeholder="description"
          class="form-control" 
          cols="30" 
          rows="3"></textarea>
      </div>
    </div>


    <div class="form-group form-row">
      <div :class="'col-' + colWidth">
        <label class="bold">Cost per Package</label>
        <input
          v-model="fields['costPerPackage']"
          placeholder="cost per package"
          class="form-control"
          type="number"
          step="0.01"
          min="0"
        />
      </div>
      <div :class="'col-' + colWidth">
        <label class="bold">Amount</label>
        <input
          v-model="fields['stockAmount']"
          placeholder="amount"
          class="form-control"
          type="number"
          name="amount"
        />
      </div>

      <div v-if="activeTab === 'food'" :class="'col-' + colWidth">
        <label class="bold">Calories per package</label>
        <input
          v-model="fields['caloriesPerPackage']"
          placeholder="Calories per package"
          class="form-control"
          type="number"
        />
      </div>
      <div v-if="activeTab === 'water'" :class="'col-' + colWidth">
        <label class="bold">Millilitre per package</label>
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
      "name"                   : "",
      "stockAmount"            : "",
      "costPerPackage"         : "",
      "description"            : "",
      "millilitrePerPackage"   : "",
      "caloriesPerPackage"     : "",
    },
    checked: false,
    showDescr: false,
  }),
  methods: {
    toggle() {
      console.log('hi');
      this.checked = !this.checked;
      this.showDescr = !this.showDescr;
    }
  },
  computed: {
    colWidth() {
      let width = 6;
      if(this.activeTab === "food" || this.activeTab === "water") {
        width = 4;
      } 
      
      return width;
    }
  },
};
</script>

<style scoped>
.description_toggle {
  display: flex;
  align-items: flex-end;
}
.description_toggle .custom-control {
  padding-bottom: 6px;
}
.description_toggle label:hover {
  color: var(--primary);
  cursor: pointer;
}
</style>