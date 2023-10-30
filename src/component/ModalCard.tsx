import React from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

type TModalProps = {
  title: string,
  size: 'sm' | 'lg' | 'xl',
  show: boolean,
  handleClose: () => void,
  handleCreate: () => void,
  children?: React.ReactNode,
};

const ModalCard: React.FC<TModalProps> = ({ title, size, show, handleClose, handleCreate, children }) => {

  return (
    <Modal show={show} size={size} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreate}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCard;
