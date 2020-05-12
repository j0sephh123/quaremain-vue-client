/* eslint-disable */

export class InputParser {
  constructor() {}

  /**
   * stock-category: [food, water, medicine, weapon]; required; all
   * name: string; required; all
   * stock-amount: number; required; all
   * cost-per-package: number; required; all
   * description: string; not required; all
   * 
   * millilitre-per-package: number; required; water
   * calories-per-package: number; required; food
   */
  static submitData(fields, stock) {
    const data = {
      "name"                   : fields['name'],
      "description"            : fields['description'],
      "stockCategory"         : stock,
      "stockAmount"           : fields['stockAmount'],
      "costPerPackage"       : fields['costPerPackage'],
      // "stock-category"         : stock,
      // "stock-amount"           : fields['stock-amount'],
      // "cost-per-package"       : fields['cost-per-package'],
    }

    if(stock === "water") {
      // data["millilitre-per-package"] = fields["millilitre-per-package"];
      data["millilitrePerPackage"] = fields["millilitrePerPackage"];
    }
    if(stock === "food") {
      // data["calories-per-package"] = fields["calories-per-package"];
      data["caloriesPerPackage"] = fields["caloriesPerPackage"];
    }

    return data;
  }

}