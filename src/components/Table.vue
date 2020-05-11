<template>
  <table class="table table-bordered">
    <thead class="thead-light">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Amount</th>
        <th>Total Cost</th>
        <th v-if="$store.state.activeTab === 'water'">Total ML (Millilitre)</th>
        <th v-if="$store.state.activeTab === 'food'">Total Potential Calories</th>
        <th>Actions</th>
      </tr>

      <template v-for="stock in stocks">
        <table-row
          :key="stock.id"
          :stock="stock"
        ></table-row>
      </template>
      
    </thead>
  </table>
</template>

<script>
export default {
  components: {
    TableRow: () => import('./TableRow'),
  },
  data: () => ({
    initialLoad: false,
  }),
  props: {
    updateStockItem: {
      type: Function
    },
    removeStockItem: {
      type: Function,
    },
    stocks: {
      type: Array,
    },
  },
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
  methods: {


  },
  mounted() {
    // console.log(this.stocks);
    // this.get(this.$store.state.activeTab)
  },
  updated() {
  }
};
</script>

<style>
</style>