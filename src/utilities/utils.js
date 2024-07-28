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
