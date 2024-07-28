import React, { useEffect, useState } from "react";
import DocumentsTables from "./tables/documentsTables";

export default function DocumentsSection({
  setReminderData,
  setReminderModal,
  setIsEdit,
}) {
  const [tableData, setTableData] = useState([]);
  const items = [
    { name: "PUC", count: 0 },
    { name: "INSURANCE", count: 0 },
    { name: "FITNESS", count: 0 },
    { name: "PERMIT", count: 0 },
    { name: "TAX", count: 0 },
  ];

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

  const onClickDelete = (e) => {
    let id = e.currentTarget.id;
    const updatedData = ogdata.filter((item) => item.id !== id);
    localStorage.setItem("taskData", JSON.stringify(updatedData));
    settaskData(updatedData);
    setRefresh(!refresh);
  };

  return (
    <div>
      <div className="card-body">
        <div className="row mb-4">
          {items.map((item) => (
            <div
              key={item.name}
              className="col text-center"
            >
              <div className="h5">{item.name}</div>
              <div className="text-danger display-6">{item.count}</div>
            </div>
          ))}
        </div>
        {/* <table className="">
          <thead>
            <tr>
              {columns.map((item, i) => (
                <th
                  key={i}
                  className="p-2"
                >
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan="6"
                className="text-center"
              >
                No Data Found
              </td>
            </tr>
          </tbody>
        </table> */}
        <DocumentsTables
          tableData={tableData}
          onClickEdit={onClickEdit}
        />
      </div>
    </div>
  );
}
