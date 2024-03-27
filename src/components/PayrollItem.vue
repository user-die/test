<template>
  <tr>
    <td>{{ payment.client }}</td>
    <td>{{ payment.contract }}</td>
    <td>{{ this.metaData.types[payment.type_id - 1].title }}</td>
    <td class="text-center">
      {{ new Date(payment.date).toLocaleDateString("ru") }}
    </td>
    <td class="text-center">{{ payment.summ.slice(0, -3) }}</td>
    <td>{{ this.metaData.sources[payment.source_id - 1].title }}</td>
    <td class="text-center">
      <p
        :class="[
          'rounded-1',
          'mb-0',
          'd-inline-block',
          'px-1',
          {
            'text-bg-success': payment.status_id === 3,
            'text-bg-warning': payment.status_id === 2,
            'text-bg-secondary': payment.status_id === 1,
          },
        ]"
      >
        {{ this.metaData.statuses[payment.status_id - 1].title }}
      </p>
    </td>
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
