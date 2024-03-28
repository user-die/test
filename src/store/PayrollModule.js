import axios from "axios";

export default {
  state: () => ({
    payroll: [],
    metaData: [],
    sort: "",
    conditionSort: true,
    searchSource: 0,
    searchDate: "",
    modalVisible: false,
  }),

  getters: {
    sortItems(state) {
      if (state.payroll.length !== 0 && state.sort) {
        const sortedArr = [...state.payroll].sort((a, b) => {
          if (a[state.sort] > b[state.sort]) {
            return 1;
          }
          if (a[state.sort] < b[state.sort]) {
            return -1;
          }

          return 0;
        });

        return state.conditionSort ? sortedArr : sortedArr.reverse();
      } else return [...state.payroll];
    },

    searchBySource(state, getters) {
      if (state.searchSource == 0) return getters.sortItems;

      return getters.sortItems.filter(
        (item) => item.source_id == state.searchSource
      );
    },

    searchByDate(state, getters) {
      if (state.searchDate == "") return getters.searchBySource;
      console.log(new Date(state.searchDate).toLocaleDateString("ru"));

      return getters.searchBySource.filter((item) =>
        new Date(item.date)
          .toLocaleDateString("ru")
          .includes(new Date(state.searchDate).toLocaleDateString("ru"))
      );
    },
  },

  mutations: {
    setPayroll(state, payload) {
      try {
        state.payroll = payload;
      } catch (error) {
        console.log(error);
      }
    },

    setMetaData(state, payload) {
      state.metaData = payload;
    },

    setSortType(state, payload) {
      state.sort = payload;
    },

    setConditionSort(state) {
      state.conditionSort = !state.conditionSort;
    },

    setSourceSearch(state, event) {
      state.searchSource = event.target.value;
    },

    setDateSearch(state, event) {
      state.searchDate = event.target.value;
    },

    hideModal(state) {
      state.modalVisible = false;
    },

    showModal(state) {
      state.modalVisible = true;
    },

    addPayment(state, payload) {
      state.payload.push(payload);
    },
  },

  actions: {
    async getPayroll({ commit }) {
      try {
        const metaResponse = await axios.get(
          "https://tests.szapi.ru/ts5/public_html/form_tss"
        );
        commit("setMetaData", metaResponse.data);

        const response = await axios.get(
          "https://tests.szapi.ru/ts5/public_html/payments"
        );
        commit("setPayroll", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },

  namespaced: true,
};
