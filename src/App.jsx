import './App.css';
import { Table } from './components/Table';
import { Modal } from './components/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowToEdit, setRowToEdit] = useState(null)

  const handleDeleteRow = (targetIndex) => {
    axios.delete(`http://127.0.0.1:8000/api/pages/${targetIndex}`)
    .then(() => fetchData())
  }

  const handleSubmit = (newRow) => {
    if (rowToEdit === null) {
      axios.post('http://127.0.0.1:8000/api/pages/', newRow).then(() => fetchData())
    } else {
      console.log(rowToEdit)
      const newData = {page: newRow.page, description: newRow.description, status:newRow.status} 
      axios.put(`http://127.0.0.1:8000/api/pages/${newRow.id}/`, newData).then(() => fetchData()).catch((e) => e.message)
    }
  }

  const handleEditRow = (idx) => {
    setRowToEdit(idx);
    setModalOpen(true)
  }

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/pages/')
    .then((response) => response.json())
    .then((json) => {
      setRows(json)
      console.log("json: ", json)
      console.log("rows: ", rows)
    })
    
  }

  useEffect(() => {
    fetchData()
  },[])

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
      defaultValue = {rowToEdit !== null && rows.filter((row) => row.id === rowToEdit)[0]}
      />}
    </div>
  );
}

export default App;
