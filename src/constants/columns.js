export const homeTransactionCardColumn = ({ searchInput }) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    customFilterDropdown: true,
    onFilter: (value, record) => {
      return record.name.toString().toLowerCase().includes(value.toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => {
          searchInput.value.focus();
        }, 100);
      }
    },
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    filters: [
      {
        text: "Transfer",
        value: "Transfer",
      },
      {
        text: "Receive",
        value: "Receive",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    filters: [
      {
        text: "IDR",
        value: "IDR",
      },
      {
        text: "EUR",
        value: "EUR",
      },
      {
        text: "USD",
        value: "USD",
      },
    ],
    onFilter: (value, record) => record.type.indexOf(value) === 0,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    sorter: (a, b) => a.amount - b.amount,
  },
];
