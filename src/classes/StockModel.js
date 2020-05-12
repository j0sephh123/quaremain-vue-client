/* eslint-disable */

class Stock {
  constructor({name, description, stockAmount, costPerPackage}) {
    this.name = name;
    this.description = description;
    this.stockAmount = stockAmount;
    this.costPerPackage = costPerPackage;
  }
}

class Water extends Stock {
  constructor({name, description, amount, costPerPackage, millilitrePerPackage}) {
    super({name, description, amount, costPerPackage})
    this.millilitrePerPackage = millilitrePerPackage;
  }
}

class Food extends Stock {
  constructor({name, description, amount, costPerPackage, caloriesPerPackage}) {
    super({name, description, amount, costPerPackage})
    this.caloriesPerPackage = caloriesPerPackage;
  }
}

export const stockFactory = (type, fields) => {
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

// export class StockModel {
//   constructor() {}

//   /**
//    * stockCategory: [food, water, medicine, weapon]; required; all
//    * name: string; required; all
//    * amount: number; required; all
//    * costPerPackage: number; required; all
//    * description: string; not required; all
//    *
//    * millilitrePerPackage: number; required; water
//    * caloriesPerPackage: number; required; food
//    */
//   static submitData(fields, stock) {
//     const data = {
//       name: fields["name"],
//       description: fields["description"],
//       stockCategory: stock,
//       stockAmount: fields["stockAmount"],
//       costPerPackage: fields["costPerPackage"],
//     };

//     if (stock === "water") {
//       data["millilitrePerPackage"] = fields["millilitrePerPackage"];
//     }
//     if (stock === "food") {
//       data["caloriesPerPackage"] = fields["caloriesPerPackage"];
//     }

//     return data;
//   }
// }
