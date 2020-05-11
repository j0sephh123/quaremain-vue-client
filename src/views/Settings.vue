<template>
  <div class="w-100 text-center mt-3">
    <div class="mb-3">
      <button class="btn btn-dark">Reset Database</button>
    </div>
    <h3>Color themes</h3>
    <h4>https://bootswatch.com/</h4>
    <div class="w-75 m-auto">
      <button
        @click="themePage(theme)"
        :class="'font-weight-bold btn btn-block ' + theme"
        v-for="theme in themes"
        :key="theme"
      >{{ theme }}
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
  methods: {
    themePage(theme) {
      window.open(`https://bootswatch.com/${theme}/`, "_blank")
    }
  }
}
</script>

<style scoped>
.minty {
  background-color: var(--primary);
}
.lux {
  color: white;
  background-color: #1a1a1a;
  border-radius: 0;
}
.pulse {
  background-color: #593196;
  border-radius: 0;
}
</style>