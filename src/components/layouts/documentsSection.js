import React, { useEffect, useState } from "react";
import DocumentsTables from "./tables/documentsTables";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";

export default function DocumentsSection({
  setReminderData,
  setReminderModal,
  setIsEdit,
}) {
  const [tableData, setTableData] = useState([]);

  const columns = [
    { id: "01", name: "SR No" },
    { id: "01", name: "Master No." },
    { id: "01", name: "Vehicle No." },
    { id: "01", name: "Alert Date" },
    { id: "01", name: "Expire Date" },
    { id: "01", name: "Action" },
  ];

  const getTabelData = () => {
    const existingDataString = localStorage.getItem("reminderData");
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
    setTableData(existingData);
  };

  useEffect(() => {
    getTabelData();
  }, []);

  const onClickEdit = (id) => {
    const selectedItem = tableData.filter((item) => item.id == id);
    setReminderData(selectedItem[0]);
    setReminderModal(true);
    setIsEdit(true);
  };

  const onClickDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    localStorage.setItem("reminderData", JSON.stringify(updatedData));
    setTableData(updatedData);
    // setRefresh(!refresh);
  };

  return (
    <div>
      <div className="card-body">
        <div className="row mb-4">
          {DOCUMENTS_TYPE_LIST.map((item, i) => (
            <div
              key={i}
              className="col text-center"
            >
              <div className="h5">{item.label}</div>
              <div className="text-danger display-6">{item.count}</div>
            </div>
          ))}
        </div>

        <DocumentsTables
          tableData={tableData}
          onClickEdit={onClickEdit}
          onClickDelete={onClickDelete}
        />
      </div>
    </div>
  );
}
