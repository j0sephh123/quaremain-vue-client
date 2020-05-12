/* eslint-disable */
class Stock {
  constructor(stock) {
    this.name = stock.name;
    this.description = stock.description;
    this.stockAmount = stock.stockAmount;
    this.costPerPackage = stock.costPerPackage;
    this.stockCategory = stock.stockCategory;
  }
}

class Water extends Stock {
  constructor(stock) {
    super(stock);

    this.millilitrePerPackage = stock.millilitrePerPackage;
  }
}

class Food extends Stock {
  constructor(stock) {
    super(stock);

    this.caloriesPerPackage = stock.caloriesPerPackage;
  }
}

export const stockFactory = (type, fields) => {
  fields['stockCategory'] = type;
  let stock; 
  if(type === 'food') {
    stock = new Food(fields);
  } else if (type === 'water') {
    stock = new Water(fields);
  } else {
    stock = new Stock(fields)
  }
  return stock;
}