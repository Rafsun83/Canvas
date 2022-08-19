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
import { deleteformdata, getformdata } from '../../service/slice/formData';
import { useState } from 'react';

//declear shape data array
const shape = [ "Rectangle", "Circle", "Triangle"];

const Panel = () => {
    //declear useAuth for Authentication And get Shape Drwaing data
    const dispatch = useDispatch()
    const formdata = useSelector((state) =>state.formData.formdata)
    const shapedata = useSelector((state) =>state.addShape.shapedata)
    

    //declear state for eidit shape name 
    const [toggle, setToggle] = React.useState(true);
    const [text, setText] = React.useState("Rectangle");
  
    function toggleInput() {
      setToggle(false);
    }
    function handleChange(event) {
      setText(event.target.value);
    }

    
    //declear state for default shape drwing in canvas
    const [width] = useState(20)
    const [height] = useState(20)
    const [recXaxis] = useState(15)
    const [recYaxis] = useState(15)
    const [triXaxis] = useState(70)
    const [triYaxis] = useState(30)
    const [circleXaxis] = useState(100)
    const [circleYaxis] = useState(30)
    const [color] = useState('#FEE7D1')
    const [radius] = useState(50)
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
            shapeName: 'Rectangle',
            width: 90,
            height:80,           
            x: (arrObjectLength ? recXaxis+(arrObjectLength*10) : recXaxis),
            y: (arrObjectLength ? recYaxis+(arrObjectLength*10) : recYaxis),
            fill: "#D9E7D7",
            isDragging:false
        }
        const properties2 ={
            id:Date.now().toString(),
            shapeName:item,
            radius: radius,
            start: start,           
            end: end,           
            x: arrObjectLength ? circleXaxis+(arrObjectLength*10) : circleXaxis ,
            y: arrObjectLength ? circleYaxis+(arrObjectLength*10) : circleYaxis,
            fill: '#DDE8F9',
            isDragging:false

        }
        const properties3 ={
            id:Date.now().toString(),
            shapeName:item,
            width: 100,
            height:60,                      
            x: arrObjectLength ? triXaxis+(arrObjectLength*20) : triXaxis,
            y: arrObjectLength ? triYaxis+(arrObjectLength*20) : triYaxis,
            fill: 'green',
            isDragging:false

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

    // //Create Shape Action
    // const handleCreateShape = async(item) =>{
    //     await dispatch(creteShape(item))
    // }

    // //Delete Canvas Drawing image
    // const handleDelete = async(item) => {
    //     // await dispatch(canvasRemove(item))
    //     await dispatch(deleteformdata(item.id))
    // }

    return (
        <> 
        {/* add shape button */}
        <Box sx={{display:'flex',alignItems:'center'}}>
            <Dropdown style={{width:'100%'}}>
                <Dropdown.Toggle  
                style={{width:'100%',background:'#4DC2E7', color:'white', border:'none'}} variant="success" id="dropdown-basic" 
                >
                Add Shape
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
        </Box>

        {/* show shape in panel component */}
        <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px',height:'550px',padding:'20px', position:'inherit', zIndex:1, overflow:'scroll'}}>
            <Typography sx={{fontWeight:700, fontSize:'18px', padding:'20px 0px 20px 0px'}}>Shapes</Typography>

             {
               formdata.length<1&& <ListGroup>
                <ListGroup.Item style={{color:'#898F88'}}>
                    Add a Shape first
                </ListGroup.Item>
               </ListGroup>
             }
            { formdata.map((item) => (
                 <ListGroup key={item.id}>
                     <ListGroup.Item style={{display:'flex',alignItems:'center', gap:'3px', marginTop:'5px', height:'60px'}} >
                        {item.shapeName==='Rectangle'&& <RectangleIcon sx={{color:item.fill}}/>}
                        {item.shapeName==='Circle'&& <CircleIcon sx={{color:item.fill}}/>}
                        {item.shapeName==='Triangle'&& <ReportProblemIcon sx={{color:item.fill}}
                        />}
                         { 
                             toggle? <p style={{marginBottom:'0px'}} onDoubleClick={toggleInput} >{item.shapeName}</p>:item.id===shapedata.id ? <input style={{ border:'1px solid #52D5FF', width:'100%', height:'40px'}} type="text" defaultValue={item.shapeName} onChange={handleChange} />:
                             <input style={{border:'#52D5FF', width:'100%', height:'40px'}} type="text" defaultValue={item.shapeName} onChange={handleChange} />
                         }                                         
                        </ListGroup.Item>
                 </ListGroup>               
            ))                   
            }
        </Box>
        </>
    );
};

export default Panel;