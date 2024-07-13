import "./Toast.css";
import { useProductContext } from "../../hooks/useProductContext";

export const Toast = () => {
  const { toastDetails } = useProductContext();

  return (
    <span
      className={`toastDiv ${
        toastDetails.active ? `show-toast ${toastDetails.type}` : ""
      } `}
    >
      {toastDetails?.toastMessage}
    </span>
  );
};
