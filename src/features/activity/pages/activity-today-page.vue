<script setup>
import BaseTitle from 'src/components/base/base-title.vue';
import ActivityList from 'src/features/activity/components/activity-list.vue';
import { date } from 'src/utils/date';

const filter = {
  start_date: date().startOf('day').toISOString(),
  end_date: date().endOf('day').toISOString(),
};
const createPayload = {
  date: date().toISOString(),
};
</script>

<template>
  <div class="flex items-center justify-between">
    <base-title size="small">Today Activities</base-title>
  </div>
  <activity-list :filter="filter" :create-payload="createPayload" />
</template>
