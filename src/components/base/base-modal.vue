<script setup>
import { watch } from 'vue';

const emit = defineEmits(['opened']);
const visible = defineModel();

function onClose() {
  visible.value = false;
}

watch(visible, (value) => {
  if (value) {
    emit('opened');
  }
});
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-50 p-4 flex justify-center items-center z-10"
  >
    <div class="relative max-w-sm w-full" v-click-outside="onClose">
      <slot :close="onClose" />
    </div>
  </div>
</template>
