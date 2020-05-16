<template>
  <div :class="'sidebar ' + (toggled ? 'toggled' : '')">
    <li @click="toggleSidebar()" class="list-group-item box">
      <i class="fas fa-bars fa-2x"></i>
    </li>
    <ul class="list-group">
      <div class="parent_box" v-for="parent in sidebarItems" :key="parent.id">
        <router-link
          exact
          active-class="active"
          tag="li"
          :to="parent.slug"
          :class="dynamicParentClasses(parent.id)"
        >
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
import { mapGetters } from "vuex";

export default {
  name: "Sidebar",
  props: {},
  data() {
    return {
      toggled: true,
      activeParent: null,
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
  computed: {
    ...mapGetters({
      sidebarItems: "sidebarItems"
    })
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
    // console.log(this.sidebarItems);
  },
  updated() {}
};
</script>