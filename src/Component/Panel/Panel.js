import React from 'react';
import { Dropdown } from 'react-bootstrap';
import  Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AddShape } from '../../service/slice/addShape';
import ListGroup from 'react-bootstrap/ListGroup';
import useAuth from './../../Hooks/useAuth';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

const shape = [ "Rectangle", "Circle", "Triangle"];


const Panel = () => {
    const {users} = useAuth()
    const dispatch = useDispatch()
    const formdata = useSelector((state) =>state.formData.formdata)
    console.log("form data", formdata)
    const handleChangeShape = async(item) => {
        await dispatch(AddShape(item))
    }   
    return (
        <>
        <Dropdown>
            <Dropdown.Toggle  style={{width:'100%',background:'#4DC2E7', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
            >
                Add Shape
            </Dropdown.Toggle>

            <Dropdown.Menu style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
                    {shape.map((item, i) => (
                    <Dropdown.Item
                    style={{display:'flex', gap:'3px'}}
                    key={i}
                    as="button"
                    onClick={() => handleChangeShape(item)}
                    >
                     {item==="Rectangle" && <CropSquareIcon/>}                       
                     {item==="Circle" && <CircleOutlinedIcon/>}                       
                     {item==="Triangle" && <ChangeHistoryOutlinedIcon/>}                       
                    {item}                   
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>


        <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px', height:'50vh'}}>
            <Typography sx={{fontWeight:700, fontSize:'18px', padding:'20px 0px 20px 0px'}}>Shapes</Typography>
            <ListGroup style={{textAlign:'left', gap:'10px'}}>
            {
                    formdata.map((item,i) => (
                     <ListGroup.Item key={i} style={{display:'flex', gap:'3px'}} disabled>
                      {item.shapeName==='Rectangle'&& <RectangleIcon sx={{color:item.color}}/>}
                      {item.shapeName==='Circle'&& <CircleIcon sx={{color:item.color}}/>}
                      {item.shapeName==='Triangle'&& <ReportProblemIcon sx={{color:item.color}}/>}
                      
                      {item.shapeName}
                      </ListGroup.Item>
                        
                      ))                   
            }
             {/* {
                 users?.email ? <>
                
                 </> :
                 <ListGroup.Item  disabled>Add a Shape first</ListGroup.Item> 
             } */}
                
            </ListGroup>           
        </Box>
        </>
    );
};

export default Panel;