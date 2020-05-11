<template>
  <div>
    <nav-component></nav-component>
    <div style="display: flex;">
      <sidebar-component></sidebar-component>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SidebarComponent: () => import ('./components/Sidebar'),
    NavComponent: () => import ('./components/Nav'),
  }
}
</script>