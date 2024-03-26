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
            type="text"
            name=""
            id="date"
            placeholder="дд.мм.гггг"
          />
        </div>

        <div class="col-2">
          <label class="form-label" for="sourse">Источник платежа </label>
          <input
            class="form-control"
            style="max-width: 250px"
            type="text"
            name=""
            id="sourse"
          />
        </div>
      </div>
    </form>

    <table class="table mt-3">
      <thead>
        <tr>
          <th>Клиенты <button></button></th>
          <th>Договор №</th>
          <th>Тип платежа <button></button></th>
          <th>Дата <button></button></th>
          <th>Сумма (руб)</th>
          <th>Источник платежа</th>
          <th>Статус <button></button></th>
        </tr>
      </thead>

      <tbody>
        <PayrollItem
          v-for="payment in payroll"
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

export default {
  components: { PayrollItem, Modal },
  data() {
    return {
      payroll: [],
      metaData: [],
      modalVisible: false,
    };
  },
  methods: {
    hideModal() {
      this.modalVisible = false;
    },

    showModal() {
      this.modalVisible = true;
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
};
</script>

<style></style>
