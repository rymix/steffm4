import { useSession } from "contexts/session";
import { useEffect } from "react";

const Modal = () => {
  const { modalOpen, setModalOpen, modalRef } = useSession();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`} ref={modalRef}>
      <div className="modal-content">
        {/* Your modal content goes here */}
        <button onClick={() => setModalOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
