<template>
  <div style="display: flex;">
    
    <sidebar-component></sidebar-component>
    <div class="experimental container pt-2 px-5 ml-2">

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
              >Create {{ activeTab }}
            </button>
          </div>
        </div>

        <template v-if="form.show">
          <create-stock :activeTab="activeTab"></create-stock>
        </template>

        <hr >

        <ul class="nav nav-tabs">
          <li 
            :key="category"
            v-for="category in categories"
            class="nav-item">
            <a 
              @click="changeCategory(category)"
              :class="'nav-link ' + (activeTab === category ? 'active' : '')">
              {{ category }}
            </a>
          </li>
        </ul>

        <table-component
          :get="get"
          :updateStockItem="updateStockItem"
          :removeStockItem="removeStockItem"
          :stocks="stocks"
          :search="search"
        ></table-component>

      </div>
      {
  </div>
</template>

<script>
import { api } from './classes/Api';
import { mapGetters } from 'vuex'

export default {
  components: {
    SidebarComponent: () => import ('./components/Sidebar'),
    TableComponent: () => import ('./components/Table'),
    CreateStock: () => import('./components/CreateStock'),
  },
  data: () => ({
    form: {
      show: true,
    },
    search: "",
    categories: ["food", "medicine", "water", "weapon"],
    stocks: {},
  }),
  mounted() {
    console.log(this.activeTab);
    api.get('food').then(result => {
      this.stocks[this.activeTab] = result.data;
    });
  },
  updated() {
  },
  computed: {
    ...mapGetters({
      activeTabFromStore: 'activeTab',
    }),
    activeTab: {
      get(){
        return this.activeTabFromStore
      },
      set(newActiveTab) {
        return newActiveTab;
      }
    }
  },
  methods: {
    async get(collection) {
      api.get(collection)
        .then(result => {
          if(result.status === 200) {
            this.stocks[collection] = result.data.stocks;
            // console.log(this.stocks);
          } else {
            console.log('error');
          }
        })
    },
    submit() {
      const submitData = {
        "stock-category"         : this.activeTab,
        "name"                   : this.fields['name'],
        "stock-amount"           : this.fields['stock-amount'],
        "cost-per-package"       : this.fields['cost-per-package'],
        "description"            : this.fields['description'],
      }

      if(this.activeTab === "water") {
        submitData["millilitre-per-package"] = this.fields["millilitre-per-package"];
      }
      if(this.activeTab === "food") {
        submitData["calories-per-package"] = this.fields["calories-per-package"];
      }

      api.create(submitData)
      .then(r => {
        console.log(r);
      })
      .catch(e => {
        console.log(e);
      })

    },
    changeCategory(category) {
      this.activeTab = category;
      this.search = "";
      this.$store.commit("changeCategory", category)
    },
    updateStockItem(stock) {
      let id = 1;
      stock = {
        'stock-category': 'food',
        'stock-amount': 1,
        'cost-per-package': 424,
        'calories-per-package': 393,
        'description': "asd",
        'name': "demo",
      }

      api.update(id, stock).then(data => {
        console.log(data);
      })
    },
    removeStockItem(id, collection) {
      api.remove(id, collection)
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        })
    },
  }
}
</script>