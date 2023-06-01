import './App.css';
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { useState, useEffect } from 'react';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null)

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_, idx) => idx !== targetIndex))
  }

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      setRows([...rows, newRow])
    } else {
      setRows(rows.map((currRow, idx) => {
        if (idx !== rowToEdit) {
          return currRow
        }
        return newRow
      }))
    }
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true)
  }

 

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:8000/api/pages/')
      .then((response) => response.json())
      .then((json) => {
        setRows(json)
        console.log("json: ", json)
      })
      console.log("rows: ", rows)
    }
    fetchData()
  })

  return (
    <div className="App">
      <Table rows = {rows} deleteRow={handleDeleteRow} editRow={handleEditRow}/>
      <button className='btn' onClick={() => setModalOpen(true)}>
        Add
        </button>
      {modalOpen && <Modal 
      closeModal={() => {
        setModalOpen(false)
        setRowToEdit(null)
      }} 
      onSubmit = {handleSubmit}
      defaultValue = {rowToEdit !== null && rows[rowToEdit]}
      />}
    </div>
  );
}

export default App;
