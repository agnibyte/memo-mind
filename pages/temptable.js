import DocumentTable from "@/components/tabels/documentTable";
import { docTableHeadCells } from "@/utilities/masterData";

export default function DocTable() {
  const rowsData = [
    {
      id: "vZhHQykiUwDX",
      masterNo: "qsqasax",
      vehicleNo: {
        id: "18",
        label: "MH 18 GH 4567",
        value: "mh18gh4567",
      },
      documentType: {
        id: "2",
        label: "INSURANCE",
        value: "insurance",
        count: 5,
      },
      expiryDate: "2024-10-14T16:32:34.000Z",
      protein: 10,
    },
    {
      id: "xscd",
      masterNo: "qsqasax",
      vehicleNo: {
        id: "18",
        label: "MH 18 GH 4567",
        value: "mh18gh4567",
      },
      documentType: {
        id: "2",
        label: "INSURANCE",
        value: "insurance",
        count: 5,
      },
      expiryDate: "2024-10-14T16:32:34.000Z",
      protein: 12,
    },
  ];
  const data = [
    {
      id: "vZhHQykiUwDX",
      masterNo: "qsqasax",
      vehicleNo: {
        id: "18",
        label: "MH 18 GH 4567",
        value: "mh18gh4567",
      },
      documentType: {
        id: "2",
        label: "INSURANCE",
        value: "insurance",
        count: 5,
      },
      expiryDate: "2024-10-14T16:32:34.000Z",
      alertDate: "",
    },
  ];

  return (
    <div>
      <DocumentTable
        rows={rowsData}
        headCells={docTableHeadCells}
        title="Document Table"
      />
    </div>
  );
}
