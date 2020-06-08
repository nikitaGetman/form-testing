import { mount, createLocalVue } from "@vue/test-utils";
import RegisterForm from "@/components/RegisterForm.vue";
import Vuelidate from "vuelidate";

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("RegisterForm.vue", () => {
  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(RegisterForm, { localVue });
    wrapper.setData({
      name: "Ivan",
      surname: "Ivanov",
      age: 20,
      country: null,
      email: "some@mail.ru",
      password: "123123",
      repeatPassword: "123123",
    });
    vm = wrapper.vm;
  });

  it("name validations", async () => {
    vm.name = "123asd";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.name = "Ivan";
    vm.submit();
    expect(vm.errored).toBeFalsy();
    expect(vm.signedUp).toBeTruthy();
  });

  it("surname validations", async () => {
    vm.surname = "123asd";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.surname = "Ivanov";
    vm.submit();
    expect(vm.errored).toBeFalsy();
    expect(vm.signedUp).toBeTruthy();
  });

  it("age validations", async () => {
    vm.age = "123asd";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.age = "20";
    vm.submit();
    expect(vm.errored).toBeFalsy();
    expect(vm.signedUp).toBeTruthy();
  });

  it("password validations", async () => {
    vm.password = "12345";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.password = "123123";
    vm.submit();
    expect(vm.errored).toBeFalsy();
    expect(vm.signedUp).toBeTruthy();
  });

  it("password validations", async () => {
    vm.repeatPassword = "";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.repeatPassword = "qwe123qwe";
    vm.submit();
    expect(vm.errored).toBeTruthy();
    expect(vm.signedUp).toBeFalsy();

    vm.password = "qwe123";
    vm.repeatPassword = "qwe123";
    vm.submit();
    expect(vm.errored).toBeFalsy();
    expect(vm.signedUp).toBeTruthy();
  });
});
