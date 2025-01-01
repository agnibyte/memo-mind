import { constantsList } from "@/constants";
import moment from "moment";

export const getUniqueKey = (length = 12) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const formatDate = (date, format = 1) => {
  let formattedDate = "";
  if (!date) {
    formattedDate = "-";
  }

  if (format == 1) {
    formattedDate = moment(date).format("DD MMM, YYYY");
  }
  return formattedDate;
};

export const getConstant = (key) => {
  return constantsList[key.toUpperCase()] ?? null;
};

export const getDataFromLocalStorage = (keyName) => {
  let data = JSON.parse(localStorage.getItem(keyName));
  return data;
};

export const getDateBeforeDays = (date, days) => {
  if (!date || typeof days !== "number") return "-";
  return moment(date).subtract(days, "days").format("DD MMM, YYYY");
};

export const truncateString = (input) => {
  const maxLength = 20;
  if (!input) return "";
  const words = input.split(" ");
  if (words.length > 3 || input.length > maxLength) {
    return input.substring(0, maxLength).trim() + "...";
  }
  return input;
};

export const formatVehicleNumber = (vehicleNumber="") => {
  if (!vehicleNumber) return "";

  // Ensure input is uppercase
  // const upperCaseNumber = vehicleNumber && vehicleNumber != "" && vehicleNumber?.toUpperCase();

  // Flexible pattern for Indian vehicle numbers
  const regex = /^([A-Z]{2})(\d{1,2})([A-Z]{0,2})(\d{1,4})$/;
  return vehicleNumber.replace(regex, (_, state, rto, series, number) => {
    return [state, rto, series, number].filter(Boolean).join(" ");
  });
};
