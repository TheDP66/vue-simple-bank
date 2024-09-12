<script setup>
import { postAccountService } from "@/services/postAccountService";
import { useAccountStore } from "@/stores/accountStore";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";

const props = defineProps(["open", "handleClose"]);

const accountStore = useAccountStore();
const formRef = ref();
const formState = reactive({
  currency: null,
});
const submitting = ref(false);

const handleSubmit = async () => {
  await formRef.value.validate().then(async () => {
    try {
      submitting.value = true;

      const data = {
        currency: formState.currency,
      };

      await postAccountService(data);

      accountStore.fetchData();
      props.handleClose("accounts");
    } catch (error) {
      message.error(error);
    } finally {
      submitting.value = false;
    }
  });
};

const resetForm = () => {
  formState.currency = null;
  props.handleClose("accounts");
};
</script>

<template>
  <a-modal
    v-model:open="props.open"
    title="New Account"
    @ok="handleSubmit"
    @cancel="resetForm"
    :confirm-loading="submitting"
  >
    <a-form
      ref="formRef"
      :model="formState"
      layout="vertical"
      style="max-width: 600px"
    >
      <a-form-item
        name="currency"
        :rules="[{ required: true, message: 'Field is required!' }]"
        :value="formState.currency"
      >
        <a-select placeholder="Currency" v-model:value="formState.currency">
          <a-select-option value="IDR">Rupiah</a-select-option>
          <a-select-option value="USD">US Dollar</a-select-option>
          <a-select-option value="EUR">Euro</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
