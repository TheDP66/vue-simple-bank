<script setup>
import { postTransferService } from "@/services/postTransferService";
import { useAccountStore } from "@/stores/accountStore";
import { useTransferStore } from "@/stores/transferStore";
import { useUserStore } from "@/stores/userStore";
import { currencyToPrefix, currencyToString } from "@/utils/currency";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";

const props = defineProps(["open", "handleClose"]);

const accountStore = useAccountStore();
const userStore = useUserStore();
const transferStore = useTransferStore();
const formRef = ref();
const formState = reactive({
  from_account_id: null,
  to_account_id: null,
  amount: null,
});
const submitting = ref(false);

const handleSubmit = async () => {
  await formRef.value.validate().then(async () => {
    try {
      submitting.value = true;

      const accounts = accountStore.accounts;

      const data = {
        from_account_id: formState.from_account_id,
        to_account_id: formState.to_account_id,
        amount: formState.amount,
        currency: accounts.find((e) => e.id == formState.from_account_id)
          .currency,
      };

      await postTransferService(data);

      accountStore.fetchData();
      transferStore.fetchData();
      props.handleClose();
    } catch (error) {
      message.error(error);
    } finally {
      submitting.value = false;
    }
  });
};

const resetForm = () => {
  formState.from_account_id = null;
  formState.to_account_id = null;
  formState.amount = null;
  props.handleClose();
};
</script>

<template>
  <a-modal
    v-model:open="props.open"
    title="Transfer"
    :confirm-loading="submitting"
    @ok="handleSubmit"
    @cancel="resetForm"
  >
    <a-form
      ref="formRef"
      :model="formState"
      layout="vertical"
      style="max-width: 600px"
    >
      <a-form-item
        name="from_account_id"
        :rules="[{ required: true, message: 'Field is required!' }]"
        :value="formState.from_account_id"
      >
        <a-select
          placeholder="From account"
          v-model:value="formState.from_account_id"
        >
          <a-select-option
            v-for="(account, index) in accountStore.accounts"
            :key="account.id"
            :value="account.id"
          >
            {{ account.id }} ({{ currencyToString(account.currency) }})
          </a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        name="to_account_id"
        :rules="[{ required: true, message: 'Field is required!' }]"
        :value="formState.to_account_id"
      >
        <a-input-number
          placeholder="To account (ID)"
          v-model:value="formState.to_account_id"
          style="display: block; width: 100%"
          min="1"
        />
      </a-form-item>

      <a-form-item
        name="amount"
        :rules="[{ required: true, message: 'Field is required!' }]"
        :value="formState.amount"
      >
        <a-input-number
          placeholder="Amount"
          v-model:value="formState.amount"
          style="width: 100%"
          min="1"
          :formatter="
            (value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
          :disabled="formState.from_account_id == null"
          :prefix="
            currencyToPrefix(
              accountStore.accounts?.find(
                (e) => e.id == formState.from_account_id
              )?.currency ?? ''
            )
          "
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
