import { useState } from 'react';
import { Modal, Button, Input } from 'antd';

import './Modal.css';

const EditModal = () => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDone = () => {
    console.log('Input Value:', inputValue);
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit Text"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter some text"
        />
        <div className="modal-footer">
          <Button type="primary" onClick={handleDone}>
            Done
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
