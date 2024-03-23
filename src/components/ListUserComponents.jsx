import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import './table.css'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListUserComponents = () => {

    const columns = useMemo(
        () =>[
        {
            Header: 'Name',
            accessor: 'name'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Header: 'Action',
            accessor: 'id',
            Cell: ({value}) => (<tr><td><button onClick={() => navigate('/update-users/'+value)}>Update</button></td>
                                <td><button onClick={() => Delete(value)}>Delete</button></td></tr>)
        }
    ],
    []
)

    const [data,setData] = useState([]);
    const navigate = useNavigate();

    useEffect (() => {
        loaduser();
    },[]);

    const loaduser = async() => {
        // const result = await axios.get('http://localhost:8081/api/v1/users');
        const result = await axios.get('http://localhost:8081/api/users');
        setData(result.data.sort((a, b) => (a.id - b.id)));
    }

    const tableInstance = useTable({
        columns: columns,
        data: data,
    })

    const { getTableProps, getTableBodyProps, headerGroups,
        rows, prepareRow } =
        tableInstance;

    const showAddModal = () => {
        navigate('/add-users')
    };

    const Delete = async (id) => {
        await axios.delete(`http://localhost:8081/api/users/${id}`);
        loaduser();
    };

    return (
        <div>
            <h2>User List</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>

                <div style={{  paddingTop: "20px" }}>
                    <Button variant="outlined" color="success" startIcon={<AddIcon/>} onClick={(e) => showAddModal()} style={{textTransform:"capitalize"}}>
                        Add New User 
                    </Button>
                </div>

            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return(
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
    </div>

    )

}

export default ListUserComponents