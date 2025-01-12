import React, { useEffect, useState } from "react";
import DocumentsTables from "./tables/documentsTables";
import moment from "moment";
import { getConstant } from "@/utilities/utils";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";
import DocumentTable from "../tabels/documentTable";
import { docTableHeadCells } from "@/utilities/masterData";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons
import docSecStyle from "@/styles/docSec.module.scss";

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
  const [SelectedType, setSelectedType] = useState("");

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
    const updateDocumentCounts = (data, documentsTypes) => {
      // Get today's date
      const today = moment();
      const thirtyDaysFromToday = moment().add(31, "days"); // 31 days from today

      // Create a copy of documentsTypeList to avoid direct mutation
      const updatedTypeList = [...documentsTypes];
      console.log("updatedTypeList", updatedTypeList);

      // Loop through the data and check if expiryDate is within 31 days
      data.forEach((item) => {
        // Parse the expiryDate from the item (it's already an ISO string)
        const expiryDate = moment(item.expiryDate);

        // Check if the expiryDate is within the next 31 days
        if (expiryDate.isBetween(today, thirtyDaysFromToday, null, "[]")) {
          // Find the document type in documentsTypes and update its count
          const docTypeIndex = updatedTypeList.findIndex(
            (type) => type.value === item.documentType
          );

          if (docTypeIndex !== -1) {
            // Increment the count if document type is found
            updatedTypeList[docTypeIndex].count += 1;
          }
        }
      });

      // Return the updated documentsTypes
      return updatedTypeList;
    };
    const updatedDocsList = updateDocumentCounts(tableData, documentsTypeList);

    setDocumentsTypeList(updatedDocsList);
  }, [tableData]);

  return (
    <div className="">
      <div className="">
        <div className="">
          {/* Section with document counts */}
          <div className="row mx-1">
            {documentsTypeList &&
              documentsTypeList.map((item, i) => (
                <button
                  key={i}
                  className={` ${docSecStyle.documentCard} col-12 col-md text-center`}
                >
                  <div className={` ${docSecStyle.labelWrap} `}>
                    <div className={`${docSecStyle.label} text-primary`}>
                      {item.label}
                    </div>
                    <div className={`${docSecStyle.label} text-danger`}>
                      {item.count}
                    </div>
                  </div>
                </button>
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
