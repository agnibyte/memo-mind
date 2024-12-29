import React, { useEffect, useState } from "react";
import DocumentsTables from "./tables/documentsTables";
import moment from "moment";
import { getConstant } from "@/utilities/utils";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";

export default function DocumentsSection(props) {
  const {
    setReminderData,
    setReminderModal,
    setIsEdit,
    tableData,
    setTableData,
  } = props;

  const [documentsTypeList, setDocumentsTypeList] =
    useState(DOCUMENTS_TYPE_LIST);

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
    <div>
      <div className="card-body">
        <div className="row mb-4">
          {documentsTypeList.map((item, i) => (
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
