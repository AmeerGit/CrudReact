import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
//import EmployeeService  from '../service/EmployeeService';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useHistory } from "react-router";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Messages } from 'primereact/messages';
import { Toast } from 'primereact/toast';

const Employee = () => {
    const [products, setProducts] = useState([]);
    const [employeeDialog, setEmployeeDialog] = useState(false);
    // const EmployeeService = new EmployeeService();
    const [editDialog, setEditDialog] = useState(false);
    const [data, setData] = useState({
        employeeName: '',
        employeeId: '',
        salary: '',
        address: [
        ]
    });
    const msgs2 = useRef(null);
    const toast = useRef(null);
    
    useEffect(() => {
        axios.get('http://localhost:8080/getAllEmployee').then(res => setProducts(res.data));
        //EmployeeService.getProductsSmall().then(data => setProducts(data));
    }, [editDialog]); // eslint-disable-line react-hooks/exhaustive-deps

    const history = useHistory();
    
    const add = () => {
        console.log("click", history);
        history.push('/addEmployee');

    }

    const Update = (data: any) => {

        setData(data);
        setEditDialog(true);
    }

    const Delete = (data: any) => {
        axios.delete(`http://localhost:8080/delete/${data.id}`).then(res => {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: ' Deleted', life: 3000 });
            //history.push('/')
        });

    }

    const actionBodyTemplate = (rowData: any) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => Update(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => Delete(rowData)} />
            </React.Fragment>
        );
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const citySelectItems = [
        {label: 'Chennai', value: 'Chennai'},
        {label: 'Mumbai', value: 'Mumbai'},
        {label: 'Bangalore', value: 'Bangalore'},
        {label: 'Pune', value: 'Pune'}
    ];
    
    const addAddress = index => e => {
        
      let newArray = [...data.address];
      newArray[index]['address'] = e.target.value;
       
      setData(prevState => ({
        ...prevState,
        address : newArray
    }));
    };

    const hideDialog = () => {
        setEditDialog(false);
    }

    const UpdateData = (e)=>{
        //console.log("click", history);
        axios.put(`http://localhost:8080//update/${data.id}`, data)
        .then((response: any) => {
            setEditDialog(false);
            //history.push('/');
        }).catch(err => {
            // msgs2.current.show([
            //     { severity: 'error', detail: 'Update  Falied', sticky: true }
            // ]);
        });
      }
    
      const DialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Update" icon="pi pi-check" className="p-button-text" onClick={UpdateData} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <DataTable value={products}>
                    <Column field="employeeId" header="Employee Id"></Column>
                    <Column field="employeeName" header="Employee Name"></Column>
                    <Column field="salary" header="Salary"></Column>
                    <Column body={actionBodyTemplate}>Action</Column>
                </DataTable>
            </div>
            <Dialog visible={editDialog} style={{ width: '450px' }} header="Employee Details" modal 
             footer={DialogFooter} className="p-fluid" onHide={hideDialog}>
            <Messages ref={msgs2}></Messages>
                <div className="p-field p-grid">
                    <label htmlFor="name" className="p-col-fixed" style={{ width: '100px' }}>Name</label>
                    <div className="p-col">
                    <InputText type="text" name="employeeId" value={data.employeeId}
                        onChange={handleChange} />
</div>
                </div>
                <div className="p-field p-grid">
                <label htmlFor="lastname1" className="p-col-fixed" style={{ width: '100px' }}>Name</label>
                <div className="p-col">
                    <InputText id="lastname1" type="text" name="employeeName" value={data.employeeName}
                    onChange={handleChange}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="lastname2" className="p-col-fixed" style={{ width: '100px' }}>Salary</label>
                <div className="p-col">
                    <InputText id="lastname2" type="text"  name="salary" value={data.salary}
                    onChange={handleChange} />
                </div>
            </div>
            {data.address.map((item, index) =>{
                return (
                    <div className="p-field p-grid" key={index}>
                <label htmlFor="lastname2" className="p-col-fixed" style={{ width: '100px' }}>Address {index + 1} </label>
                <div className="p-col">
                <Dropdown   value={item.address} options={citySelectItems} name="address" onChange={addAddress(index)}/>
                </div>
            </div>
                );
            })}
            </Dialog>
        </div>
    );
}

export default Employee;