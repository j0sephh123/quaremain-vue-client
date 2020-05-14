import { shallowMount } from "@vue/test-utils";
import Sidebar from "../../components/Sidebar.vue";
import store from "../../store";

describe("Sidebar", () => {
  const wrapper = shallowMount(Sidebar, {
    stubs: ["router-link"],
    store,
  });
  // get sidebarStructure from getters
  // find out how many .parent_box we have
  let firstParentBox = wrapper.find(".parent_box");
  let allParentBoxes = wrapper.findAll(".parent_box");
  let sidebarStructure = store.getters.sidebarStructure;

  // #1
  test("sidebarStructureLength to be equal to the length of all .parent_box", () => {
    expect(allParentBoxes.length === sidebarStructure.length).toBeTruthy();
  });

  // // #2
  // test("render icons", () => {
  //   console.log(sidebarStructure[0].icon);
  //   console.log(firstParentBox.find('i').classes());
  // });
});
