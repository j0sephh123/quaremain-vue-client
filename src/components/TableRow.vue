<template>
  <tr>
    <td>{{ stock.id }}</td>
    <td>{{ stock.name }}</td>
    <td>{{ stock.description }}</td>
    <td>{{ stock.amount }}</td>
    <td>{{ (stock.costPerPackage).toFixed(2) }}</td>
    <td v-if="this.$store.state.activeTab === 'food'">{{ stock.caloriesPerPackage }}</td>
    <td v-if="this.$store.state.activeTab === 'water'">{{ stock.millilitrePerPackage }}ML</td>
    <td class="actions">
      <i @click="updateStockItem(stock, this.$store.state.activeTab)" class="fas fa-edit fa-2x"></i>
      <i @click="removeStockItem(stock.id, this.$store.state.activeTab)" class="fas fa-trash-alt fa-2x"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: [
    'stock',
    'updateStockItem',
    'removeStockItem',
  ],
}
</script>

<style>

</style>