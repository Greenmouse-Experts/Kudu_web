import { useRef, forwardRef, useImperativeHandle } from "react";

const ReModal = forwardRef(
  (
    { children, onClose }: { children: React.ReactNode; onClose?: () => void },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
      close: () => dialogRef.current?.close(),
    }));

    const handleCloseOnClickOutside = (
      event: React.MouseEvent<HTMLDialogElement>,
    ) => {
      if (dialogRef.current && event.target === dialogRef.current) {
        dialogRef.current.close();
      }
    };

    return (
      <dialog
        ref={dialogRef}
        onClick={handleCloseOnClickOutside}
        className="modal"
      >
        <form method="dialog" id="my_modal_2" className="modal-box bg-base-100">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={(e) => {
              e.preventDefault();
              dialogRef.current?.close();
            }}
          >
            ✕
          </button>
          {children}
        </form>
      </dialog>
    );
  },
);

export default ReModal;
