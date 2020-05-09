<template>
  <table class="table table-bordered">
    <thead class="thead-light">
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Total Cost</th>
        <th v-if="this.$store.state.activeTab === 'water'">Total ML (Millilitre)</th>
        <th v-if="this.$store.state.activeTab === 'food'">Total Potential Calories</th>
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
// import { api } from '../classes/Api'

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
    search: {
      type: String,
    },
  },
  computed: {
    // activeStocks() {
    //   if(this.search.length > 0) {
    //     return this.stocks[this.activeStock].filter(item => (
    //       item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
    //     ));
    //   } 
    //   return this.stocks[this.activeStock];
    // }
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