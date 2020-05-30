<script>
/* eslint-disable */
import { Bar } from 'vue-chartjs';
import { api } from '../classes/Api';

export default {
  extends: Bar,
  async mounted () {
    const stocksObject = await api.getAllStocks();

    const labels = {'food': 0, 'water': 0, 'medicine': 0, 'weapon': 0};

    for(const stockName in stocksObject) {
      const stockValue = stocksObject[stockName];
      const sum = stockValue.reduce((initialSum, value) => {
        return initialSum += +value.costPerPackage;
      }, 0);
      labels[stockName] = sum;
    }

    this.renderChart({
      labels: Object.keys(labels),
      datasets: [
        {
          label: 'Money spent',
          backgroundColor: 'lightpink',
          data: Object.values(labels),
        },
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
</script>