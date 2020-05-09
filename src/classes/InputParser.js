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
      "stock-category"         : stock,
      "name"                   : fields['name'],
      "stock-amount"           : fields['stock-amount'],
      "cost-per-package"       : fields['cost-per-package'],
      "description"            : fields['description'],
    }

    if(stock === "water") {
      data["millilitre-per-package"] = fields["millilitre-per-package"];
    }
    if(stock === "food") {
      data["calories-per-package"] = fields["calories-per-package"];
    }

    return data;
  }

}