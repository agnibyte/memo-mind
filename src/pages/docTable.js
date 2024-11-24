import DocumentTable from "@/components/tabels/documentTable";

export default function DocTable() {
  const tableData = {
    headCells: [
      {
        id: "masterNo",
        numeric: false,
        disablePadding: false,
        label: "Master No.",
      },
      {
        id: "vehicleNo",
        numeric: true,
        disablePadding: false,
        label: "Vehicle No.",
      },
      { id: "fat", numeric: true, disablePadding: false, label: "Fat" },
      { id: "carbs", numeric: true, disablePadding: false, label: "Carbs" },
      { id: "protein", numeric: true, disablePadding: false, label: "Protein" },
    ],
    rows: [
      {
        id: 1,
        masterNo: "M123",
        vehicleNo: "A1",
        fat: 5.2,
        carbs: 30,
        protein: 10,
      },
      {
        id: 2,
        masterNo: "M124",
        vehicleNo: "A2",
        fat: 4.5,
        carbs: 32,
        protein: 12,
      },
    ],
  };

  return (
    <div>
      <DocumentTable
        rows={tableData.rows}
        headCells={tableData.headCells}
        title="Nutrition Information"
      />
    </div>
  );
}
