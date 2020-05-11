/*eslint-disable*/

import axios from 'axios';

const port = `5000`;
const host = `http://localhost:${port}`;
const api_ver = 0.1;
const apiRoot = `/api/${api_ver}/app/`;

const axiosInstance = axios.create({
  baseURL: `${host}${apiRoot}`,
});

class API {
  constructor(){}

  async get(collection) {
    return axiosInstance.get(`list/${collection}`);
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
    
    // name: "1qrw"
    // description: "4"
    // stock-category: "food"
    // stock-amount: 2
    // cost-per-package: 6
    // calories-per-package: 12
    const params = {
      'name': stock['name'],
      'description': stock['description'],
      // 'stockCategory': stock['stockCategory'],
      'stockCategory': stock['stockCategory'],
      // 'stock-amount': stock['amount'],
      'stockAmount': stock['amount'],
      'costPerPackage': stock['costPerPackage'],
      // 'cost-per-package': stock['costPerPackage'],
    }

    if(stock['stockCategory'] === 'food') {
      params['caloriesPerPackage'] = stock['caloriesPerPackage'];
      // params['calories-per-package'] = stock['caloriesPerPackage'];
    } else if (stock['stockCategory'] === 'water') {
      params['millilitrePerPackage'] = stock['millilitrePerPackage'];
    }
    
    let id = stock.id;

    console.log(params, id);

    return axiosInstance.get(`list/update/${id}`, {
      params,
    })
  }
}

export const api = new API();
