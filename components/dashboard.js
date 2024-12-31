// components/Dashboard.js
import React, { useEffect, useState } from "react";
import AddReminderForm from "./molecules/addReminderForm";
import CommonModal from "./common/commonModal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DocumentsSection from "./layouts/documentsSection";
import EmiSection from "./layouts/emiSection";
import AddDocumentForm from "./molecules/addDocumentForm";
import { getUniqueKey } from "@/utilities/utils";
import { postApiData } from "@/utilities/services/apiService";

const Dashboard = () => {
  const [reminderModal, setReminderModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [reminderData, setReminderData] = useState("");
  const [documentTableData, setDocumentTableData] = useState([]);

  const dashboardTabs = [
    {
      id: "01",
      label: "Document",
      value: "document",
      component: (
        <DocumentsSection
          setReminderData={setReminderData}
          setReminderModal={setReminderModal}
          setIsEdit={setIsEdit}
          tableData={documentTableData}
          setTableData={setDocumentTableData}
        />
      ),
    },
    { id: "02", label: "EMI", value: "emi", component: <EmiSection /> },
  ];

  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0].value);

  const addReminderData = async (data) => {
    const payload = {
      vehicleNo: data.vehicleNo,
      documentType: data.documentType,
      expiryDate: data.expiryDate,
      note: data.note,
    };
    try {
      const response = await postApiData("ADD_NEW_VEHICALE_DOCUMENTS", payload);
      if (response.status) {
        const LatestData = [...documentTableData, { id: response.id, ...data }];
        setDocumentTableData(LatestData);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  const updateReminderData = (updatedData) => {
    const existingDataString = localStorage.getItem("reminderData");
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];

    existingData = existingData.map((item) =>
      item.id === updatedData.id ? { ...item, ...updatedData } : item
    );

    localStorage.setItem("reminderData", JSON.stringify(existingData));
  };

  const onClickDashboardTab = (val) => {
    setSelectedTab(val);
  };

  const onClickAddReminder = (val) => {
    setIsEdit(false);
    setReminderModal(true);
  };

  // console.log("reminderData", reminderData);

  // const getTabelData = () => {
  //   const existingDataString = localStorage.getItem("reminderData");
  //   let existingData = existingDataString ? JSON.parse(existingDataString) : [];
  //   setDocumentTableData(existingData);
  // };

  // useEffect(() => {
  //   getTabelData();
  // }, []);

  const getAllVehicleDocuments = async () => {
    try {
      const response = await postApiData("GET_ALL_VEHICALE_DOCUMENTS");
      console.log(response.data )
      if (response.status && response.data.length > 0) {
        setDocumentTableData(response.data);
      } else {
        setDocumentTableData([]);
      }
    } catch (error) {
      console.error("Error occurred during form submission:", error);
    }
  };

  useEffect(() => {
    getAllVehicleDocuments();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-light">
            <h1 className="h4 mb-0">DASHBORD</h1>
          </div>
          <button onClick={onClickAddReminder}>Add</button>

          <Tabs
            defaultActiveKey={dashboardTabs[0].value}
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            {dashboardTabs.map((tab, index) => (
              <Tab
                key={index}
                onClick={() => onClickDashboardTab(tab.value)}
                eventKey={tab.value}
                title={tab.label}
              >
                {tab.component}
              </Tab>
            ))}
          </Tabs>
        </div>
      </div>

      <CommonModal
        modalTitle={"Add New Reminder"}
        modalOpen={reminderModal}
        setModalOpen={setReminderModal}
        className={""}
      >
        {/* <AddReminderForm
          setReminderModal={setReminderModal}
          reminderModal={reminderModal}
          reminderData={reminderData}
          setReminderData={setReminderData}
          addReminderData={addReminderData}
        /> */}
        <AddDocumentForm
          setReminderModal={setReminderModal}
          addReminderData={addReminderData}
          reminderData={reminderData}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          updateReminderData={updateReminderData}
        />
      </CommonModal>
    </>
  );
};

export default Dashboard;
