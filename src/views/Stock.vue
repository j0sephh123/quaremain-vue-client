<template>
  <div v-if="stock" class="container mt-3">
    <h3>A page for a single stock...</h3>
    <div class="flex">
      <div class="box">
        <i :class="'icon fa-2x ' + iconsMap[$router.currentRoute.params.stock]"></i>
        
        <h3>{{stock.name}}</h3>
        <div>{{stock.description}}</div>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
          <div class="controls">
            <div>amount</div>
            <div>1</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
      </div>
      <div class="box">2</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  data: () => ({
    iconsMap: {
      food: "fas fa-pizza-slice",
      water: "fas fa-water",
      medicine: "fas fa-pills",
      weapon: "fas fa-bolt"
    },
  }),
  mounted() {
    const { stock, id } = this.$router.currentRoute.params;
    this.$store.dispatch("getOneStock", { stock, id });
  },
  computed: {
    ...mapGetters({
      stock: "stock"
    })
  },
  updated() {
    console.log(this.stock);
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}
.box {
  width: 40%;
  padding: .4rem;
  margin: .4rem;
  border: .05rem solid #dadee4;
  border-radius: .1rem;
  text-align: center;
}
.icon {
  background-color: var(--info);
  border-radius: 50%;
  padding: 25px;
  margin: 5px;
  color: white;
}
</style>