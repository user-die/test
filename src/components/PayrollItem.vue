<template>
  <tr>
    <td>{{ payment.client }}</td>
    <td>{{ payment.contract }}</td>
    <td>{{ this.metaData.types[payment.type_id - 1].title }}</td>
    <td>{{ payment.date }}</td>
    <td>{{ payment.summ }}</td>
    <td>{{ this.metaData.sources[payment.source_id - 1].title }}</td>
    <td>{{ this.metaData.statuses[payment.status_id - 1].title }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    payment: {
      type: Object,
      required: true,
    },
    metaData: {
      type: Object,
    },
  },
};
</script>

<style></style>
