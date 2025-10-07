interface PopupProps {
  title: string;
  message: string;
  onClose: () => void;
}

const Popup:React.FC<PopupProps> = ({ title, message, onClose }) => {
  return (
     <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <p className="modal-message">{message}</p>
        <button className="modal-close-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  )
}

export default Popup;