<template>
  <tr>
    <td>{{ stock.id }}</td>
    <td>
      <span @click="onUpdateClick('name', 'text')" class="c-hand bold">{{ stock.name }}</span>
    </td>
    <td class="c-hand" @click="onUpdateClick('amount', 'number')">{{ stock.amount }}</td>
    <td>{{ stock.costPerPackage.toFixed(2) }}</td>
    <td v-if="$store.state.activeTab === 'food'">{{ stock.caloriesPerPackage }}</td>
    <td v-if="$store.state.activeTab === 'water'">{{ stock.millilitrePerPackage }}ML</td>
    <td class="actions">
      <router-link
        tag="i"
        class="fas fa-edit fa-lg"
        :to="`/stocks/${$store.state.activeTab}/${stock.id}`"
      ></router-link>

      <i @click="removeStock(stock.id)" class="fas fa-trash-alt fa-lg"></i>
    </td>
  </tr>
</template>

<script>
export default {
  data: () => ({
    nameVal: "",
    updating: false
  }),
  props: ["stock"],
  methods: {
    removeStock(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        cancelButtonColor: '#3085d6',
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#d33",
      }).then(result => {
        if (result.value) {
          this.$store.dispatch("removeStock", id);
        }
      });
    },
    onUpdateClick(field, inputType) {
      let updateObject = {
        field,
        inputType,
        stock: this.stock
      };

      this.$store.commit("setUpdateObject", updateObject);
    },
    nameClick() {
      this.updating = !this.updating;
      this.nameVal = this.stock.name;
    }
  },
};
</script>