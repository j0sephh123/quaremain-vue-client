<template>
  <div class="mt-2">
    <div class="form-group form-row">
      <div class="col-9">
        <label for="name" class="bold">Name</label>
        <input v-model="fields['name']" class="form-control" type="text" placeholder="name" />
      </div>
      <div class="description_toggle col-3">
        <div class="custom-control custom-switch">
          <input
            id="toggleDecription"
            type="checkbox"
            @change="toggle()"
            class="custom-control-input"
            :showDescription="showDescription"
          />
          <label for="toggleDecription" class="bold custom-control-label">Toggle description</label>
        </div>
      </div>
    </div>

    <div v-if="showDescription" class="form-group">
      <div class="p-0 col-12">
        <label class="bold" for="description">Decription</label>
        <textarea
          v-model="fields['description']"
          placeholder="description"
          class="form-control"
          cols="30"
          rows="3"
        ></textarea>
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
          name="stockAmount"
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
      <button :a="errors" @click="create()" class="bold btn btn-secondary btn-block">Submit</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    activeTab: String
  },
  data: () => ({
    fields: {
      name: "",
      stockAmount: "",
      costPerPackage: "",
      description: "",
      millilitrePerPackage: "",
      caloriesPerPackage: ""
    },
    showDescription: false
  }),
  methods: {
    toggle() {
      this.showDescription = !this.showDescription;
    },
    create() {
      this.$store.dispatch("submit", this.fields);

      // reset fields
      for (let key in this.fields) {
        this.fields[key] = "";
      }
    }
  },
  mounted() {
    console.log(this.errors);
  },
  computed: {
    ...mapGetters({
      errors: "errors"
    }),
    colWidth() {
      let foodOrWater = this.activeTab === "food" || this.activeTab === "water";

      return foodOrWater ? 4 : 6;
    }
  },
  updated() {
    if (this.errors) {
      this.$swal({
        title: this.errors,
        icon: "error"
      }).then(() => {
        this.$store.commit("setError", null);
      });
    }
  }
};
</script>