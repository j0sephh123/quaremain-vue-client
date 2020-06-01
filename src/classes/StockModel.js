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


//
// type:
//   [food, water, medicine, weapon]
//
// fields: 
//   caloriesPerPackage: 
//   costPerPackage
//   description
//   millilitrePerPackage
//   name
//   stockAmount
//   stockCategory [food, water, medicine, weapon]
export const stockFactory = (type, fields) => {
  fields['stockCategory'] = type;
  
  if (type === 'food') {
    return new Food(fields);
  } else if (type === 'water') {
    return new Water(fields);
  }

  return new Stock(fields);
}