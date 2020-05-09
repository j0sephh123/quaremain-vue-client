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
    return axiosInstance.get(`list/delete/${id}?stock-category=${collection}`);
  }

  async create(submitData) {
    return axiosInstance.get(`list/create`, {
      params: submitData,
    });
  }


  /** */
  async update(stock) {
    const params = {
      'name': stock['name'],
      'description': stock['description'],
      'stock-category': stock['stock-category'],
      'stock-amount': stock['amount'],
      'cost-per-package': stock['costPerPackage'],
    }

    if(stock['stock-category'] === 'food') {
      params['calories-per-package'] = stock['caloriesPerPackage'];
    } else if (stock['stock-category'] === 'water') {
      params['millilitre-per-package'] = stock['millilitrePerPackage'];
    }
    
    let id = stock.id;

    return axiosInstance.get(`list/update/${id}`, {
      params,
    })
  }
}

export const api = new API();