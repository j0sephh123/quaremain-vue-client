<template>
  <div 
    v-if="stock" 
    style="padding: 0px 50px;"
    class="position-relative container mt-3 ml-5">
    <div class="arrows">
      <i 
        v-if="!isFirst"
        @click="goTo('previous')" 
        class="fas fa-angle-left fa-3x">
      </i>
      <i
        v-if="!isLast"
        @click="goTo('next')" 
        class="fas fa-angle-right fa-3x">
      </i>
    </div>

    <h3>A page for a single stock of type {{stockType}}</h3>
    <div class="flex">
      <!-- left -->
      <div class="box text-center">
        <i :class="'icon fa-2x ' + iconsMap[stockType]"></i>
        <h3 class="stock_item" @click="setCurrentField('name')">{{stock.name}}</h3>
        <div class="stock_item" @click="setCurrentField('description')">{{stock.description}}</div>
        <hr />
        <div @click="setCurrentField('amount')" class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Amount</div>
            <div>{{stock.amount}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div @click="setCurrentField('costPerPackage')" class="flex_between controls_container">
          <div class="controls">
            <div class="bold">Cost Per Package</div>
            <div>{{stock.costPerPackage}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div
          v-if="stockType === 'food'"
          @click="setCurrentField('caloriesPerPackage')"
          class="flex_between controls_container"
        >
          <div class="controls">
            <div class="bold">Calories Per Package</div>
            <div>{{stock.caloriesPerPackage}}</div>
          </div>
          <i class="fas fa-angle-right fa-lg"></i>
        </div>
        <div
          v-if="stockType === 'water'"
          @click="setCurrentField('millilitrePerPackage')"
          class="flex_between controls_container"
        >
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
            <input v-model="inputVal" class="form-control" :type="inputTypesMap[currentField]" />
          </div>
          <button @click="save()" class="btn btn-primary btn-block">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { api } from '../classes/Api';
import { mapGetters } from "vuex";
import router from '../router'

export default {
  data: () => ({
    isFirst: null,
    isLast: null,
    inputTypesMap: {
      caloriesPerPackage: "number",
      costPerPackage: "number",
      amount: "number",
      millilitrePerPackage: "number",
      name: "text",
      description: "text"
    },
    iconsMap: {
      food: "fas fa-pizza-slice",
      water: "fas fa-water",
      medicine: "fas fa-pills",
      weapon: "fas fa-bolt"
    },
    inputVal: "",
    stockType: "",
    currentField: null
  }),
  mounted() {
    this.getCurrentStock({ loadAll: true });
  },
  methods: {
    async getCurrentStock({ loadAll }) {
      const { stock, id } = this.$router.currentRoute.params;
      this.id = id;
      this.stockType = stock;
      this.$store.dispatch("getOneStock", { stock, id });
      
      if(loadAll) {
        this.allStocks = (await api.get(this.stockType)).data.stocks;
      } 
      
      const currentStockIndex = this.allStocks.findIndex(item => item.id == +this.id) 
      this.isFirst = currentStockIndex === 0;
      this.isLast = currentStockIndex === this.allStocks.length - 1;
      this.currentStockIndex = currentStockIndex;
    },
    async goTo(direction) { // next or previous
      let futureStock;
      
      if(direction === "next" && !this.isLast) {
        futureStock = this.allStocks[this.currentStockIndex + 1];
      }

      if(direction === "previous" && !this.isFirst) {
        futureStock = this.allStocks[this.currentStockIndex - 1];
      }

      router.push({ 
        name: "Stock", 
        params: { 
          stock: this.stockType, 
          id: futureStock.id 
        } 
      });
    },
    save() {
      this.$store.dispatch("updateStock", {
        stock: this.stock,
        field: this.currentField,
        value: this.inputVal
      });
      this.currentField = null;
    },
    setCurrentField(field) {
      this.currentField = field;
      this.inputVal = this.stock[field];
    },
  },
  computed: {
    ...mapGetters({
      stock: "stock",
    }),
  },
  updated() {
    console.log("updated");
  },
  watch:{
    $route (to, from){
      this.getCurrentStock({ loadAll: false });
    },
  },
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
  padding: 0.4rem;
  margin: 0.4rem;
  border: 0.05rem solid #dadee4;
  border-radius: 0.1rem;
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
.controls_container:hover,
.stock_item:hover {
  border: 1px solid lightgray;
}
.arrows {
  position: absolute;
  top: 50%;
}
.arrows .fa-angle-right {
  left: 850px;
  position: absolute;
  cursor: pointer;
  padding: 2px 8px;
  transition: all 0.4s;
  background: none;
}
.arrows .fa-angle-left {
  left: -70px;
  position: absolute;
  cursor: pointer;
  padding: 2px 8px;
  transition: all 0.4s;
  background: none;
}
.arrows .fa-angle-left:hover,
.arrows .fa-angle-right:hover {
  background: var(--primary);
  color: white;
  border-radius: 8px;
  padding: 2px 8px;
}
</style>