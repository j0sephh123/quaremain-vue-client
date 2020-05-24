<script>
import { Bar } from 'vue-chartjs'


export default {
  extends: Bar,
  async mounted () {
    
    this.renderChart({
      labels: ['Food', 'Water', 'Medicine', 'Weapon'],
      datasets: [
        {
          label: 'Money spent',
          backgroundColor: 'lightpink',
          data: [140, 25, 33, 55]
        },
      ]
    }, {
      responsive: true,
      maintainAspectRatio: false
    })
  }
}
</script>