import React, { useState } from 'react';
import Modal from 'react-modal';
import './table.css';

const initialData = [
  {
    id: 1,
    name: 'John Doe',
    age: 25,
    location: 'City A',
    email: 'john@example.com',
    phone: '123-456-7890',
    company: 'ABC Inc',
  },
  {
    id: 2,
    name: 'Jane Smith',
    age: 30,
    location: 'City B',
    email: 'jane@example.com',
    phone: '987-654-3210',
    company: 'XYZ Corp',
  },
  // Add more data as needed
];

Modal.setAppElement('#root'); // Set the root element for the modal

const ResponsiveTable = () => {
  const [data, setData] = useState(initialData);
  const [editRowId, setEditRowId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedFields, setEditedFields] = useState({});

  const toggleMobileView = (id) => {
    setEditRowId(id === editRowId ? null : id);
  };

  const openModal = (fields) => {
    setIsModalOpen(true);
    setEditedFields(fields);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedFields({});
  };

  const handleEdit = (id) => {
    const updatedData = data.map((row) =>
      row.id === id ? { ...row, ...editedFields } : row,
    );
    setData(updatedData);
    closeModal();
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((row) => row.id !== id);
    setData(updatedData);
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {Object.keys(initialData[0]).map((key) => (
          <th key={key} className='Th'>
            {key}
          </th>
        ))}
        <th className='Th'>Actions</th>
      </tr>
    </thead>
  );

  const renderTableCells = (row) =>
    Object.values(row).map((value, index) => (
      <td key={index} className='Td'>
        {value}
      </td>
    ));

  const renderEditButtons = (row) => (
    <td className='Td'>
      <button onClick={() => openModal(row)}>Edit</button>
      {/* from */}

      {/* to */}
      <button onClick={() => handleDelete(row.id)}>Delete</button>
    </td>
  );

  const renderTableBody = () => (
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          {renderTableCells(row)}
          {renderEditButtons(row)}
        </tr>
      ))}
    </tbody>
  );

  const renderEditModal = () => (
    <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
      <h2>Edit</h2>
      {Object.keys(initialData[0]).map((key, index) => (
        <div key={index}>
          <label htmlFor={key}>{key}: </label>
          <input
            type='text'
            id={key}
            value={editedFields[key] || ''}
            onChange={(e) =>
              setEditedFields((prevFields) => ({
                ...prevFields,
                [key]: e.target.value,
              }))
            }
          />
        </div>
      ))}
      <button onClick={() => handleEdit(editedFields.id)}>Save</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );

  return (
    <div className='TableWrapper'>
      <table className='Table'>
        {renderTableHeader()}
        {renderTableBody()}
      </table>

      {/* Render Modal */}
      {renderEditModal()}
    </div>
  );
};

export default ResponsiveTable;
