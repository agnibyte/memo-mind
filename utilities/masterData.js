export const docTableHeadCells = [
  // {
  //   id: "masterNo",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Master No.",
  // },
  {
    id: "id",
    numeric: false,
    disablePadding: false,
    label: "Sr. No.",
  },
  {
    id: "vehicleNo",
    numeric: false,
    disablePadding: false,
    label: "Vehicle No.",
  },
  {
    id: "note",
    numeric: false,
    disablePadding: false,
    label: "Note",
  },
  {
    id: "documentType",
    numeric: false,
    disablePadding: false,
    label: "Document Type",
  },
  {
    id: "expiryDate",
    numeric: false,
    disablePadding: false,
    label: "Expiry Date",
  },
  {
    id: "alertDate",
    numeric: false,
    disablePadding: false,
    label: "Alert Date",
  },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
];
export const menuItems = [
  {
    title: "Dashboard",
    icon: "🌐",
    children: [],
  },
  {
    title: "Messager",
    icon: "📦",
    url: "/messager",

  },
  {
    title: "UI Elements",
    icon: "🎨",
    children: [
      {
        title: "Basic Elements",
        children: [],
      },
      {
        title: "Advanced Elements",
        children: [],
      },
      {
        title: "Forms & Tables",
        children: [
          { title: "Form Elements" },
          { title: "Advanced Forms" },
          { title: "Basic Tables" },
          { title: "Data Tables" },
        ],
      },
      {
        title: "Icons",
        children: [],
      },
    ],
  },
  {
    title: "Pages",
    icon: "🌍",
    children: [],
  },
  {
    title: "Apps",
    icon: "⚙️",
    children: [],
  },
];
