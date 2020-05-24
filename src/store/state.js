/* eslint-disable */
export const initialUpdateObject = {
  field: null,
  inputType: null,
  stock: null,
  active: false,
};

export const state = {
  errors: null,
  activeTab: "food",
  showForm: false,
  stocks: {},
  search: "",
  updateObject: initialUpdateObject,
  oneStock: null,
  sidebar: {
    structure: [
      {
        id: 1,
        name: "Quaremain",
        icon: "fas fa-atom",
        slug: "/",
      },
      {
        id: 5,
        name: "Charts",
        icon: "fas fa-chart-pie",
        slug: "/charts",
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
    ],
  },
};
