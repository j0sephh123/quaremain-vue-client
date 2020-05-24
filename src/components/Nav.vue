<template>
  <nav class="custom_nav">
    <router-link
      class="brand"
      to="/"
      >Quaremain
    </router-link>
    <div 
      v-if="this.currentRouteName === 'App'"
      class="controls">
      <div class="search_box ml-3">
        <i class="fas fa-search fa-lg"></i>
        <input 
          id="search" 
          v-model="search" 
          class="form-control" 
          placeholder="Search">
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
  data: () => ({
    currentRouteName: null,
  }),
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
  mounted() {
    this.currentRouteName = this.$router.currentRoute.name
  },
  updated() {
    // console.log(this.currentRouteName);
  },
  watch: {
    $route (to){
      this.currentRouteName = to.name;
    },
  },
}
</script>