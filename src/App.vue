<template>
  <div style="display: flex;">
    
    <sidebar-component></sidebar-component>
    <div class="experimental container pt-2 px-5 ml-2">

        <div class="flex my-2">
          <div class="form-group search_box">
            <i class="fas fa-search fa-lg"></i>
            <input  
              v-model="search"
              id="search"
              type="text"
              placeholder="Search"
              class="pl-5 form-control" />
          </div>
          <div class="form-group">
            <button 
              @click="$store.commit('toggleShowForm')"
              id="create" 
              class="btn btn-secondary"
              >Create {{ activeTab }} {{ search }}
            </button>
          </div>
        </div>

        <template v-if="showForm">
          <create-stock :activeTab="activeTab"></create-stock>
        </template>

        <hr >


        <ul class="nav nav-tabs">
          <li 
            :key="category"
            v-for='category in ["food", "medicine", "water", "weapon"]'
            class="nav-item">
            <a 
              @click="$store.dispatch('changeCategory', category)"
              :class="'nav-link ' + (activeTab === category ? 'active' : '')">
              {{ category }}
            </a>
          </li>
        </ul>

        <table-component
          :stocks="stocks"
          :search="search"
        ></table-component>
      </div>
  </div>
</template>

<script>
// import { api } from './classes/Api';
import { mapGetters } from 'vuex';

export default {
  components: {
    SidebarComponent: () => import ('./components/Sidebar'),
    TableComponent: () => import ('./components/Table'),
    CreateStock: () => import('./components/CreateStock'),
  },
  data: () => ({
    
  }),
  mounted() {
    // let result = (await api.get('food')).data;
    this.$store.dispatch('loadStocks', "food")
  },
  updated() {
    // console.log(this.stocks);
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
      showForm: 'showForm',
      stocks: 'stocks',
    }),
    search: {
      get() {
        return this.$store.state.search
      },
      set(value) {
        this.$store.commit('updateSearch', value)
      }
    }
  },
  methods: {
    showAlert() {
      // Use sweetalert2
      this.$swal('Hello Vue world!!!');
    },
  }
}
</script>