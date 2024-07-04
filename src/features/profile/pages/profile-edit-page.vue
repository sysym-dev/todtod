<script setup>
import BaseFormItem from 'src/components/base/base-form-item.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseTitle from 'src/components/base/base-title.vue';
import BaseButton from 'src/components/base/base-button.vue';
import { useAuthStore } from 'src/features/auth/auth.store';
import { reactive, ref } from 'vue';
import ProfileEditPasswordModal from 'src/features/profile/components/profile-edit-password-modal.vue';
import { z } from 'zod';
import { useValidation } from 'src/core/validation/validation';

const authStore = useAuthStore();
const { hasError, getError, validate, resetError } = useValidation();

const form = reactive({
  email: authStore.me.email,
  name: authStore.me.name,
});
const editPasswordModalVisible = ref(false);

const schema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .email({ message: 'email must be a valid string' }),
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .min(1, { message: 'name cannot be empty' }),
});

function onEditPassword() {
  editPasswordModalVisible.value = true;
}
async function onSave() {
  resetError();

  const [data, errorValidate] = await validate(schema, form);
}
</script>

<template>
  <base-title size="small">Profile</base-title>
  <form class="space-y-2" @submit.prevent="onSave">
    <base-form-item label="Email">
      <base-input
        type="email"
        placeholder="Email"
        v-model="form.email"
        :state="hasError('email') ? 'danger' : 'default'"
        :message="getError('email')"
      />
    </base-form-item>
    <base-form-item label="Name">
      <base-input
        placeholder="Name"
        v-model="form.name"
        :state="hasError('name') ? 'danger' : 'default'"
        :message="getError('name')"
      />
    </base-form-item>
    <div class="flex gap-x-2">
      <base-button type="submit">Simpan</base-button>
      <base-button color="light" @click="onEditPassword"
        >Edit Password</base-button
      >
    </div>
  </form>
  <div>
    <profile-edit-password-modal v-model="editPasswordModalVisible" />
  </div>
</template>