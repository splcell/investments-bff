import { ToastContainer } from "react-toastify";

type Positions = "top-right" | "top-left" | "top-center" | "bottom-right" | "bottom-left" | "bottom-center"

interface ToastProps{
  position: Positions;
  closeTime: number;
  draggable?: boolean;
  theme?: string;
}

export const Toast = ({position, closeTime, draggable = false, theme = "light"}: ToastProps) => {
  return (
    <ToastContainer
      position={position}
      autoClose={closeTime}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss
      draggable={draggable}
      pauseOnHover
      theme={theme}
    />
  );
};
