<script setup>
import { homeTransactionCardColumn } from "@/constants/columns";
import { useTransferStore } from "@/stores/transferStore";
import { thousandsSeparators } from "@/utils/number";
import { FilterFilled, SearchOutlined } from "@ant-design/icons-vue";
import { format } from "date-fns";
import { reactive, ref } from "vue";

const transferStore = useTransferStore();

const state = reactive({
  searchText: "",
  searchedColumn: "",
});
const searchInput = ref(null);
const rowSelection = ref({
  checkStrictly: true,
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
});

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters) => {
  clearFilters({ confirm: true });
  state.searchText = "";
};
</script>

<template>
  <a-card hoverable title="Transactions" bodyStyle="padding: 0px; margin: 0px">
    <template #extra>
      <a-input-search
        v-model:value="value"
        placeholder="Search transaction"
        style="width: 200px"
        @search="onSearch"
      />
    </template>

    <a-table
      size="small"
      rowKey="id"
      :showExpandColumn="true"
      :data-source="transferStore.list"
      :columns="
        homeTransactionCardColumn({
          searchInput,
        })
      "
      :row-selection="rowSelection"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'from'">
          <span>From</span>
        </template>
        <template v-else-if="column.key === 'to'">
          <span>To</span>
        </template>
      </template>

      <template
        #customFilterDropdown="{
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
          column,
        }"
      >
        <div style="padding: 8px">
          <a-input
            :ref="searchInput"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="handleReset(clearFilters)"
          >
            Reset
          </a-button>
        </div>
      </template>
      <template #customFilterIcon="{ filtered, column }">
        <search-outlined
          v-if="column.key == 'name'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <FilterFilled
          v-if="column.key == 'type' || column.key == 'currency'"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
      </template>

      <template #bodyCell="{ text, column, record }">
        <template v-if="column.key === 'name'">
          <a-avatar
            :style="{
              backgroundColor: color,
              marginRight: '5px',
            }"
          >
            {{ record.name[0] }}
          </a-avatar>
          <span
            v-if="state.searchText && state.searchedColumn === column.dataIndex"
          >
            <template
              v-for="(fragment, i) in text
                ?.toString()
                ?.split(
                  new RegExp(
                    `(?<=${state.searchText})|(?=${state.searchText})`,
                    'i'
                  )
                )"
            >
              <mark
                v-if="fragment.toLowerCase() === state.searchText.toLowerCase()"
                :key="i"
                class="highlight"
              >
                {{ fragment }}
              </mark>
              <template v-else>
                {{ fragment }}
              </template>
            </template>
          </span>
          <span v-else>
            {{ record.name }}
          </span>
        </template>

        <template v-if="column.key === 'created_at'">
          {{ format(record.created_at, "d MMMM yyyy, HH:mm") }}
        </template>

        <template v-if="column.key === 'amount'">
          {{ thousandsSeparators(record.amount) }}
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style scoped>
.highlight {
  background-color: rgb(255, 192, 105);
  padding: 0px;
}
</style>
