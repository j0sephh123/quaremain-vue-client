import { shallowMount, createLocalVue } from "@vue/test-utils";
import Sidebar from "../../components/Sidebar.vue";
import store from "../../store";
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe("Sidebar", () => {
  const wrapper = shallowMount(Sidebar, {
    stubs: ["router-link"],
    store,
    router,
  });

  

  // get sidebarItems from getters
  // find out how many .parent_box we have
  let firstParentBox = wrapper.find(".parent_box");
  let allParentBoxes = wrapper.findAll(".parent_box");
  let sidebarItems = store.getters.sidebarItems;

  test("sidebarItemsLength to be equal to the length of all .parent_box", () => {
    expect(
      allParentBoxes.length
    )
    .toBe(
      sidebarItems.length
    );
  });

  test("correct icon renders", () => {
    // checking for first item icon
    expect(
      sidebarItems[0].icon.split(" ")[1]
    )
    .toBe(
      firstParentBox.find("i").classes()[1]
    );
  });

  test("active slug corresponds to active sidebar item", () => {
    let { path } = wrapper.vm.$router.currentRoute;

    expect(
      wrapper.get(`.parent_box router-link-stub`).attributes('to')
    )
    .toBe(
      path
    );

  });

  test("sidebar toggles on click", async () => {
    let beforeClick = wrapper.vm.$data.toggled;
    
    await wrapper.get(".fa-bars").trigger('click');

    let afterClick = wrapper.vm.$data.toggled;
    
    expect(beforeClick).toBe(!afterClick);
  });
});
