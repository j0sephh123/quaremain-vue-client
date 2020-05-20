<template>
  <div class="app">
    <div class="experimental container pt-2 px-5 ml-2">

      <template v-if="showForm">
        <create-stock :activeTab="activeTab"></create-stock>
      </template>

      <div class="mt-3">
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
      </div>

      <table-component
        :stocks="stocks"
      ></table-component>
    </div>

    <!-- modal testing -->
    <template v-if="updateObject.active">
      <update-modal></update-modal>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {
    TableComponent: () => import ('./components/Table'),
    CreateStock: () => import('./components/CreateStock'),
    UpdateModal: () => import('./components/UpdateModal'),
  },
  mounted() {
    this.$store.dispatch('loadStocks', "food")
  },
  updated() {
    // console.log('updated');
  },
  computed: {
    ...mapGetters({
      activeTab: 'activeTab',
      showForm: 'showForm',
      stocks: 'stocks',
      updateObject: 'updateObject',
    }),
  },
  methods: {}
}
</script>

