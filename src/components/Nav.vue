<template>
  <nav class="custom_nav">
    <router-link
      class="brand"
      to="/"
      >Quaremain
    </router-link>
    <div class="controls">
      <div class="search_box ml-3">
        <i class="fas fa-search fa-lg"></i>
        <input id="search" v-model="search" class="form-control" placeholder="Search">
      </div>
      <div class="button_container mr-3">
        <button 
          @click="$store.commit('toggleShowForm')"
          class="btn btn-secondary">Create {{$store.state.activeTab}}</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    search: {
      get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.commit('updateSearch', value)
      }
    },
  },
}
</script>

<style scoped>
.custom_nav {
  background-color: var(--primary);
  padding: 8px 16px;
  display: flex;
  font-family: "Montserrat", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
.custom_nav .brand {
  color: white;
  font-size: 1.25rem;
  padding: 5px 0px;
}
.custom_nav .brand:hover {
  text-decoration: none;
}
.custom_nav .controls {
  display: flex;
  justify-content: space-between;
  flex: 1;
  align-items: center;
}

.search_box {
  position: relative;
}
.fa-search {
  position: absolute;
  left: 15px;
  top: 12px;
}
#search {
  width: 50%;
  transition: all 0.4s;
  padding-left: 50px;
}
#search:focus {
  width: 100%;
}
</style>