import { theme } from "twin.macro";

export const getCustomStyles = () => {
  return {
    container: (provided) => {
      return {
        ...provided,
      };
    },
    indicatorsContainer: (provided) => {
      return {
        ...provided,
        display: "none",
      };
    },
    valueContainer: (provided) => {
      return {
        ...provided,
        display: "block",
      };
    },
    multiValue: (provided) => {
      return {
        ...provided,
        display: "inline-flex",
        fontSize: "16px",
        color: theme("colors[blue-dark]"),
        backgroundColor: "rgba(56, 74, 98, 0.1)",
        padding: "4px 12px",
        margin: "4px 8px",
        borderRadius: "32px",
      };
    },
    multiValueLabel: (provided) => {
      return {
        ...provided,
        fontSize: "16px",
        color: theme("colors[blue-dark]"),
      };
    },
    multiValueRemove: (provided) => {
      return {
        ...provided,
        ":hover": {
          background: "unset",
          cursor: "pointer",
        },
      };
    },
    menuList: (provided) => {
      return {
        ...provided,
        display: "flex",
        flexWrap: "wrap",
      };
    },
    option: (provided) => {
      return {
        ...provided,
        display: "inline-flex",
        fontSize: "16px",
        color: theme("colors[blue-dark]"),
        backgroundColor: "rgba(56, 74, 98, 0.1)",
        padding: "4px 12px",
        margin: "4px 8px",
        borderRadius: "32px",
        width: "unset",
      };
    },
    placeholder: (provided) => {
      return {
        ...provided,
        display: "inline-flex",
        fontSize: "16px",
        color: "#B0B8C2",
      };
    },
  };
};
