import React, { useEffect, useState } from 'react';
import  Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch} from 'react-redux';
import { canvasRemove } from '../../service/slice/formData';


//export PNG file download function
 export const  handlePng = () =>{  
    var c = document.getElementById("myCanvas");      
    var image = c.toDataURL("image/png");
    var anchor = document.createElement('a');
    anchor.setAttribute('download', 'myFilename.png');
    anchor.setAttribute('href', image);
    anchor.click();
}

const Canvas = () => {
   //import data and set state
    const formdata = useSelector((state) =>state.formData.formdata)
    const canvasdata = useSelector((state) =>state.formData.canvasRemove)
    const dispatch = useDispatch()
    const [check, setCheck] = useState(0)
  //full canvas clear function

    //Canvas Remove event 
    // const handleRemove = (e) => {
    //     var canvas = document.getElementById("myCanvas");
    //     var context = canvas.getContext('2d');
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    
    // }
   
    // remove canvas image function call
    const removeCanvasData = async () =>{
       await dispatch(canvasRemove())
       setCheck(0)
    }
    
    const drawShape = () => {
        return (
          <>     
            { 
                formdata.map((item) => {
                    if(item.shapeName==='Rectangle' ){
                     console.log("inside item",item)   
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                    ctx.fillStyle =  item.color;
                    ctx.lineWidth = 2;
                    ctx.fillRect(item.xaxis, item.yaxis, item.width, item.height)
                    
                        //Implement Drag on drop code 

                        // var c = document.getElementById("myCanvas");
                        // var ctx = c.getContext("2d");
                        // var BB=c.getBoundingClientRect();
                        // var offsetX=BB.left;
                        // var offsetY=BB.top;
                        // var WIDTH = c.width;
                        // var HEIGHT = c.height;

                        // drag related variables
                        // var dragok = false;
                        // var startX;
                        // var startY;

                          // listen for mouse events
                        // c.onmousedown = myDown;
                        // c.onmouseup = myUp;
                        // c.onmousemove = myMove;
                        // call to draw the scene
                        // draw();

                        // function clear() {
                        //     ctx.clearRect(0, 0, WIDTH, HEIGHT);
                        //    }

                        // draw a single rect
                        // function rect(x,y,w,h) {
                        //     ctx.beginPath();
                        //     ctx.rect(x, y, w, h);
                        //     ctx.closePath();
                        //     ctx.fill();
                        // }

                          // redraw the scene
                        // function draw() {
                            // ctx.fillStyle =  item.color;
                            // ctx.lineWidth = 2;
                            // ctx.fillRect(item.xaxis, item.yaxis, item.width, item.height)
                            // clear();
                            // ctx.fillStyle = "#FAF7F8";
                            // rect(0,0,WIDTH,HEIGHT);
                            // redraw each rect in the rects[] array
                            // for(var i=0;i<rects.length;i++){
                            //     var r=rects[i];
                            //     ctx.fillStyle=r.fill;
                            //     rect(r.x,r.y,r.width,r.height);
                            // }
                        //     ctx.fillStyle = item.color
                        //     rect(item.xaxis, item.yaxis, item.width, item.height);

                        // }


                        // function myDown(e){
                        //      // tell the browser we're handling this mouse event
                        //     e.preventDefault();
                        //     e.stopPropagation();

                        //     // get the current mouse position
                        //     var mx=parseInt(e.clientX-offsetX);
                        //     var my=parseInt(e.clientY-offsetY);

                        //     // test each rect to see if mouse is inside
                        //     dragok=false;
                        //     // for(var i=0;i<rects.length;i++){
                        //     //     var r=rects[i];
                        //         if(mx>item.xaxis && mx<item.xaxis+item.width && my>item.yaxis && my<item.yaxis+item.height){
                        //             // if yes, set that rects isDragging=true
                        //             dragok=true;
                        //             item.isDragging=true;
                        //         }
                        //     // }
                        //     // save the current mouse position
                        //     startX=mx;
                        //     startY=my;

                        // }
                        // // handle mouseup events
                        // function myUp(e){
                        //     // tell the browser we're handling this mouse event
                        //     e.preventDefault();
                        //     e.stopPropagation();

                        //     // clear all the dragging flags
                        //     dragok = false;
                        //     item.isDragging = false;
                        // }
                        // function myMove(e){
                        //     // if we're dragging anything...
                        //     if (dragok){
                    
                        //       // tell the browser we're handling this mouse event
                        //       e.preventDefault();
                        //       e.stopPropagation();
                    
                        //       // get the current mouse position
                        //       var mx=parseInt(e.clientX-offsetX);
                        //       var my=parseInt(e.clientY-offsetY);
                    
                        //       // calculate the distance the mouse has moved
                        //       // since the last mousemove
                        //       var dx=mx-startX;
                        //       var dy=my-startY;
                    
                        //       // move each rect that isDragging 
                        //       // by the distance the mouse has moved
                        //       // since the last mousemove
                        //     //   for(var i=0;i<rects.length;i++){
                        //     //       var r=rects[i];

                        //           if(item.isDragging){
                        //               item.xaxis+=dx;
                        //               item.yaxis+=dy;
                        //           }
                        //     //   }
                    
                        //       // redraw the scene with the new rect positions
                        //       draw();
                    
                        //       // reset the starting mouse position for the next mousemove
                        //       startX=mx;
                        //       startY=my;
                    
                        //     }
                        // }
                    
                    
               
                    if(canvasdata){
                        var canvas = document.getElementById("myCanvas");
                        var con = canvas.getContext('2d');
                        con.clearRect(canvasdata.xaxis, canvasdata.yaxis, canvasdata.width, canvasdata.height);
                        setCheck(1)
                        if(check)
                        {
                            removeCanvasData()
                        }                   
                    }                                       
                    }
                    //draw cricle on canvas
                    else if(item.shapeName==='Circle'){
                        var b = document.getElementById("myCanvas");               
                        var cty = b.getContext("2d");
                        cty.beginPath();
                        cty.fillStyle = item.color;
                        cty.arc(item.xaxis, item.yaxis, item.radius, item.start, item.end * Math.PI);
                        cty.fill();

                        if(canvasdata){
                            var canva = document.getElementById("myCanvas");
                            var conv = canva.getContext('2d');
                            conv.clearRect(canvasdata.xaxis - canvasdata.radius, canvasdata.yaxis - canvasdata.radius, canvasdata.radius * canvasdata.end, canvasdata.radius * canvasdata.end);
                            setCheck(1)
                            if(check)
                            {
                                removeCanvasData()
                            }                        
                        }                        
                    }
                    //darw Triangle on canvas
                    else if(item.shapeName==='Triangle'){
                        var t = document.getElementById("myCanvas");
                        var context = t.getContext("2d");
                        context.beginPath();
                        context.moveTo(item.xaxis, item.yaxis);
                        context.lineTo(item.xaxis + item.width / 2, item.yaxis + item.height);
                        context.lineTo(item.xaxis - item.width / 2, item.yaxis + item.height);
                        context.fillStyle = item.color;
                        context.fill()  
                        
                        if(canvasdata){
                            var can = document.getElementById("myCanvas");
                            var convv = can.getContext('2d');
                            convv.clearRect(0, 0, canvasdata.xaxis + canvasdata.width, canvasdata.yaxis + canvasdata.height);
                            setCheck(1)
                            if(check)
                            {
                                removeCanvasData()
                            }                      
                        }
                    }                     
                })
            }
          </>
        )   
    }

    //draw shape Call
    useEffect(() => {
        drawShape()       
    });

    return (
        <>
            <Box>
                <Typography sx={{fontSize:'18px',fontWeight:700,padding:'5px 0px 23px 0px'}}>Untitled Canvas</Typography>
                <canvas id="myCanvas" style={{border:"1px solid #617D5E", width:'100%', height:'55vh', borderRadius:'6px'}}>
                    Your browser does not support the HTML canvas tag.
                </canvas>
            </Box>
        </>
    );
};

export default Canvas;