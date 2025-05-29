import "../../styles/components/ConfirmModal.css";

export const ConfirmModal = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onResult,
  confirmText = "Continue",
  cancelText = "Cancel",
}) => {
  if (!open) return null;

  const handleConfirm = () => onResult(true);
  const handleCancel = () => onResult(false);

  return (
    <div className="confirm-modal-backdrop">
      <div className="confirm-modal">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="confirm-modal-actions">
          <button className="confirm-modal-confirm" onClick={handleConfirm}>
            {confirmText}
          </button>
          <button className="confirm-modal-cancel" onClick={handleCancel}>
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
