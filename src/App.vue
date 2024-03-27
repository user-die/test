<template>
  <Payroll />
</template>

<script>
import Payroll from "./components/Payroll.vue";
import "bootstrap/dist/css/bootstrap.css";

export default {
  // Плавное появление модального окна
  // Затемнение при модальном окне
  // Отправка данных в модальном окне
  components: {
    Payroll,
  },
};
</script>

<style></style>
