<template>
  <div
    :class="['modal', 'fade', { show: showModal }]"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
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
        <div class="modal-body">
          <form action="" class="my-3">
            <div class="form-group">
              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Клиент</label
                >
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="Введите ФИО"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Договор №</label
                >
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="Введите номер договора"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Тип оплаты</label
                >
                <div class="col-6">
                  <select
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="дд.мм.гггг"
                  >
                    <option value="1">Касса</option>
                    <option value="2">Карта</option>
                    <option value="3">Онлайн</option>
                    <option value="4">Перевод</option>
                    <option value="5">Зачет</option>
                    <option value="6">Р/счёт</option>
                  </select>
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Дата оплаты</label
                >
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="дд.мм.гггг"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Сумма оплаты</label
                >
                <div class="col-6">
                  <input
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="Введите сумму"
                  />
                </div>
              </div>

              <div class="row mb-2">
                <label
                  class="form-label col-6 text-end m-0 p-1 align-middle"
                  for="date"
                  >Статус</label
                >
                <div class="col-6">
                  <select
                    class="form-control"
                    type="text"
                    name=""
                    id="date"
                    placeholder="дд.мм.гггг"
                  >
                    <option value="id1">Не оплачено</option>
                    <option value="id2">Оплачено</option>
                    <option value="id3">Подтвержден</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
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
          <button type="button" class="btn btn-primary">
            Сохранить изменения
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
};
</script>

<style scoped>
.show {
  display: block;
}
</style>
