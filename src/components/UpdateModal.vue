<template>
  <div 
    class="modal-mask">
    <div 
      @click.self="removeModal()"
      class="modal-wrapper">
      <div class="modal-container">
        <input 

          v-model="updateVal"
          type="text">
        <button 
          @click="$store.dispatch('update', updateVal)"
          class="modal-default-button" 
          >
          Update
        </button>
        <button 
          @click="removeModal()"
          class="modal-default-button" 
          >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    updateVal: "",
  }),
  methods: {
    removeModal() {
      console.log('remove modal');
      this.$store.commit('setUpdateObject', null)
    },
  }
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