import React, { useRef, useState } from 'react';
import  Box  from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormdata } from '../../service/slice/formData';
import { handlePng } from '../Canvas/Canvas';
import { useEffect } from 'react';



const Properties = () => {
    //import data and declear state from Formdata submission
    const shapedata = useSelector((state) =>state.addShape.shapedata)
    const formdata = useSelector((state) => state.formData.formdata)
    // console.log("updated shappppp",shapedata)
    const dispatch = useDispatch()
    const [shapeName, setShapeName] = useState('')
    const Width = useRef()
    const height = useRef()
    const triWidth = useRef()
    const triHeight = useRef()
    const x = useRef()
    const y = useRef()
    const triX = useRef()
    const triY = useRef()
    const fill = useRef()    
    const triFill = useRef()

    const circleX = useRef()
    const circleY = useRef()
    const circleFill = useRef()
    const radius = useRef()
    const start = useRef()
    const end = useRef()
    
  

    //submit create form
    const handlesubmit = async (e) =>{
        e.preventDefault()
        const properties ={
            id:shapedata.id,
            shapeName:'Rectangle',
            width: Width.current ? Width.current : shapedata.width,
            height:height.current? height.current : shapedata.height,           
            x: x.current ? x.current : shapedata.x,
            y: y.current ? y.current :shapedata.y,
            fill: fill.current ? fill.current : shapedata.fill ,
            isDragging:false
            
        }
        const properties2 ={
            id:shapedata.id,
            shapeName:'Circle',
            radius: radius.current ? radius.current : shapedata.radius,
            start: start.current ? start.current : shapedata.start,           
            end: end.current ? end.current : shapedata.end,           
            x: circleX.current ? circleX.current : shapedata.x,
            y: circleY.current ? circleY.current :shapedata.y,
            fill: circleFill.current ? circleFill.current : shapedata.fill,
            isDragging:false

        }

        const properties3 ={
            id:shapedata.id,
            shapeName:'Triangle',
            width: triWidth.current ? triWidth.current : shapedata.width,
            height:triHeight.current? triHeight.current : shapedata.height,                      
            x: triX.current ? triX.current : shapedata.x,
            y: triY.current ? triY.current :shapedata.y,
            fill: triFill.current ? triFill.current : shapedata.fill,
            isDragging:false

        }
       
        if(shapedata.shapeName==='Rectangle'){
            await dispatch(updateFormdata(properties))
        }
        else if(shapedata.shapeName==='Circle'){
            await dispatch(updateFormdata(properties2))
        }
        else if(shapedata.shapeName==='Triangle'){
            await dispatch(updateFormdata(properties3))
            
        }
        e.target.reset()               
    }

    //save data on local Storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(formdata));
        // console.log("items",localStorage.getItem('items'))
    }, [formdata,shapedata])

    return (
        <>
        <form id="formvalue" action="" onSubmit={handlesubmit}>

            {/* save and export button  */}
        <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
            {
                formdata.length>0 ? 
                <>
                  <Button type="submit"
                    style={{width:'50%', background:'#80D077', border:'none'}}>Save</Button>
                    <Dropdown>
                    <Dropdown.Toggle style={{width:'162px', background:'#FDAF53', color:'white',border:'none'}}  id="dropdown-basic">
                         Export
                    </Dropdown.Toggle>
                        <Dropdown.Menu style={{width:'100%', 
                        background:'#C4C4C4', color:'#FFFFFF'}}>
                            <Dropdown.Item onClick={()=>handlePng()} >PNG</Dropdown.Item>
                            <Dropdown.Item >SVG</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>:
                <>
                  <Button type="submit" disabled
                    style={{width:'50%', background:'#80D077', border:'none'}}>Save</Button>
                    <Dropdown>
                    <Dropdown.Toggle disabled style={{width:'162px', background:'#FDAF53', color:'white',border:'none'}}  id="dropdown-basic">
                         Export
                    </Dropdown.Toggle>
                        <Dropdown.Menu style={{width:'100%', 
                        background:'#C4C4C4', color:'#FFFFFF'}}>
                            <Dropdown.Item onClick={()=>handlePng()} >PNG</Dropdown.Item>
                            <Dropdown.Item >SVG</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            }
                        
            </Box>
            
            {/* Properties data here */}
            <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px', height:'550px'}}>
            <Typography sx={{fontWeight:700, fontSize:'18px', padding:'20px 0px 20px 0px'}}>Properties</Typography>               
                  
                    {
                        shapedata.shapeName==='Triangle'? (
                            <>
                             <input  disabled  className='InputField' type="text" name="shape" id="shape" placeholder="Add a Shape first" onChange={(e) => setShapeName(e.target.value)} defaultValue={shapedata.shapeName}></input>
                                
                                <input className='InputField' type='number'  placeholder="Width" defaultValue={shapedata.width}  onChange={(e) => triWidth.current = parseInt(e.target.value)} ></input>
                                <input className='InputField' type='number'   placeholder="Height" defaultValue={shapedata.height} onChange={(e) => triHeight.current = parseInt(e.target.value)} ></input>
                                <input className='InputField' type='number'   placeholder='X Axis' defaultValue={shapedata.x} onChange={(e) => triX.current = parseInt(e.target.value) } ></input>
                             <input className='InputField' type='number'placeholder="Y Axis" defaultValue={shapedata.y} onChange={(e) => triY.current = parseInt(e.target.value)} ></input>
                             <input className='InputField' type="text" id="color" placeholder='color' defaultValue={shapedata.fill} onChange={(e) => triFill.current = e.target.value} >                       
                            </input>
                            </>
                        ): shapedata.shapeName ==='Circle'?(
                        <>
                             <input  disabled  className='InputField' type="text"  id="shape" placeholder="Add a Shape first" onChange={(e) => setShapeName(e.target.value)} defaultValue={shapedata.shapeName}></input>

                            <input className='InputField' type="number"  placeholder="radius" defaultValue={shapedata.radius} onChange={(e) => radius.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type="number"  placeholder="Start point" defaultValue={shapedata.start} onChange={(e) => start.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type="number"  placeholder="End point" defaultValue={shapedata.end} onChange={(e) => end.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type='number' placeholder='X Axis' defaultValue={shapedata.x} onChange={(e) => circleX.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type='number'  placeholder='Y Axis'  defaultValue={shapedata.y} onChange={(e) => circleY.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type="text" placeholder='color' defaultValue={shapedata.fill} onChange={(e) => circleFill.current = e.target.value} >                       
                            </input>  
                        </>
                        ): (
                            <>
                             <input  disabled  className='InputField' type="text" name="shape" id="shape" placeholder="Add a Shape first" onChange={(e) => setShapeName(e.target.value)} defaultValue={shapedata.shapeName}></input>
                            <input className='InputField' type='number' placeholder='Width' defaultValue={shapedata.width} onChange={(e) => Width.current = parseInt(e.target.value) } ></input>
                             <input className='InputField' type='number' placeholder="Height" defaultValue={shapedata.height} onChange={(e) => height.current = parseInt(e.target.value)} ></input>
                             <input className='InputField' type='number' placeholder='X Axis' defaultValue={shapedata.x} onChange={(e) => x.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type='number'  placeholder='Y Axis'  defaultValue={shapedata.y} onChange={(e) => y.current = parseInt(e.target.value)} ></input>

                            <input className='InputField' type="text" placeholder='color' defaultValue={shapedata.fill} onChange={(e) => fill.current = e.target.value} >                       
                            </input>
                           </>
                            
                        )                        
                    }
            </Box>
            </form>           
        </>
    );
};

export default Properties;