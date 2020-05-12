<template>
  <div v-if="stock" class="container mt-3">
    <h3>A page for a single stock of type {{stockType}}</h3>
    <div class="flex">

      <!-- left -->
      <div class="box text-center">
        <i :class="'icon fa-2x ' + iconsMap[stockType]"></i>
        <h3
          class="stock_item"
          @click="setCurrentField('name')"
          >{{stock.name}}</h3>
        <div
          class="stock_item"
          @click="setCurrentField('description')"
          >{{stock.description}}</div>
        <hr>
        <div 
          @click="setCurrentField('amount')"
          class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Amount</div>
            <div>{{stock.amount}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div 
          @click="setCurrentField('costPerPackage')"
          class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Cost Per Package</div>
            <div>{{stock.costPerPackage}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div 
          v-if="stockType === 'food'"
          @click="setCurrentField('caloriesPerPackage')"
          class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Calories Per Package</div>
            <div>{{stock.caloriesPerPackage}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div 
          v-if="stockType === 'water'"
          @click="setCurrentField('millilitrePerPackage')"
          class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Millilitre Per Package</div>
            <div>{{stock.millilitrePerPackage}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
      </div>

      <!-- right -->
      <div v-if="currentField" class="box">
        <div>
          <h3>{{currentField}}</h3>
          <div class="form-group">
            <input 
              v-model="inputVal"
              class="form-control"
              :type="inputTypesMap[currentField]"
            >
          </div>
          <button   
            @click="save()"
            class="btn btn-primary btn-block">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";

export default {
  data: () => ({
    inputTypesMap: {
      caloriesPerPackage: "number",
      costPerPackage: "number",
      amount: "number",
      millilitrePerPackage: "number",
      name: "text",
      description: "text",
    },
    iconsMap: {
      food: "fas fa-pizza-slice",
      water: "fas fa-water",
      medicine: "fas fa-pills",
      weapon: "fas fa-bolt"
    },
    inputVal: "",
    stockType: "",
    currentField: null,
  }),
  mounted() {
    const { stock, id } = this.$router.currentRoute.params;
    this.stockType = stock;
    this.$store.dispatch("getOneStock", { stock, id });
  },
  methods: {
    save(){
      this.$store.dispatch('updateStock', {
        stock: this.stock, 
        field: this.currentField,
        value: this.inputVal,
      });
      this.currentField = null;
    },
    setCurrentField(field) {
      this.currentField = field;
      this.inputVal = this.stock[field]
    }
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
  /* justify-content: space-around; */
  align-items: flex-start;
}
.flex_between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box {
  width: 45%;
  padding: .4rem;
  margin: .4rem;
  border: .05rem solid #dadee4;
  border-radius: .1rem;
}
.icon {
  background-color: var(--info);
  border-radius: 50%;
  padding: 25px;
  margin: 5px;
  color: white;
}
.controls {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
}
.stock_item {
  cursor: pointer;
}
.controls_container {
  border-bottom: 1px solid lightgray;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 2px;
}
.controls_container:hover, .stock_item:hover {
  border: 1px solid lightgray;
}
</style>