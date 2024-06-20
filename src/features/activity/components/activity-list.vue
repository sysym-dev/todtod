<script setup>
import BaseButton from 'src/components/base/base-button.vue';
import { useRequest } from 'src/core/request/request';
import { useAuthStore } from 'src/features/auth/auth.store';
import { nextTick, reactive, ref, watch } from 'vue';
import ActivityRowAction from 'src/features/activity/components/activity-row-action.vue';

const props = defineProps({
  activities: Array,
});
const emit = defineEmits(['edit', 'delete', 'created']);

const authStore = useAuthStore();
const { request: postActivity } = useRequest('activities');

const inputNewTask = ref(null);
const creating = defineModel('creating');
const createForm = reactive({
  name: null,
});

async function focusInputNewTask() {
  await nextTick();

  inputNewTask.value.focus();
}

async function onStore() {
  const [, error] = await postActivity({
    method: 'post',
    data: {
      name: createForm.name,
      user_id: authStore.me.userId,
    },
  });

  if (!error) {
    createForm.name = null;

    focusInputNewTask();

    emit('created');
  }
}
function onEdit(activity) {
  emit('edit', activity);
}
function onDelete(activity) {
  emit('delete', activity);
}

watch(creating, (value) => {
  if (value) {
    focusInputNewTask();
  }
});
</script>

<template>
  <ul class="border border-gray-200 rounded-lg">
    <li
      v-for="(activity, index) in activities"
      :key="activity.id"
      :class="[
        'group flex items-center justify-between py-2 px-2.5 border-gray-200',
        index === activities.length - 1 && !creating ? '' : 'border-b',
      ]"
    >
      <span>{{ activity.name }}</span>
      <div class="flex items-center gap-x-2">
        <base-button size="extra-small" color="light">Mark as Done</base-button>
        <activity-row-action
          @edit="onEdit(activity)"
          @delete="onDelete(activity)"
        />
      </div>
    </li>
    <li v-if="creating">
      <form action="" @submit.prevent="onStore">
        <input
          ref="inputNewTask"
          :class="[
            'py-2 px-2.5 w-full placeholder-gray-400 border-0 focus:border-0 rounded-b-lg focus:outline-0 focus:ring-0',
            activities.length ? '' : 'rounded-t-lg',
          ]"
          type="text"
          placeholder="New Task"
          v-model="createForm.name"
        />
      </form>
    </li>
  </ul>
</template>