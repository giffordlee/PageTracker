import React from 'react'
import "./Table.css"
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"
export const Table = ({rows, deleteRow, editRow}) => {
  return (
    <div className='table-wrapper'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Page</th>
                    <th className='expand'>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((row) => {
                        const statusText = row.status.charAt(0).toUpperCase() + row.status.slice(1)
                        return (
                            <tr key={row.id}>
                                <td>{row.page}</td>
                                <td className='expand'>{row.description}</td>
                                <td><span className={`label label-${row.status}`}>{statusText}</span></td>
                                <td>
                                    <span className='actions'>
                                        <BsFillTrashFill onClick={() => deleteRow(row.id)} className='delete-btn'/>
                                        <BsFillPencilFill onClick={() => editRow(row.id)}/>
                                    </span>
                                </td>
                            </tr>    
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
