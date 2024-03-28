<template>
  <table class="table mt-3 border-top">
    <thead>
      <tr>
        <th>
          Клиенты
          <button
            class="arrow"
            @click="
              setSortType('client');
              setConditionSort();
            "
          >
            <ArrowButton />
          </button>
        </th>
        <th>Договор №</th>
        <th>
          Тип платежа
          <button
            class="arrow"
            @click="
              setSortType('type_id');
              setConditionSort();
            "
          >
            <ArrowButton />
          </button>
        </th>
        <th class="text-center">
          Дата
          <button
            class="arrow"
            @click="
              setSortType('date');
              setConditionSort();
            "
          >
            <ArrowButton />
          </button>
        </th>
        <th class="text-center">Сумма (руб)</th>
        <th>
          Источник <br />
          платежа
        </th>
        <th class="text-center">
          Статус
          <button
            class="arrow"
            @click="
              setSortType('status_id');
              setConditionSort();
            "
          >
            <ArrowButton />
          </button>
        </th>
      </tr>
    </thead>

    <tbody>
      <PayrollItem
        v-for="payment in searchByDate"
        :payment="payment"
        :metaData="metaData"
      />
    </tbody>
  </table>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import PayrollItem from "./PayrollItem.vue";
import ArrowButton from "./ArrowButton.vue";

export default {
  components: { PayrollItem, ArrowButton },

  methods: {
    ...mapMutations({
      setSortType: "payroll/setSortType",
      setConditionSort: "payroll/setConditionSort",
    }),
  },

  computed: {
    ...mapState({
      payroll: (state) => state.payroll.payroll,
      metaData: (state) => state.payroll.metaData,
      sort: (state) => state.payroll.sort,
      conditionSort: (state) => state.payroll.conditionSort,
      searchSource: (state) => state.payroll.searchSource,
      searchDate: (state) => state.payroll.searchDate,
      modalVisible: (state) => state.payroll.modalVisible,
    }),

    ...mapGetters({
      sortItems: "payroll/sortItems",
      searchBySource: "payroll/searchBySource",
      searchByDate: "payroll/searchByDate",
    }),
  },
};
</script>

<style scoped>
.arrow {
  border: 0;
  background-color: #fff;
}
</style>
