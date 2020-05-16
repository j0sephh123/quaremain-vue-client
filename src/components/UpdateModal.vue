<template>
  <div
    v-on:keydown.esc="closeModal()"
    v-on:keydown.enter="$store.dispatch('update', updateVal)"
    class="modal-mask"
  >
    <div @click.self="closeModal()" class="modal-wrapper">
      <div class="modal-container">
        <h3 class="text-center">Update stock</h3>
        <div class="form-group">
          <label class="bold" :for="updateObject.field">{{updateObject.field}}</label>
          <input
            autofocus
            :id="updateObject.field"
            :type="updateObject.inputType"
            class="form-control"
            v-model="updateVal"
          />
        </div>
        <div class="row">
          <div class="col-6">
            <button
              @click="$store.dispatch('update', updateVal)"
              class="btn btn-secondary btn-block"
            >Update</button>
          </div>
          <div class="col-6">
            <button @click="closeModal()" class="btn btn-primary btn-block">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    updateVal: ""
  }),
  methods: {
    closeModal() {
      this.$store.commit("setUpdateObject", null);
    }
  },
  computed: {
    ...mapGetters({
      updateObject: "updateObject"
    }),
  },
  mounted() {
    this.updateVal = this.updateObject.stock[this.updateObject.field];
  }
};
</script>