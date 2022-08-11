import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import  Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddShape } from '../../service/slice/addShape';
import ListGroup from 'react-bootstrap/ListGroup';

const shape = ["Rectangle", "Circle", "Triangle"];


const Panel = () => {
    const dispatch = useDispatch()
   
    const data = useSelector((state) =>state)
    const formdata = useSelector((state) =>state.formData.formdata)
    // console.log("formdata",formdata);

    const handleChangeShape = async(item) => {
        await dispatch(AddShape(item))
    }

    
    return (
        <>
        <Dropdown>
            <Dropdown.Toggle style={{width:'100%',background:'#4DC2E7', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
            >
                Add Shape
            </Dropdown.Toggle>

            <Dropdown.Menu style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
                    {shape.map((item, i) => (
                    <Dropdown.Item
                    key={i}
                    as="button"
                    onClick={() => handleChangeShape(item)}
                    >

                    
                    {item}
                    
                    
                    </Dropdown.Item>
                ))}


            </Dropdown.Menu>
        </Dropdown>


        <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px', height:'50vh'}}>
            <Typography sx={{fontWeight:700, fontSize:'18px', padding:'20px 0px 20px 0px'}}>Shapes</Typography>
            {/* <input style={{border:'none', borderRadius:'6px',padding:'5px', opacity:'0.7'}} placeholder="Add a Shape first" ></input> */}
            <ListGroup style={{textAlign:'left'}}>
                {
                  formdata.map((item,i) => (
                    <ListGroup.Item key={i} disabled>{item.shapeName}</ListGroup.Item>    
                       
                    ))
                    
                }
            </ListGroup>
            
        </Box>
        </>
    );
};

export default Panel;<h1>This is panel</h1>