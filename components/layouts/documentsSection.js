import React, { useEffect, useState } from "react";
import moment from "moment";
import { checkExpiryCounts, getConstant } from "@/utilities/utils";
import { DOCUMENTS_TYPE_LIST } from "@/utilities/dummyData";
import DocumentTable from "../tabels/documentTable";
import { docTableHeadCells } from "@/utilities/masterData";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import docSecStyle from "@/styles/docSec.module.scss";
import CommonModal from "../common/commonModal";
import modalStyle from "@/styles/modal.module.scss";
import { postApiData } from "@/utilities/services/apiService";
import commonStyle from "@/styles/common/common.module.scss";

export default function DocumentsSection({
  setReminderData,
  setReminderModal,
  setIsEdit,
  tableData,
  setTableData,
}) {
  const [documentsTypeList, setDocumentsTypeList] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [selected, setSelected] = useState([]);

  const onClickEdit = (id) => {
    const selectedItem = tableData.find((item) => item.id == id);
    setReminderData(selectedItem);
    setReminderModal(true);
    setIsEdit(true);
  };

  const onClickDelete = async (ids) => {
    const payload = {
      ids: ids,
    };
    setDeleteLoad(true);
    setDeleteError("");
    try {
      const response = await postApiData("DELETE_VEHICALE_DOCUMENTS", payload);
      if (response.status) {
        setTableData((prev) => prev.filter((item) => !ids.includes(item.id)));
        setDeletePopup(false);
        setSelected([]);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
      setDeleteError(
        "Error occurred while deleting record, Please try again later"
      );
    }
    setDeleteLoad(false);
    // const updatedData = tableData.filter((item) => item.id !== id);
    // localStorage.setItem("reminderData", JSON.stringify(updatedData));
    // setTableData(updatedData);
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
        selected={selected}
        setSelected={setSelected}
        onClickDelete={() => {
          setDeletePopup(true);
        }}
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

      <CommonModal
        modalTitle={"Delete Document"}
        modalOpen={deletePopup}
        setModalOpen={setDeletePopup}
        className={""}
      >
        <div className={modalStyle.deleteModal}>
          <p className={modalStyle.conformationMsg}>
            Are you sure you want to delete this document?
          </p>
          <div className={modalStyle.buttonsWrapper}>
            <button
              className={`${modalStyle.btn} ${modalStyle.cancel}`}
              onClick={() => setDeletePopup(false)}
            >
              No
            </button>
            <button
              className={`${modalStyle.btn} ${modalStyle.delete}`}
              onClick={() => onClickDelete(selected)}
            >
              {deleteLoad ? getConstant("LOADING_TEXT") : "Yes"}
            </button>
          </div>
          {deleteError && (
            <span className={commonStyle["errorMsg"]}>{deleteError}</span>
          )}
        </div>
      </CommonModal>
    </div>
  );
}
