<template>
  <div class="container mt-3">
    <chart-component></chart-component>
  </div>
</template>

<script>

export default {
  components: {
    ChartComponent: () => import ('../components/Chart'),
  },
}
</script>