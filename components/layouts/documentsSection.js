import React, { useEffect, useState } from "react";
import DocumentsTables from "./tables/documentsTables";
import moment from "moment";
import { getConstant } from "@/utilities/utils";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";
import DocumentTable from "../tabels/documentTable";
import { docTableHeadCells } from "@/utilities/masterData";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

export default function DocumentsSection(props) {
  const {
    setReminderData,
    setReminderModal,
    setIsEdit,
    tableData,
    setTableData,
  } = props;

  const [documentsTypeList, setDocumentsTypeList] = useState(DOCUMENTS_TYPE_LIST);

  const onClickEdit = (id) => {
    const selectedItem = tableData.filter((item) => item.id === id);
    setReminderData(selectedItem[0]);
    setReminderModal(true);
    setIsEdit(true);
  };

  const onClickDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    localStorage.setItem("reminderData", JSON.stringify(updatedData));
    setTableData(updatedData);
  };

  useEffect(() => {
    const today = moment();
    const updatedDocsList = [...documentsTypeList];

    tableData.forEach((item) => {
      const expiryDate = moment(item.expiryDate);
      const alertDate = expiryDate.subtract(
        getConstant("DAYS_BEFORE_ALERT"),
        "days"
      );

      if (today.isSameOrAfter(alertDate, "day")) {
        const documentTypeValue = item.documentType.value;
        const docIndex = updatedDocsList.findIndex(
          (doc) => doc.value === documentTypeValue
        );

        if (docIndex !== -1) {
          updatedDocsList[docIndex].count += 1;
        }
      }
    });

    setDocumentsTypeList(updatedDocsList);
  }, [tableData]);

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Section with document counts */}
          <div className="row    mx-3">
            {documentsTypeList.map((item, i) => (
              <div key={i} className="col-md col-sm text-center my-3">
                <div
                  className="p-4 rounded shadow-sm"
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <div className="h5 text-primary">{item.label}</div>
                  <div className="display-6 text-danger">{item.count}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Document Table */}
          <DocumentTable
            rows={tableData}
            headCells={docTableHeadCells}
            title="All Records"
            onClickEdit={onClickEdit}
            onClickDelete={onClickDelete}
            renderActions={(id) => (
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-warning btn-sm mx-1"
                  onClick={() => onClickEdit(id)}
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => onClickDelete(id)}
                  title="Delete"
                >
                  <FaTrashAlt />
                </button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
