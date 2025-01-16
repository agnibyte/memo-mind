import React, { useEffect, useState } from "react";
import moment from "moment";
import { checkExpiryCounts, getConstant } from "@/utilities/utils";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";
import DocumentTable from "../tabels/documentTable";
import { docTableHeadCells } from "@/utilities/masterData";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import docSecStyle from "@/styles/docSec.module.scss";

export default function DocumentsSection({
  setReminderData,
  setReminderModal,
  setIsEdit,
  tableData,
  setTableData,
}) {
  const [documentsTypeList, setDocumentsTypeList] = useState([]);

  const onClickEdit = (id) => {
    const selectedItem = tableData.find((item) => item.id == id);
    setReminderData(selectedItem);
    setReminderModal(true);
    setIsEdit(true);
  };

  const onClickDelete = (id) => {
    const updatedData = tableData.filter((item) => item.id !== id);
    localStorage.setItem("reminderData", JSON.stringify(updatedData));
    setTableData(updatedData);
  };

  useEffect(() => {
    setDocumentsTypeList(checkExpiryCounts(tableData));
  }, [tableData]);

  return (
    <div>
      <div className="row mx-1">
        {documentsTypeList.map((item) => (
          <button
            key={item.id}
            className={`${docSecStyle.documentCard} col-12 col-md text-center`}
          >
            <div className={docSecStyle.labelWrap}>
              <div className={`${docSecStyle.label} text-primary`}>
                {item.label}
              </div>
              {/* <div className={`${docSecStyle.label} text-danger`}>
                {item.totalCount}
              </div> */}
              <div className={`${docSecStyle.label} text-danger`}>
                {item.withinMonthExpiryCount + item.expiredCount}
              </div>
            </div>
          </button>
        ))}
      </div>

      <DocumentTable
        rows={tableData}
        headCells={docTableHeadCells}
        title="All Records"
        onClickEdit={onClickEdit}
        onClickDelete={onClickDelete}
        // renderActions={(id) => (
        //   <div className="d-flex justify-content-center">
        //     <button
        //       className="btn btn-warning btn-sm mx-1"
        //       onClick={() => onClickEdit(id)}
        //       title="Edit"
        //     >
        //       <FaEdit />
        //     </button>
        //     <button
        //       className="btn btn-danger btn-sm mx-1"
        //       onClick={() => onClickDelete(id)}
        //       title="Delete"
        //     >
        //       <FaTrashAlt />
        //     </button>
        //   </div>
        // )}
      />
    </div>
  );
}
