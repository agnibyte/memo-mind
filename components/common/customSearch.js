import { useEffect, useState, forwardRef } from "react";
import Select from "react-select";
import customSearchStyle from "@/styles/common/customSearch.module.scss";
import { getUniqueKey } from "@/utilities/utils";

const CustomSearch = forwardRef(({ selectedValue, options = [], onChange, className, ...props }, ref) => {
  const instanceId = getUniqueKey();

  const mergedOptions = {
    instanceId,
    placeholder: "Select Option",
    isSearchable: true, // Ensure it's searchable
    menuPosition: "fixed",
    ...props,
    className: customSearchStyle[className] ?? customSearchStyle["form_search"],
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
    option: (styles, { isDisabled, isSelected }) => ({
      ...styles,
      color: isDisabled ? "#ccc" : isSelected ? "black" : "#333",
      backgroundColor: isSelected ? "#f0f0f0" : "white",
      borderBottom: "1px solid #F3F3F3",
      cursor: isDisabled ? "not-allowed" : "pointer",
      padding: "10px",
    }),
  };

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded ? (
        <Select
          ref={ref}
          {...mergedOptions}
          options={options} // Ensure options are passed correctly
          value={options.find((opt) => opt.value === selectedValue?.value) || null} // Fixed value selection
          onChange={onChange}
          styles={colorStyles}
        />
      ) : (
        <select>
          <option>{mergedOptions.placeholder}</option>
        </select>
      )}
    </>
  );
});

export default CustomSearch;
