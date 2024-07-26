import { useEffect, useState } from "react";
import Select from "react-select";
import customSearchStyle from "@/styles/common/customSearch.module.scss";
import { getUniqueKey } from "@/utilities/utils";

export default function CustomSearch(props) {
  const instanceId = getUniqueKey();

  const options = {
    instanceId: instanceId,
    placeholder: "Select Option",
    selectedValue: {},
    isSearchable: false,
    menuPosition: "fixed",
    ...props,
    className:
      customSearchStyle[props.className] ?? customSearchStyle["form_search"],
  };

  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "1px solid #9AB7BC",
      boxShadow: "none",
      padding: "0px",
      margin: "0px",
      "&:hover": {
        border: "1px solid #9AB7BC",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: undefined,
        color: isDisabled ? "#ccc" : isSelected ? "black" : data.color,
        borderBottom: `1px solid #F3F3F3`,
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": {
          ...styles[":active"],
        },
        padding: "10px",
      };
    },
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Select
          {...options}
          value={props.options.filter(
            (v) => v.value == props.selectedValue?.value
          )}
          onChange={props.onChange}
          styles={colorStyles}
        />
      ) : (
        <select>
          <option>{options.placeholder}</option>
        </select>
      )}
    </>
  );
}
