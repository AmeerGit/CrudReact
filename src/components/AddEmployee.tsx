import React, { Fragment, useRef, useState } from 'react'
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { useHistory } from "react-router";

const AddEmployee = () => {

    const msgs2 = useRef(null);
    //const history = useHistory();
    
    const [data,setData] = useState({
        employeeName : '',
        employeeId : '',
        salary : '',
        address : [
        ]

    });
    const save = ()=>{
        //console.log("click", history);

        const data1 = {
            employeeName : data.employeeName,
            employeeId : data.employeeId,
            salary : data.salary,
            address : [
                { address : data.address[0]},
                { address : data.address[1]}
            ]
        }
        axios.post('http://localhost:8080/addEmployee', data1)
        .then((response: any) => {
            msgs2.current.show([
                { severity: 'success', summary: 'Success', detail: 'Saved Successfully', sticky: true }
            ]);
            //history.push('/');
        }).catch(err => {
            msgs2.current.show([
                { severity: 'error', detail: 'Save  Falied', sticky: true }
            ]);
        });
      }
      
      const handleChange = e => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const addAddress = (e ) => {
        setData(prevState => ({
            ...prevState,
            address : prevState.address.concat(e.value)
        }));
    };

    const citySelectItems = [
        {label: 'Chennai', value: 'Chennai'},
        {label: 'Mumbai', value: 'Mumbai'},
        {label: 'Bangalore', value: 'Bangalore'},
        {label: 'Delhi', value: 'Delhi'}
    ];
    
    //Edit scenario

    const location = useLocation();

    // useEffect(() => {
    //     setData(location.state.data);
    //     // result: 'some_value'
    // }, [location]);


    return (
        <Fragment>
            <Messages ref={msgs2}></Messages>
        <div className="p-fluid" >
            <div className="p-field p-grid">
                <label className="p-col-fixed" style={{ width: '100px' }}>Employee ID </label>
                <div className="p-col">
                    <InputText  type="text" name="employeeId" value={data.employeeId}
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
            <div className="p-field p-grid">
                <label htmlFor="lastname2" className="p-col-fixed" style={{ width: '100px' }}>Address 1</label>
                <div className="p-col">
                <Dropdown   value={data.address[0]} options={citySelectItems} name="address" onChange={addAddress}/>
                </div>
            </div>
            <div className="p-field p-grid">
                <label htmlFor="lastname2" className="p-col-fixed" style={{ width: '100px' }}>Address 2</label>
                <div className="p-col">
                <Dropdown   value={data.address[1]} options={citySelectItems} name="address"  onChange={addAddress}/>
                </div>
            </div>
            
        </div>
        <br></br>
        <Button label="Save" onClick={save}/>
        <br></br>
        

        </Fragment>
    )
}
export default AddEmployee;