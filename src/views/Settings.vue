<template>
  <div class="w-100 text-center mt-3">
    <div class="mb-3">
      <button 
        @click="$store.dispatch('resetDatabase')"
        class="btn btn-dark">Reset Database</button>
    </div>
    <h3>Color themes</h3>
    <h4>https://bootswatch.com/</h4>
    <div class="w-75 m-auto">
      <button
        @click="current = theme"
        :class="'font-weight-bold btn btn-block ' + theme"
        v-for="theme in themes"
        :key="theme"
      >{{ theme }} {{ theme === current ? "current" : "" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    current: "minty",
    themes: [
      "minty",
      "lux",
      "pulse",
    ],
  }),
}
</script>