import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetSuccessAction } from "../../redux/slices/globalSlices/GlobalSlice";

export default function Successmsg({ message }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#0f172a", // slate-900
        color: "#f8fafc", // slate-50
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        iconColor: "#10b981", // emerald-500
        title: message,
        customClass: {
          popup: "rounded-2xl border border-slate-800 shadow-2xl",
        },
      }).then(() => {
        // Reset success state after the toast finishes or is closed
        dispatch(resetSuccessAction());
      });
    }
  }, [message, dispatch]);

  return null;
}
