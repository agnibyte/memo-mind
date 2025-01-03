import React from "react";
import Table from "react-bootstrap/Table";
import { formatDate, getConstant } from "@/utilities/utils";
import moment from "moment";
import { DOCUMENTS_SECTION_COLUMNS } from "@/utilities/dummyData";

export default function DocumentsTables(props) {
  const { tableData = [], onClickEdit, onClickDelete } = props;

  const getDateBeforeDays = (date, days) => {
    if (!date || typeof days !== "number") return "-";
    return moment(date).subtract(days, "days").format("DD MMM, YYYY");
  };

  return (
    <Table
      striped
      bordered
      hover
    >
      <thead>
        <tr>
          {DOCUMENTS_SECTION_COLUMNS.map((item, i) => (
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
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.masterNo || "-"}</td>
            <td>{item.vehicleNo.label || "-"}</td>
            <td>{item.documentType.label || "-"}</td>
            <td>{formatDate(item.expiryDate)}</td>
            <td>
              {getDateBeforeDays(
                item.expiryDate,
                getConstant("DAYS_BEFORE_ALERT")
              )}
            </td>
            <td>
              <button
                className="btn  btn-outline-warning mx-2"
                variant="outline-warning "
                // style={{ backgroundColor: "transparent" }}
                onClick={() => onClickEdit(item.id)}
              >
                Edit
              </button>
              <button
                className="btn  btn-outline-danger mx-2"
                variant="outline-danger "
                // style={{ backgroundColor: "transparent" }}
                onClick={() => onClickDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
