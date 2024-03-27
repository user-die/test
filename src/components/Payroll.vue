<template>
  <Modal v-model:showModal="modalVisible" v-bind:hideModal="hideModal" />
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
            v-model="searchDate"
            @change="changeDate"
          />
        </div>

        <div class="col-2">
          <label class="form-label" for="sourse">Источник платежа </label>
          <select
            class="form-control"
            name=""
            id="sourse"
            v-model="searchSource"
            @change="changeSource"
          >
            <option value="0">Все источники</option>
            <option v-for="option in metaData.sources" :value="option.id">
              {{ option.title.replace(/^./, option.title[0].toUpperCase()) }}
            </option>
          </select>
        </div>
      </div>
    </form>

    <table class="table mt-3 border-top">
      <thead>
        <tr>
          <th>
            Клиенты
            <button
              class="arrow"
              @click="
                this.sort = 'client';
                this.conditionSort = !this.conditionSort;
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
                this.sort = 'type_id';
                this.conditionSort = !this.conditionSort;
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
                this.sort = 'date';
                this.conditionSort = !this.conditionSort;
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
                this.sort = 'status_id';
                this.conditionSort = !this.conditionSort;
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
  </div>
</template>

<script>
import axios from "axios";
import PayrollItem from "./PayrollItem.vue";
import Modal from "./Modal.vue";
import ArrowButton from "./ArrowButton.vue";

export default {
  components: { PayrollItem, Modal, ArrowButton },
  data() {
    return {
      payroll: [],
      metaData: [],
      modalVisible: false,
      sort: "",
      conditionSort: true,
      searchSource: 0,
      searchDate: "",
    };
  },
  methods: {
    hideModal() {
      this.modalVisible = false;
    },

    showModal() {
      this.modalVisible = true;
    },

    changeSource(event) {
      this.searchSource = event.target.value;
    },

    changeDate(event) {
      this.searchDate = event.target.value;
    },

    async getPayroll() {
      try {
        const metaResponse = await axios.get(
          "https://tests.szapi.ru/ts5/public_html/form_tss"
        );
        this.metaData = metaResponse.data;

        const response = await axios.get(
          "https://tests.szapi.ru/ts5/public_html/payments"
        );
        this.payroll = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPayroll();
  },
  computed: {
    sortItems() {
      if (this.payroll.length !== 0 && this.sort) {
        const sortedArr = [...this.payroll].sort((a, b) => {
          if (a[this.sort] > b[this.sort]) {
            return 1;
          }
          if (a[this.sort] < b[this.sort]) {
            return -1;
          }

          return 0;
        });

        return this.conditionSort ? sortedArr : sortedArr.reverse();
      } else return [...this.payroll];
    },

    searchBySource() {
      if (this.searchSource == 0) return this.sortItems;

      return this.sortItems.filter(
        (item) => item.source_id == this.searchSource
      );
    },

    searchByDate() {
      if (this.searchDate == "") return this.searchBySource;
      console.log(new Date(this.searchDate).toLocaleDateString("ru"));

      return this.searchBySource.filter((item) =>
        new Date(item.date)
          .toLocaleDateString("ru")
          .includes(new Date(this.searchDate).toLocaleDateString("ru"))
      );
    },
  },
};
</script>

<style scoped>
.arrow {
  border: 0;
  background-color: #fff;
}
</style>
