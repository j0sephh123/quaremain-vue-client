<template>
  <div style="display: flex;">
    
    <sidebar-component></sidebar-component>
    <div class="experimental">

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
              @click="form.show = !form.show"
              id="create" 
              class="btn btn-secondary"
              >Create {{ activeStock }}
            </button>
          </div>
        </div>

        <div v-if="form.show">
          <div class="form-group form-row">
            <div class="col-6">
              <input 
                v-model="fields['name']"
                class="form-control" 
                type="text" 
                placeholder="name" />
            </div>
            <div class="col-6">
              <input 
                v-model="fields['description']"
                class="form-control" 
                type="text" 
                placeholder="description" />
            </div>
          </div>
          <div class="form-group form-row">
            <div class="col-4">
              <input 
                v-model="fields['cost-per-package']"
                placeholder="cost per package"
                class="form-control"
                type="number" 
                step="0.01" 
                min="0" />
            </div>
            <div class="col-4">
              <input 
                v-model="fields['stock-amount']"
                placeholder="amount"
                class="form-control"
                type="number" 
                name="amount" />
            </div>

            <div 
              v-if="activeStock === 'food'" 
              class="col-4">
              <input 
                v-model="fields['calories-per-package']"
                placeholder="Calories per package"
                class="form-control"
                type="number" />
            </div>
            <div 
              v-if="activeStock === 'water'" 
              class="col-4">
              <input 
                v-model="fields['millilitre-per-package']"
                placeholder="Millilitre per package"
                class="form-control"
                type="number" />
            </div>



          </div>
          <div class="form-group">
            <button 
              @click="submit()"
              class="btn btn-secondary btn-block"
              >Submit
            </button>
          </div>
        </div>

        <hr >

        <ul class="nav nav-tabs">
          <li 
            :key="category"
            v-for="category in categories"
            class="nav-item">
            <a 
              @click="changeCategory(category)"
              :class="'nav-link ' + (activeStock === category ? 'active' : '')">
              {{ category }}
            </a>
          </li>
        </ul>
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Total Cost</th>
              <th v-if="activeStock === 'water'">Total ML (Millilitre)</th>
              <th v-if="activeStock === 'food'">Total Potential Calories</th>
              <th>Actions</th>
            </tr>
            <template v-if="loaded">
              <tr
                :key="stock.id"
                v-for="stock in activeStocks"
              >
                <td>{{ stock.id }}</td>
                <td>{{ stock.name }}</td>
                <td>{{ stock.description }}</td>
                <td>{{ stock.amount }}</td>
                <td>\${{ (stock.costPerPackage).toFixed(2) }}</td>
                <td v-if="activeStock === 'food'">{{ stock.caloriesPerPackage }}</td>
                <td v-if="activeStock === 'water'">{{ stock.millilitrePerPackage }}ML</td>
                <td class="actions">
                  <i 
                    @click="removeStockItem(stock.id, activeStock)"
                    class="fas fa-trash-alt"></i>
                </td>
              </tr>
            </template>
          </thead>
        </table>
      </div>
  </div>
</template>

<script>
import SidebarComponent from './components/Sidebar'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    SidebarComponent
  },
  data() {
    return {
      config: {
        api: {
        ver: 0.1,
        },
        startStock: "food",
        initialFields: {
          "name"                   : "qwr",
          "stock-amount"           : "2",
          "cost-per-package"       : "3",
          "description"            : "4",
          "millilitre-per-package" : "5",
          "calories-per-package"   : "6",
        }
      },
      form: {
        show: true,
      },
      fields: {
        "name"                   : "qrw",
        "stock-amount"           : "2",
        "cost-per-package"       : "3",
        "description"            : "4",
        "millilitre-per-package" : "5",
        "calories-per-package"   : "6",
      },
      search: "",
      loaded: false,
      categories: ["food", "medicine", "water", "weapon"],
      activeStock: "food",
      stocks: {},
    }
  },
  mounted() {
    this.get(this.config.startStock);
  },
  updated() {
    // console.log(this.stocks);
  },
  computed: {
    activeStocks() {
      if(this.search.length > 0) {
        console.log('here');
        return this.stocks[this.activeStock].filter(item => (
          item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        ));
      } 
      return this.stocks[this.activeStock];
    }
  },
  methods: {
    submit() {
      const submitData = {
        "stock-category"         : this.activeStock,
        "name"                   : this.fields['name'],
        "stock-amount"           : this.fields['stock-amount'],
        "cost-per-package"       : this.fields['cost-per-package'],
        "description"            : this.fields['description'],
      }

      if(this.activeStock === "water") {
        submitData["millilitre-per-package"] = this.fields["millilitre-per-package"];
      }
      if(this.activeStock === "food") {
        submitData["calories-per-package"] = this.fields["calories-per-package"];
      }

      // fetch(`http://localhost:5000/api/${this.config.api.ver}/app/list/create`, {
      //   method: "POST",
      //   headers: new Headers(),
      //   body: JSON.stringify(submitData)
      // }).then(resp => {
      //   return resp.json()
      //   // if(resp.status === 200) {
      //   //   console.log(resp);
      //   //   this.fields = this.config.initialFields;
      //   //   // this.form.show = false;
      //   //   this.loaded = false;
      //   //   this.get(this.activeStock)
      //   // } else {
      //   //   console.log('submit error');
      //   // }
      // }).then(res => {
      //   console.log(res);
      // })
      
      axios.get(`http://localhost:5000/api/${this.config.api.ver}/app/list/create`, {
        data: submitData
      })
      .then(r => {
        console.log(r);
      })

    },
    removeStockItem(id, collection) {
      axios(`http://localhost:5000/api/${this.config.api.ver}/app/list/delete/${id}?stock-category=${collection}`)
        .then(data => {
          console.log(data);
          this.get(collection);
          this.loaded = false;
        })
        .catch(error => {
          console.log(error);
        })
    },
    changeCategory(category) {
      this.activeStock = category;
      this.get(category);
      this.loaded = false;
      this.search = "";
    },
    get(collection) {
      console.log('this.get');
      axios
        .get(`http://localhost:5000/api/${this.config.api.ver}/app/list/${collection}`)
        .then(data => {
          console.log(data);
          this.loaded = true;
          this.stocks[collection] = data.data.stocks;
        })
      // fetch(`http://localhost:5000/api/${this.config.api.ver}/app/list/${collection}`)
      //   .then(result => result.json())
      //   .then(data => {
      //     console.log(data);
      //     if(data.status === 200) {
      //       this.loaded = true;
      //       this.stocks[collection] = data.stocks;
      //     } else {
      //       console.log('get error');
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
    }
  }
}
</script>

<style>
#app {
  
}
</style>
