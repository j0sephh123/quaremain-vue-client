<template>
  <div style="display: flex;">
    <sidebar-component></sidebar-component>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
    SidebarComponent: () => import ('./components/Sidebar'),
  }
}
</script>