import React from 'react';
import { Dropdown, ListGroupItem } from 'react-bootstrap';
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
import { canvasRemove, deleteformdata, getformdata } from '../../service/slice/formData';
import { useState } from 'react';

const shape = [ "Rectangle", "Circle", "Triangle"];


const Panel = () => {
    const {users} = useAuth()
    const dispatch = useDispatch()
    const formdata = useSelector((state) =>state.formData.formdata)
    
    const [width, setWidth] = useState(20)
    const [height, setHeight] = useState(20)
    const [recXaxis, setRecXaxis] = useState(30)
    const [recYaxis, setRecYaxis] = useState(30)
    const [triXaxis, setTriXaxis] = useState(70)
    const [triYaxis, setTriYaxis] = useState(30)
    const [circleXaxis, setCircleXaxis] = useState(100)
    const [circleYaxis, setCircleYaxis] = useState(30)
    const [color, setColor] = useState('red')

    const [radius, setRadius] = useState(15)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(2) 
    // console.log("hello id", itemid)
    console.log("count formdata", Object.keys(formdata).length)
    var arrObjectLength = Object.keys(formdata).length;



    const handleChangeShape = async(item) => {
        await dispatch(AddShape(item))
        // e.preventDefault()
        console.log("checkNow",formdata)
        const properties ={
            id:Date.now().toString(),
            shapeName:item,
            width: width,
            height:height,           
            xaxis: arrObjectLength ? recXaxis+(arrObjectLength*10) : recXaxis,
            yaxis: arrObjectLength ? recYaxis+(arrObjectLength*10) : recYaxis,
            color: color
        }
        const properties2 ={
            id:Date.now().toString(),
            shapeName:item,
            radius: radius,
            start: start,           
            end: end,           
            xaxis: arrObjectLength ? circleXaxis+(arrObjectLength*10) : circleXaxis ,
            yaxis: arrObjectLength ? circleYaxis+(arrObjectLength*10) : circleYaxis,
            color: 'blue'

        }
        const properties3 ={
            id:Date.now().toString(),
            shapeName:item,
            width: width,
            height:height,                      
            xaxis: arrObjectLength ? triXaxis+(arrObjectLength*10) : triXaxis,
            yaxis: arrObjectLength ? triYaxis+(arrObjectLength*10) : triYaxis,
            color: 'green'

        }
        if(item==='Rectangle'){
            dispatch(getformdata(properties))
        }
        else if(item==='Circle'){
            dispatch(getformdata(properties2))
        }
        else if(item==='Triangle'){
            dispatch(getformdata(properties3))
        }
        // setWidth('')
        // setHeight('')
        // setXaxis('')
        // setYaxis('')
        // setColor('')
        // setRadius('')
        // setStart('')
        // setEnd('')  
    }
    const handleDelete = async(item) => {

        await dispatch(canvasRemove(item))
       await dispatch(deleteformdata(item.id))
    //    await dispatch(canvasRemove())
        // console.log("helloid: ", item)
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

            { formdata.map((item) => (
                 <ListGroup key={item.id}  style={{display:'flex',textAlign:'left', gap:'5px'}}>         
                          <ListGroup.Item style={{display:'flex', gap:'3px', marginTop:'5px'}} disabled>
                           {item.shapeName==='Rectangle'&& <RectangleIcon sx={{color:item.color}}/>}
                           {item.shapeName==='Circle'&& <CircleIcon sx={{color:item.color}}/>}
                           {item.shapeName==='Triangle'&& <ReportProblemIcon sx={{color:item.color}}
                           />}
                           {item.shapeName}
                                           
                           </ListGroup.Item>
                           <button style={{border:'1px solid gray', borderRadius:'5px'}} onClick={() => handleDelete(item)} >Remove {item.shapeName}</button>
                          
                 </ListGroup> 
            ))
                    
            }
                 
        </Box>
        </>
    );
};

export default Panel;