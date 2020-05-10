<template>
  <input
    v-model="model"
    placeholder="cost per package"
    class="form-control"
    type="number"
    step="0.01"
    min="0"
  />
</template>

<script>
export default {
  props: [
    'model',
  ]
}
</script>

<style>

</style>