import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrorAction } from "../../redux/slices/globalSlices/GlobalSlice";

export default function Errormsg({ message }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      Swal.fire({
        icon: "error",
        title:
          '<span style="color: #fff; font-family: sans-serif;">Login Failed</span>',
        text: message,
        background: "#0f172a", // slate-900 to match your UI
        color: "#94a3b8", // slate-400
        iconColor: "#ef4444", // red-500
        showConfirmButton: true,
        confirmButtonColor: "#4f46e5", // indigo-600
        confirmButtonText: "Try Again",
        buttonsStyling: true,
        backdrop: `rgba(0,0,0,0.6)`,
        customClass: {
          popup: "rounded-3xl border border-slate-800 shadow-2xl",
          confirmButton:
            "rounded-xl px-6 py-2.5 font-bold uppercase tracking-wider",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp animate__faster",
        },
      }).then(() => {
        // Only dispatch reset after the user closes the alert
        dispatch(resetErrorAction());
      });
    }
  }, [message, dispatch]);

  return null; // This component doesn't need to render anything to the DOM
}
