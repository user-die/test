<template>
  <transition name="fade">
    <Modal
      v-if="modalVisible"
      v-model:showModal="modalVisible"
      v-bind:hideModal="hideModal"
      v-bind:metaData="metaData"
    />
  </transition>
  <div class="container">
    <h1>Список платежей</h1>
    <button
      class="btn btn-primary mt-2 w-25"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="showModal"
    >
      Добавить платеж
    </button>

    <form action="" class="my-3">
      <div class="form-group row">
        <div class="col-2">
          <label class="form-label" for="date">Дата платежа</label>

          <input
            class="form-control"
            type="date"
            name=""
            id="date"
            placeholder="дд.мм.гггг"
            :value="searchDate"
            @change="setDateSearch"
          />
        </div>

        <div class="col-2">
          <label class="form-label" for="sourse">Источник платежа </label>
          <select
            class="form-control"
            name=""
            id="sourse"
            :value="searchSource"
            @change="setSourceSearch"
          >
            <option value="0">Все источники</option>
            <option v-for="option in metaData.sources" :value="option.id">
              {{ option.title.replace(/^./, option.title[0].toUpperCase()) }}
            </option>
          </select>
        </div>
      </div>
    </form>

    <Table></Table>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import Table from "./Table.vue";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  components: { Modal, Table },

  methods: {
    ...mapMutations({
      setSortType: "payroll/setSortType",
      setConditionSort: "payroll/setConditionSort",
      setSourceSearch: "payroll/setSourceSearch",
      setDateSearch: "payroll/setDateSearch",
      hideModal: "payroll/hideModal",
      showModal: "payroll/showModal",
    }),
  },
  mounted() {
    this.$store.dispatch({ type: "payroll/getPayroll" });
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
