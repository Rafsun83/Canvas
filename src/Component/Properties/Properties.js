import React, { useState } from 'react';
import  Box  from '@mui/material/Box';
import Button from 'react-bootstrap/Button';
import { Dropdown } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getformdata } from '../../service/slice/formData';
import { handlePng } from '../Canvas/Canvas';
import { useEffect } from 'react';


const Properties = () => {
    //import data and declear state from Formdata submission
    const data = useSelector((state) =>state.addShape.createShape)
    const formdata = useSelector((state) => state.formData.formdata)
    const dispatch = useDispatch()
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [xaxis, setXaxis] = useState('')
    const [yaxis, setYaxis] = useState('')
    const [color, setColor] = useState('')

    const [radius, setRadius] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')   

    //submit create form
    const handlesubmit = (e) =>{
        e.preventDefault()
        const properties ={
            id:Date.now().toString(),
            shapeName:data,
            width: width,
            height:height,           
            xaxis: xaxis,
            yaxis: yaxis,
            color: color
        }
        const properties2 ={
            id:Date.now().toString(),
            shapeName:data,
            radius: radius,
            start: start,           
            end: end,           
            xaxis: xaxis,
            yaxis: yaxis,
            color: color

        }
        const properties3 ={
            id:Date.now().toString(),
            shapeName:data,
            width: width,
            height:height,                      
            xaxis: xaxis,
            yaxis: yaxis,
            color: color

        }
        if(data==='Rectangle'){
            dispatch(getformdata(properties))
        }
        else if(data==='Circle'){
            dispatch(getformdata(properties2))
        }
        else if(data==='Triangle'){
            dispatch(getformdata(properties3))
        }
        setWidth('')
        setHeight('')
        setXaxis('')
        setYaxis('')
        setColor('')
        setRadius('')
        setStart('')
        setEnd('')                
    }
    //save data on local Storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(formdata));
        console.log("items",localStorage.getItem('items'))
    }, [formdata])

    return (
        <>
        <form id="formvalue" action="" onSubmit={handlesubmit}>
            <Box sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
            {
                data===''? <>
                <Button disabled type="submit"
                style={{width:'50%', background:'#80D077', border:'none'}}>Create Shape</Button>
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
                    <Button type="submit" style={{width:'50%', background:'#80D077', border:'none'}}>Create Shape</Button>
                    <Dropdown>
                        <Dropdown.Toggle style={{width:'162px', background:'#FDAF53', color:'white',border:'none'}}  id="dropdown-basic">
                        Export
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={{width:'100%', background:'#C4C4C4', color:'#FFFFFF'}}>
                            <Dropdown.Item onClick={()=>handlePng()}>PNG</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">SVG</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                  </>
            }
                        
            </Box>
            
            <Box sx={{background:'#F0F8EF', borderRadius:'6px', marginTop:'20px', height:'55vh'}}>
            <Typography sx={{fontWeight:700, fontSize:'18px', padding:'20px 0px 20px 0px'}}>Properties</Typography>               
                    {
                            data===''?<input className='InputField' disabled type="text" name="shape" id="shape" placeholder="Add a Shape first"  ></input>:
                            <input className='InputField' disabled type="text" name="shape" id="shape" placeholder={data}  ></input>
                    }
                    {
                        data==='Triangle'? (
                                <>
                                <input className='InputField' type="number" name="width" id="width" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} ></input>
                                <input className='InputField' type="number" name="height" id="height" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} ></input>
                            </>
                        ): data ==='Circle'?(
                        <>
                            <input className='InputField' type="number" name="radius" id="radius" placeholder="radius" value={radius} onChange={(e) => setRadius(e.target.value)} ></input>

                            <input className='InputField' type="number" name="start" id="start" placeholder="Start point" value={start} onChange={(e) => setStart(e.target.value)} ></input>

                            <input className='InputField' type="number" name="end" id="end" placeholder="End point" value={end} onChange={(e) => setEnd(e.target.value)} ></input>
                        </>
                        ):(
                            <>
                            <input className='InputField' type="number" name="width" id="width" placeholder="Width" value={width} onChange={(e) => setWidth(e.target.value)} ></input>
                             <input className='InputField' type="number" name="height" id="height" placeholder="Height" value={height} onChange={(e) => setHeight(e.target.value)} ></input>
                           </>
                            
                        )
                        
                          
                    }
                        <input className='InputField' type="number" name="xaxis" id="xaxis" placeholder='X Axis' value={xaxis} onChange={(e) => setXaxis(e.target.value)} ></input>

                        <input className='InputField' type="number" name="yaxis" id="yaxis" placeholder='Y Axis' value={yaxis} onChange={(e) => setYaxis(e.target.value)} ></input>

                        <input className='InputField' type="text" name="color" id="color" placeholder='color' value={color} onChange={(e) => setColor(e.target.value)} >                       
                        </input>               
            </Box>
            </form>           
        </>
    );
};

export default Properties;