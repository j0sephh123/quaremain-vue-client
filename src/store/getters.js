export const getters = {
  activeTab: ({ activeTab }) => activeTab,
  showForm: ({ showForm }) => showForm,
  stocks: ({ stocks, search, activeTab }) => {
    if (search.length > 0) {
      return stocks[activeTab].filter((item) => {
        if (item.name.toLowerCase().indexOf(search.toLowerCase()) > -1) {
          return true;
        }
        return false;
      });
    }

    return stocks[activeTab];
  },
  search: ({ search }) => search,
  updateObject: ({ updateObject }) => {
    // console.log('updateObject getter, we want to see this message');
    return updateObject;
  },
  errors: ({ errors }) => errors,
  stock: ({ oneStock }) => oneStock,
  sidebarStructure: ({ sidebar }) => sidebar.structure,
};
