import React from 'react';
import { Dropdown} from 'react-bootstrap';
import  Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { AddShape, creteShape } from '../../service/slice/addShape';
import ListGroup from 'react-bootstrap/ListGroup';
import useAuth from './../../Hooks/useAuth';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ChangeHistoryOutlinedIcon from '@mui/icons-material/ChangeHistoryOutlined';
import RectangleIcon from '@mui/icons-material/Rectangle';
import CircleIcon from '@mui/icons-material/Circle';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import DeleteIcon from '@mui/icons-material/Delete';
import { canvasRemove, deleteformdata, getformdata } from '../../service/slice/formData';
import { useState } from 'react';
//declear shape data array
const shape = [ "Rectangle", "Circle", "Triangle"];

const Panel = () => {
    //declear useAuth for Authentication And get Shape Drwaing data
    const {users} = useAuth()
    const dispatch = useDispatch()
    const formdata = useSelector((state) =>state.formData.formdata)
    
    //declear state for default shape drwing in canvas
    const [width] = useState(20)
    const [height] = useState(20)
    const [recXaxis] = useState(30)
    const [recYaxis] = useState(30)
    const [triXaxis] = useState(70)
    const [triYaxis] = useState(30)
    const [circleXaxis] = useState(100)
    const [circleYaxis] = useState(30)
    const [color] = useState('red')
    const [radius] = useState(15)
    const [start] = useState(0)
    const [end] = useState(2) 
    
    
    // Declearing Object length for Dynamic Axis changes
    var arrObjectLength = Object.keys(formdata).length;
    //Default Add Shape For Drawimg Action
    const handleChangeShape = async(item) => {
        await dispatch(AddShape(item))
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
    }

    //Create Shape Action
    const handleCreateShape = async(item) =>{
        await dispatch(creteShape(item))
    }

    //Delete Canvas Drawing image
    const handleDelete = async(item) => {
        await dispatch(canvasRemove(item))
        await dispatch(deleteformdata(item.id))
    }

    return (
        <> 
        <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
            <Dropdown>
                <Dropdown.Toggle  
                style={{width:'100%',background:'#4DC2E7', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
                >
                Default Add Shape
                </Dropdown.Toggle>

                    <Dropdown.Menu 
                        style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
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
        {
            users?.email ? 
            <Dropdown>
                <Dropdown.Toggle  
                style={{width:'100%',background:'green', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
                >
                Create Add Shape
                </Dropdown.Toggle>
                    <Dropdown.Menu 
                        style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
                        {shape.map((item, i) => (
                        <Dropdown.Item
                        style={{display:'flex', gap:'3px'}}
                        key={i}
                        as="button"
                        onClick={() => handleCreateShape(item)}
                        >
                        {item==="Rectangle" && <CropSquareIcon/>}                       
                        {item==="Circle" && <CircleOutlinedIcon/>}                       
                        {item==="Triangle" && <ChangeHistoryOutlinedIcon/>}                       
                        {item}                   
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>:
        <Dropdown>
        <Dropdown.Toggle disabled 
            style={{width:'100%',background:'#4DC2E7', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
            >
           Create Add Shape
        </Dropdown.Toggle>

        <Dropdown.Menu 
                style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
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
        }
        </Box>
        <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px', height:'55vh'}}>
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
                           <button style={{border:'1px solid gray', borderRadius:'5px 5px 0px 0px', fontWeight:500}} onClick={() => handleDelete(item)} ><DeleteIcon sx={{color:'#ed5e68'}}/> Remove {item.shapeName}</button>
                          
                 </ListGroup> 
            ))                   
            }                
        </Box>
        </>
    );
};

export default Panel;