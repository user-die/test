import { createStore } from "vuex";
import PayrollModule from "./PayrollModule";

export default createStore({
  modules: {
    payroll: PayrollModule,
  },
});
