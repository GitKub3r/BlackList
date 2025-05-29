import { createContext, useContext, useState, useCallback } from "react";
import { Modal } from "../components/Modal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "info",
  });

  const showModal = useCallback((message, type = "info") => {
    setModal({ show: false, message: "", type });
    setTimeout(() => setModal({ show: true, message, type }), 10);
  }, []);

  const hideModal = useCallback(
    () => setModal({ show: false, message: "", type: "info" }),
    []
  );

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {modal.show && <Modal message={modal.message} type={modal.type} />}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
