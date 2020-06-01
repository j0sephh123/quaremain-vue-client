/*eslint-disable*/
import axios from "axios";
import router from "../router";
import { statusCode } from '../constants';

const port = `5000`;
const host = `http://localhost:${port}`;
const apiRoot = `/api/app/`;

const axiosInstance = axios.create({
  baseURL: `${host}${apiRoot}`,
});

class API {
  constructor() {}

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  async get(collection) {
    return axiosInstance.get(`list/${collection}`);
  }

  async getOne(collection, id) {
    let { stock } = (
      await axiosInstance.get(`list/show/${id}?stockCategory=${collection}`)
    ).data;
    if (!stock) return false;

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
      name: stock["name"],
      description: stock["description"],
      stockCategory: stock["stockCategory"],
      stockAmount: stock["amount"],
      costPerPackage: stock["costPerPackage"],
    };

    if (stock["stockCategory"] === "food") {
      params["caloriesPerPackage"] = stock["caloriesPerPackage"];
      // params['calories-per-package'] = stock['caloriesPerPackage'];
    } else if (stock["stockCategory"] === "water") {
      params["millilitrePerPackage"] = stock["millilitrePerPackage"];
    }

    return axiosInstance.get(`list/update/${stock.id}`, {
      params,
    });
  }

  async resetDatabase() {
    let { status } = (await axiosInstance.get("list/reset-database")).data;
    if (status === statusCode.success) {
      router.push({
        name: "App",
      });
    } else {
      console.log("error");
    }
  }

  async getSurvival() {
    // 1 day equals to 1500 cal and 2300 ml
    const endpoint = `list/total-survival-days`;
    const survivalResponse = (await axiosInstance.get(endpoint)).data;

    // if we don't have survival days left, we get 404, so assign it a danger class
    if (survivalResponse.status === statusCode.notFound) {
      return ({
        text: `${survivalResponse.error}`,
        alertClassName: `danger`,
      });
    }

    return ({
      text: `${survivalResponse.totalSurvivalDays} survival days left.`,
      alertClassName: survivalResponse.survivalAlertType,
    });
  }

  async getAllStocks() {
    const endpoint = `list/get-all-stocks`;
    const allStocksResponse = (await axiosInstance.get(endpoint)).data;

    if (allStocksResponse.status === statusCode.success) {
      return allStocksResponse.stocks;
    }
    throw new Error("Error in fetching all stocks in api.getAllStocks");
  }
}

export const api = new API();
