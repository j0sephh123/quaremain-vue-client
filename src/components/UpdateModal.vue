<template>
  <div 
    v-on:keydown.esc="closeModal()"
    v-on:keydown.enter="$store.dispatch('update', updateVal)"
    class="modal-mask">
    <div 
      @click.self="closeModal()"
      class="modal-wrapper">
      <div class="modal-container">
        <h3 class="text-center">Update stock</h3>
        <div class="form-group">
          <label 
            class="bold"
            :for="updateObject.field">{{updateObject.field}}</label>
          <input 
            autofocus
            :id="updateObject.field"
            :type="updateObject.inputType"
            class="form-control"
            v-model="updateVal"
            >
        </div>
        <div class="row">
          <div class="col-6">
            <button 
              @click="$store.dispatch('update', updateVal)"
              class="btn btn-secondary btn-block" 
              >
              Update
            </button>
          </div>
          <div class="col-6">
            <button 
              @click="closeModal()"
              class="btn btn-primary btn-block" 
              >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    updateVal: "",
  }),
  methods: {
    closeModal() {
      console.log('remove modal');
      this.$store.commit('setUpdateObject', null)
    },
  },
  computed: {
    ...mapGetters({
      updateObject: 'updateObject',
    }),
  },
  mounted() {
    this.updateVal = this.updateObject.stock[this.updateObject.field]
  },
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}
</style>