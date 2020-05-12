/*eslint-disable*/
import axios from 'axios';
import router from '../router'

const port = `5000`;
const host = `http://localhost:${port}`;
const apiRoot = `/api/app/`;

const axiosInstance = axios.create({
  baseURL: `${host}${apiRoot}`,
});

class API {
  constructor(){}

  async get(collection) {
    return axiosInstance.get(`list/${collection}`);
  }

  async getOne(collection, id) {
    let { stock } = (await axiosInstance.get(`list/show/${id}?stockCategory=${collection}`)).data;
    if(!stock) return false;
    
    let item = stock[0];

    return item;
  }

  async remove(id, collection) {
    return axiosInstance.get(`list/delete/${id}?stockCategory=${collection}`);
  }

  async create(submitData) {
    return axiosInstance.get(`list/create`, {
      params: submitData,
    });
  }

  async update(stock) {

    const params = {
      'name': stock['name'],
      'description': stock['description'],
      'stockCategory': stock['stockCategory'],
      'stockAmount': stock['amount'],
      'costPerPackage': stock['costPerPackage'],
    }

    if(stock['stockCategory'] === 'food') {
      params['caloriesPerPackage'] = stock['caloriesPerPackage'];
      // params['calories-per-package'] = stock['caloriesPerPackage'];
    } else if (stock['stockCategory'] === 'water') {
      params['millilitrePerPackage'] = stock['millilitrePerPackage'];
    }

    return axiosInstance.get(`list/update/${stock.id}`, {
      params,
    })
  }

  async resetDatabase() {

    let { status } = (await axiosInstance.get("list/reset-database")).data;
    if(status === 200) {
      router.push({
        name: "App"
      })
    } else {
      console.log('error');
    }
  }
}

export const api = new API();