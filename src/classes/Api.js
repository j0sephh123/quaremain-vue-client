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

  async getOne(collection, id) {
    let stocks = (await axiosInstance.get(`list/${collection}`)).data.stocks;
    if(!stocks) return false;

    return stocks.find(stock => stock.id === +id);
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
}

export const api = new API();