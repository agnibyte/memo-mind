// components/Dashboard.js
import React, { useState } from "react";
import AddReminderForm from "./molecules/addReminderForm";
import CommonModal from "./common/commonModal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Dashboard = () => {
  const items = [
    { name: "PUC", count: 0 },
    { name: "INSURANCE", count: 0 },
    { name: "FITNESS", count: 0 },
    { name: "PERMIT", count: 0 },
    { name: "TAX", count: 0 },
  ];
  const dashboardTabs = [
    { id: "01", label: "Document", value: "document" },
    { id: "02", label: "EMI", value: "emi" },
  ];
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderData, setReminderData] = useState("");
  const [selectedTab, setSelectedTab] = useState(dashboardTabs[0].value);

  const addReminderData = (data) => {
    const existingDataString = localStorage.getItem("reminderData");
    let existingData = existingDataString ? JSON.parse(existingDataString) : [];
    localStorage.setItem(
      "reminderData",
      JSON.stringify([...existingData, data])
    );
  };

  const onClickDashboardTab = (val) => {
    setSelectedTab(val);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-light">
            <h1 className="h4 mb-0">DASHBORD</h1>
          </div>
          <button onClick={() => setReminderModal(true)}>Add</button>
          {/* <div className="d-flex border-bottom w-10">
            {dashboardTabs.map((tab, index) => (
              <button
                key={index}
                className={`btn flex-fill ${
                  selectedTab == tab.value && "btn-dark"
                }`}
                onClick={() => onClickDashboardTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div> */}
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
                {tab.label}
              </Tab>
            ))}
          </Tabs>
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
            <table className="table table-bordered">
              <thead>
                <tr>
                  {[
                    "SR No",
                    "Master No.",
                    "Vehicle No.",
                    "Alert Date",
                    "Expire Date",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-2"
                    >
                      {header}
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
            </table>
          </div>
        </div>
      </div>

      <CommonModal
        modalTitle={"Add New Reminder"}
        modalOpen={reminderModal}
        setModalOpen={setReminderModal}
        className={""}
      >
        <AddReminderForm
          setReminderModal={setReminderModal}
          reminderModal={reminderModal}
          reminderData={reminderData}
          setReminderData={setReminderData}
          addReminderData={addReminderData}
        />
      </CommonModal>
    </>
  );
};

export default Dashboard;
