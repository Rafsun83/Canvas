import React, { useEffect } from 'react';
import  Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  Button from 'react-bootstrap/Button';
import { useSelector} from 'react-redux';



var c = document.getElementById("myCanvas");
 export const  handlePng = () =>{        
    var image = c.toDataURL("image/png");
    var anchor = document.createElement('a');
    anchor.setAttribute('download', 'myFilename.png');
    anchor.setAttribute('href', image);
    anchor.click();
}

const Canvas = () => {
    const formdata = useSelector((state) =>state.formData.formdata)
    // console.log("form data canvas", formdata)

    // let canvas = document.getElementById("myCanvas");
    // let cont = document.getContext("2d");
    // canvas.width = window.innerWidth-30;
    // canvas.height = window.innerHeight-10;
    // canvas.style.border ="3px solid red";

    // let canvas_width = canvas.width;
    // let canvas_height = canvas.height;

    // var c = document.getElementById("myCanvas");
    // let mouse_down = (e) => {
    //     e.preventDefault()
    //     console.log(e)
    // } 
    // c.onmousedown = mouse_down



    //Canvas Remove event 
    const handleRemove = (e) => {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    
    }
    
    const drawShape = () => {
        return (
          <>     
            {
                formdata.map((item) => {
                    if(item.shapeName==='Rectangle'){
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                    ctx.fillStyle = item.color;
                    ctx.lineWidth = 2;
                    ctx.fillRect(item.xaxis, item.yaxis, item.width, item.height);

                    let mouse_down = (e) => {
                        e.preventDefault()
                        console.log(item)
                    } 
                    c.onmousedown = mouse_down
                    // const handleRemove = (e) => {
                    //     var canvas = document.getElementById("myCanvas");
                    //     var context = canvas.getContext('2d');
                    //     context.clearRect(0, 0, canvas.width, canvas.height);
                    
                    // }
                    // if(item.shapeName==="Rectangle"){
                    //     handleRemove()
                    // }
                    // c.onmousedown = handleRemove;
                    
                    
                    }
                    else if(item.shapeName==='Circle'){
                        var b = document.getElementById("myCanvas");               
                        var cty = b.getContext("2d");
                        cty.beginPath();
                        cty.fillStyle = item.color;
                        cty.arc(item.xaxis, item.yaxis, item.radius, item.start, item.end * Math.PI);
                        cty.fill();
                        
                    }
                    else if(item.shapeName==='Triangle'){
                        var t = document.getElementById("myCanvas");
                        var context = t.getContext("2d");
                        context.beginPath();
                        context.moveTo(item.xaxis, item.yaxis);
                        context.lineTo(item.xaxis + item.width / 2, item.yaxis + item.height);
                        context.lineTo(item.xaxis - item.width / 2, item.yaxis + item.height);
                        // context.closePath();
                        context.fillStyle = item.color;
                        context.fill()   
                    }                                      
                })
            }
          </>
        )   
    }

    useEffect(() => {
        drawShape()
       
    }, [formdata]);

    return (
        <>
            <Box>
               {/* <Button onClick={handlEvent} id="btnSav">move</Button> */}
                <Button onClick={handleRemove} id="btnSave">remove</Button>
                <Typography sx={{fontSize:'18px',fontWeight:700,padding:'5px 0px 23px 0px'}}>Untitled Canvas</Typography>
                <canvas id="myCanvas" style={{border:"1px solid #617D5E", width:'100%', height:'50vh', borderRadius:'6px'}}>
                    Your browser does not support the HTML canvas tag.
                </canvas>
            </Box>
        </>
    );
};

export default Canvas;