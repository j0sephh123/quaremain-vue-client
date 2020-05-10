<template>
  <tr>
    <td>{{ stock.id }}</td>
    <td>
      
      <span 
        v-if="!updating"
        @click="nameClick()"
        class="name">{{ stock.name }}
      </span>

      <input 
        v-if="updating"
        type="text"
        v-model="nameVal"
      />
      
    </td>
    <td>{{ stock.description }}</td>
    <td>{{ stock.amount }}</td>
    <td>{{ (stock.costPerPackage).toFixed(2) }}</td>
    <td v-if="this.$store.state.activeTab === 'food'">{{ stock.caloriesPerPackage }}</td>
    <td v-if="this.$store.state.activeTab === 'water'">{{ stock.millilitrePerPackage }}ML</td>
    <td class="actions">
      <i @click="updateClick()" class="fas fa-edit fa-2x"></i>
      <i @click="$store.dispatch('removeStock', stock.id)" class="fas fa-trash-alt fa-2x"></i>
    </td>
  </tr>
</template>

<script>
export default {
  data: () => ({
    nameVal: "",
    updating: false,
  }),
  props: [
    'stock',
  ],
  methods: {
    nameClick() {
      this.updating = !this.updating;
      this.nameVal = this.stock.name;
    },
    updateClick() {
      if(!this.updating) return;
      let updateObj = {
        stock: this.stock, 
        name: this.nameVal,
      }

      this.updating = false;
      this.nameVal = "";

      this.$store.dispatch('updateStock', updateObj)
    }
  },
  mounted() {
    // console.log(this.stock);
  }
}
</script>

<style scoped>
.name {
  font-weight: 600;
  cursor: pointer;
}
.name:hover {
  text-decoration: underline;
}
</style>