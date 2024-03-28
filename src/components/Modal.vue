<template>
  <div
    :class="['modal', 'fade', { show: showModal }]"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Добавление нового платежа
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
            @click="hideModal"
          ></button>
        </div>

        <form action="" class="my-3" @submit="checkForm" novalidate>
          <div class="modal-body">
            <div class="form-group">
              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="client"
                  >Клиент</label
                >
                <div class="col-6">
                  <input
                    required
                    :class="[
                      'form-control',
                      {
                        'is-invalid':
                          form.client.length == '' && this.validation,
                      },
                    ]"
                    type="text"
                    name="client"
                    id="client"
                    placeholder="Введите ФИО"
                    v-model="form.client"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="contract"
                  >Договор №</label
                >
                <div class="col-6">
                  <input
                    required
                    :class="[
                      'form-control',
                      {
                        'is-invalid':
                          form.contract.length == '' && this.validation,
                      },
                    ]"
                    type="text"
                    name="contract"
                    id="contract"
                    placeholder="Введите номер договора"
                    v-model="form.contract"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="type"
                  >Тип оплаты</label
                >
                <div class="col-6">
                  <select
                    required
                    :class="[
                      'form-select',
                      {
                        'is-invalid': form.type_id == 0 && this.validation,
                      },
                    ]"
                    class="form-control"
                    name="type"
                    id="type"
                    v-model="form.type_id"
                  >
                    <option value="0">Не выбрано</option>
                    <option v-for="option in metaData.types" :value="option.id">
                      {{ option.title }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="date"
                  >Дата оплаты</label
                >
                <div class="col-6">
                  <input
                    required
                    :class="[
                      'form-control',
                      {
                        'is-invalid':
                          form.date == 'Invalid Date' && this.validation,
                      },
                    ]"
                    type="date"
                    name="date"
                    id="date"
                    placeholder="дд.мм.гггг"
                    v-model="form.date"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="summ"
                  >Сумма оплаты</label
                >
                <div class="col-6">
                  <input
                    required
                    :class="[
                      'form-control',
                      {
                        'is-invalid': form.summ.length == '' && this.validation,
                      },
                    ]"
                    type="text"
                    name="summ"
                    id="summ"
                    placeholder="Введите сумму"
                    v-model="form.summ"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle required"
                  for="status"
                  >Статус</label
                >
                <div class="col-6">
                  <select
                    required
                    :class="[
                      'form-select',
                      {
                        'is-invalid':
                          form.status_id.length == '' && this.validation,
                      },
                    ]"
                    name="status"
                    id="status"
                    placeholder="дд.мм.гггг"
                    v-model="form.status_id"
                  >
                    <option
                      v-for="option in metaData.statuses"
                      :value="option.id"
                    >
                      {{ option.title }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="hideModal"
            >
              Закрыть
            </button>
            <button type="submit" class="btn btn-primary">
              Сохранить изменения
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "modal",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
    hideModal: {
      type: Function,
    },
    metaData: {
      type: Object,
    },
  },
  data() {
    return {
      validation: false,
      form: {
        client: "",
        contract: "",
        type_id: 0,
        date: new Date(date).toLocaleDateString("en"),
        summ: "",
        source_id: 1,
        status_id: 1,
      },
    };
  },
  methods: {
    ...mapMutations({
      addPayment: "payroll/addPayment",
    }),

    async post(form) {
      try {
        const response = await axios.post(
          "https://tests.szapi.ru/ts5/public_html/payments",
          form
        );

        if (response.status == 200) {
          this.addPayment(form);
        }
      } catch (error) {
        console.log(error);
      }
    },

    checkForm(event) {
      this.validation = true;
      event.preventDefault();
      event.stopPropagation();

      if (event.target.checkValidity() === true) {
        this.post(this.form);

        this.hideModal();

        this.form = {
          client: "",
          contract: "",
          type_id: 0,
          date: "",
          summ: "",
          source_id: 1,
          status_id: 1,
        };
        this.validation = false;
      }
    },
  },
};
</script>

<style scoped>
.show {
  display: block;
}

.required::before {
  content: "*";
  color: red;
  margin-right: 5px;
}
</style>
