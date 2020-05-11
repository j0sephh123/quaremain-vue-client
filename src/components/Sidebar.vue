<template>
  <div :class="'sidebar ' + (toggled ? 'toggled' : '')">
    <li @click="toggleSidebar()" class="list-group-item box">
      <i class="fas fa-bars fa-2x"></i>
    </li>
    <ul class="list-group">
      <div class="parent_box" v-for="parent in structure" :key="parent.id">
        <router-link 
          exact
          active-class="active"
          tag="li"
          :to="parent.slug"
          :class="dynamicParentClasses(parent.id)">
          <div>
            <i :class="parent.icon + ' fa-lg'"></i>
            <a v-if="!toggled" class="parent_name">{{ parent.name }}</a>
          </div>
          <i
            v-if="!toggled"
            :class="'fa fa-lg fa-chevron-right ' + (parent.id === activeParent ? 'rotate' : '')"
          ></i>
        </router-link>
      </div>
    </ul>
  </div>
</template>

<script>
const structure = [
  {
    id: 1,
    name: "Quaremain",
    icon: "fas fa-atom",
    slug: "/",
  },
  {
    id: 2,
    name: "About",
    icon: "fas fa-info-circle",
    slug: "/about",
  },
  {
    id: 3,
    name: "Settings",
    icon: "fas fa-cog",
    slug: "/settings",
  },
  {
    id: 4,
    name: "Survival days",
    icon: "fas fa-calendar-alt",
    slug: "/survival",
  },

  // <i class="fas fa-cog"></i>
  // <i class="fas fa-calendar-alt"></i>


];
//console.log(structure);

export default {
  name: "Sidebar",
  props: {},
  data() {
    return {
      toggled: true,
      activeParent: null,
      structure,
      parentClasses: [
        "list-group-item",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "flex-row",
        "flex-nowrap"
      ]
    };
  },
  methods: {
    dynamicParentClasses(parentID) {
      return parentID === this.activeParent
        ? [...this.parentClasses, "active"]
        : [...this.parentClasses];
    },
    toggleSidebar() {
      this.toggled = !this.toggled;
    }
  },
  mounted() {
    // const path = window.location.pathname;

    // const activeParent = structure.find(parent =>
    //   parent.children.find(child => child.slug === path)
    // );
    // if (activeParent) {
    //   this.parentClick(activeParent.id);
    // }

    // // this assures we have border-left on the active child
    // this.slug = path;
  },
  updated() {
    //console.log('updated', {slug: this.slug})
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
