import React, { useEffect, useRef} from 'react';
import  Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch} from 'react-redux';
import {  deleteformdata, updateFormdata } from '../../service/slice/formData';
import { shapeData } from '../../service/slice/addShape';



//export PNG file download function
 export const  handlePng = () =>{  
    var c = document.getElementById("myCanvas");      
    var image = c.toDataURL("image/png");
    var anchor = document.createElement('a');
    anchor.setAttribute('download',`myFilename.png`);
    anchor.setAttribute('href', image);
    anchor.click();
}

const Canvas = () => {
  
   //import data and set state
    const formdata = useSelector((state) =>state.formData.formdata)
    const shapedata = useSelector((state) =>state.addShape.shapedata)
    const dispatch = useDispatch()
    const crossButton = useRef({})
    
    //state declear for eidit canvas name
    const [toggle, setToggle] = React.useState(true);
    const [text, setText] = React.useState("Untitled Canvas");
 
    function toggleInput() {
      setToggle(false);
    }
    function handleChange(event) {
      setText(event.target.value);
    }

    //Draw in canvas function
        const Dargdrop =() => {
   
                // get canvas related references
                var canvas=document.getElementById("myCanvas");
                var ctx=canvas.getContext("2d");
                var BB=canvas.getBoundingClientRect();
                var offsetX=BB.left;
                var offsetY=BB.top;
                var WIDTH = canvas.width;
                var HEIGHT = canvas.height;

                var elemLeft = canvas.offsetLeft + canvas.clientLeft
                var elemTop = canvas.offsetTop + canvas.clientTop
            
                // drag related variables
                var dragok = false;
                var startX;
                var startY;
            
                // an array of objects that define different rectangles
                var rects=[];
                for(var i=0;i<formdata.length;i++){
                    if(formdata[i].shapeName==='Rectangle'){
                        rects.push({id:formdata[i].id, shapeName: formdata[i].shapeName, x:formdata[i].x,y:formdata[i].y,width:formdata[i].width,height:formdata[i].height,fill:formdata[i].fill,isDragging:formdata[i].isDragging});
                    }
                    else if(formdata[i].shapeName==='Circle'){
                        rects.push({id:formdata[i].id, shapeName: formdata[i].shapeName, x:formdata[i].x,y:formdata[i].y, radius: formdata[i].radius, start:formdata[i].start,end:formdata[i].end,fill:formdata[i].fill,isDragging:formdata[i].isDragging});
                    }
                    else if(formdata[i].shapeName==='Triangle'){
                        rects.push({id:formdata[i].id, shapeName: formdata[i].shapeName, x:formdata[i].x,y:formdata[i].y,width:formdata[i].width,height:formdata[i].height,fill:formdata[i].fill,isDragging:formdata[i].isDragging});
                    }                  

            }

                console.log("Updated  formdata", formdata)
                console.log("Updated  rectsdata", rects)
               
            
                const updateData= async(elem)=>{
                    await dispatch(shapeData(elem))
                    await dispatch(updateFormdata(elem))                   
                }
                const handleDelete = async(id)=>{                   
                    await dispatch(deleteformdata(id))
                    
                }
    
                // listen for mouse events
                canvas.onmousedown = myDown;
                canvas.onmouseup = myUp;
                canvas.onmousemove = myMove;
                canvas.onclick = myClick;
                         
                function myClick(event) {
                    var x = event.pageX - elemLeft,
                        y = event.pageY - elemTop;
                      
                        var mx=parseInt(event.clientX-offsetX);
                        var my=parseInt(event.clientY-offsetY);
                    
    
                    // Collision detection between clicked offset and element.
                    rects.forEach(function(element) {
                        console.log("all Element", element)

                        //Shape Move Update Value for Rectangle
                        if(element.shapeName==='Rectangle'){
                            if (y > element.y && y < element.y + element.height 
                                && x > element.x && x < element.x + element.width) {
                                console.log('updated element data',element)
                                crossButton.current = element
                                console.log('single element',crossButton.current)
                                updateData(element)                                               
                            }
                        }

                         //Shape Move Update Value for circle
                      if(element.shapeName==='Circle'){
                            var dx = element.x - mx;
                            var dy =element.y - my;
                            if(dx * dx + dy * dy <= element.radius*element.radius){  
                                crossButton.current = element
                                updateData(element)                             
                            }
                        }

                         //Shape Move Update Value for triangle
                        if(element.shapeName === 'Triangle'){
                            if(mx<element.x+element.width/8 && mx>element.x-element.width/8 && my<element.y+element.height*1.7 && my>element.y-element.height/3.5){                              
                                crossButton.current = element
                                updateData(element)                                
                            }
                        }

                        //Rectangle shape delete from canvas
                        if (crossButton.current.shapeName === 'Rectangle' && y > crossButton.current.y && y < crossButton.current.y+ 10
                            && x > crossButton.current.x && x < crossButton.current.x + 10)
                            {
                                handleDelete(crossButton.current.id)
                                crossButton.current = {}                             
                            }
                        
                        //Circle shape delete from canvas
                        if(crossButton.current.shapeName === 'Circle'){
                        if(dx * dx + dy*dy <= 5*5)
                        {
                            handleDelete(crossButton.current.id)
                            crossButton.current = {}
                        }
                        }

                        //Triangle shape delete from canvas
                        if(crossButton.current.shapeName === 'Triangle'){
                            if(mx<crossButton.current.x+10/8 && mx>crossButton.current.x-10/8 && my<crossButton.current.y+13*1.7 && my>crossButton.current.y-10/3.5){
                                handleDelete(crossButton.current.id)
                                crossButton.current = {}
                            }
                        }
                        
                        //Remove Rectangle cross button when click canvas
                        if(element.shapeName==='Rectangle' && crossButton.current.id === element.id){
                            ctx.fillStyle= element.fill;                          
                            rec(element.x,element.y,element.width, element.height)                         
                            close_button(element.x,element.y,10) 
                            function close_button(x,y,side){                  
                                ctx.fillRect(x+1, y+1, side, side);                               
                                ctx.beginPath();
                              }
                              rect(element.x, element.y, element.h, element.w)
                              function rec(x,y,w,h){
                                ctx.strokeStyle='#faf7f8';
                                ctx.strokeRect(x,y, w,h);
                                ctx.lineWidth =0;
                                
                              }
                              function rect(x,y,w,h,) {
                                ctx.beginPath();
                                ctx.rect(x,y,w,h);
                                ctx.fillRect(x,y,w,h);
                               }
                             
                            }

                             //Remove Circle cross button when click canvas
                            if(element.shapeName==='Circle' && crossButton.current.id === element.id){
                                ctx.fillStyle= element.fill;                          
                                arc(element.x,element.y, element.radius, element.start,element.end)
                                close_button(element.x-6,element.y-6,10,element.strat, element.end)                         
                                close_button(element.x,element.y,10) 
                                function close_button(x,y,side){                  
                                    ctx.fillRect(x+1, y+1, side, side);                               
                                    ctx.beginPath();
                                  }
                                function arc(x,y,r,start,end){
                                    ctx.beginPath();
                                    ctx.arc(x, y, r, start, end * Math.PI);
                                    ctx.strokeStyle = '#faf7f8';
                                    ctx.stroke();   
                                }
                            }

                            //Remove Triangle cross button when click canvas
                            if(element.shapeName==='Triangle' && crossButton.current.id === element.id){
                                ctx.fillStyle= element.fill;
                                tri(element.x,element.y,element.width, element.height)
                                close_button(element.x-5,element.y,10)                          
                                
                                close_button(element.x-5,element.y,10)                         
                                function close_button(x,y,side){                  
                                    ctx.fillRect(x, y+15, side, side);                           
                                    ctx.beginPath();
                                  }
                            }                                            
                    });                
                };
                                       
                // call to draw the scene
                draw();
            
                // draw a single rect
                function rect(x,y,w,h,) {
                 ctx.beginPath();
                 ctx.rect(x,y,w,h);
                 ctx.fillRect(x,y,w,h);
                 ctx.lineWidth =1;
                 ctx.fill(); 
                }

                // draw a cross button
                function close_button(x,y,side){                  
                    ctx.fillRect(x, y, side, side);                 
                    var shift = side/10;                 
                    ctx.beginPath();
                    ctx.moveTo(x + shift, y + shift);
                    ctx.lineTo(x + side - shift, y + side - shift);
                    ctx.moveTo(x + side - shift, y + shift);
                    ctx.lineTo(x + shift, y + side - shift);
                    ctx.strokeStyle = '#FFFFFF';
                    ctx.stroke();
                  }

                //drw rect cross
                function rec(x,y,w,h){
                    ctx.strokeStyle='#47BDFF';
                    ctx.strokeRect(x,y, w,h);
                    
                }

                //draw circle 
                function arcc(x,y,r,start,end) {
                        ctx.beginPath();
                        ctx.arc(x, y, r, start, end * Math.PI);
                        ctx.closePath();
                        ctx.fill();       
                }
                //draw circle cross and border
                function arc(x,y,r,start,end){
                    ctx.beginPath();
                    ctx.arc(x, y, r, start, end * Math.PI);
                    ctx.strokeStyle = '#47BDFF';
                    ctx.stroke();   
                }

                //Draw triangle
                function tri(x,y,h,w){
                    ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(x + w / 2, y + h);
                        ctx.lineTo(x - w / 2, y + h);
                        ctx.fill()
                        ctx.closePath();

                }

                // clear the canvas
                function clear() {
                 ctx.clearRect(0, 0, WIDTH, HEIGHT);
                }
            
                // redraw the scene
                function draw() {
                    clear();
                    ctx.fillStyle = "#FAF7F8";
                    rect(0,0,WIDTH,HEIGHT);
                                      
                    for(var i=0;i<rects.length;i++){
                        var r=rects[i];
                        
                        if(r.shapeName==='Rectangle'){
                        ctx.fillStyle=r.fill;
                        rect(r.x,r.y,r.width,r.height);
                       
                        }
                        else if(r.shapeName==='Circle')
                        {
                            ctx.fillStyle=r.fill;
                            arcc(r.x,r.y,r.radius,r.start,r.end)
                        }
                        else if(r.shapeName==='Triangle'){
                            ctx.fillStyle=r.fill;
                            tri(r.x, r.y, r.width, r.height)
                        }
                        
                        
                        // console.log('crossRef',test)
                            if(crossButton.current.id===r.id){
                            if(r.shapeName==='Rectangle'){
                            ctx.fillStyle='red';                          
                            // rect(r.x-10,r.y-10,10,10) 
                            rec(r.x,r.y,r.width, r.height)
                            close_button(r.x+1, r.y+1,10)    
                              
                                                                        
                            }
                            else if(r.shapeName==='Circle')
                            {
                                ctx.fillStyle='red';
                                arc(r.x,r.y, r.radius, r.start,r.end)
                                close_button(r.x-5,r.y-5,10,r.strat, r.end)
                            }
                            else if(r.shapeName==='Triangle'){
                                ctx.fillStyle='red';
                                tri(r.x, r.y, r.w, r.h)
                                close_button(r.x-5,r.y+13,10)
                            }                         
                            }                          
                    }
                }
           
                // handle mousedown events
                function myDown(e){
            
                    // tell the browser we're handling this mouse event
                    e.preventDefault();
                    e.stopPropagation();
            
                    // get the current mouse position
                    var mx=parseInt(e.clientX-offsetX);
                    var my=parseInt(e.clientY-offsetY);
                    
                    // test each rect to see if mouse is inside
                    dragok=false;
                    for(var i=0;i<rects.length;i++){
                        var r=rects[i];
                        if(r.shapeName==='Rectangle'){
                        if(mx>r.x && mx<r.x+r.width && my>r.y && my<r.y+r.height){
                            // if yes, set that rects isDragging=true
                            dragok=true;
                            r.isDragging=true; 
                        }
                    }
                    else if(r.shapeName==='Circle')
                    {
                        var dx = r.x - mx;
                        var dy = r.y - my;
                        if (dx * dx + dy * dy <= r.radius*r.radius) {
                            // if yes, set that circles isDragging=true
                            dragok = true;
                            r.isDragging = true;
                        }
                    }
                    else if(r.shapeName === 'Triangle')
                    {
                        if(mx<r.x+r.width/8 && mx>r.x-r.width/8)
                        {
                            if(my<r.y+r.height*1.7 && my>r.y-r.height/3.5){
                            dragok = true;
                            r.isDragging = true;
                            }
                        }
                    }
                    }
                   
                    
                    // save the current mouse position
                    startX=mx;
                    startY=my;
                    
                }
            
            
                // handle mouseup events
                function myUp(e){
                    // tell the browser we're handling this mouse event
                    e.preventDefault();
                    e.stopPropagation();

                    // clear all the dragging flags
                    dragok = false;
                    for(var i=0;i<rects.length;i++){
                        rects[i].isDragging=false;
                        
                    }
                }
              
                // handle mouse moves
                function myMove(e){
                    // if we're dragging anything...
                    if (dragok){
            
                      // tell the browser we're handling this mouse event
                      e.preventDefault();
                      e.stopPropagation();
            
                      // get the current mouse position
                      var mx=parseInt(e.clientX-offsetX);
                      var my=parseInt(e.clientY-offsetY);
            
                      // calculate the distance the mouse has moved
                      // since the last mousemove
                      var dx=mx-startX;
                      var dy=my-startY;
            
                      // move each rect that isDragging 
                      // by the distance the mouse has moved
                      // since the last mousemove
                      for(var i=0;i<rects.length;i++){
                          var r=rects[i];
                          if(r.isDragging){
                              r.x+=dx;
                              r.y+=dy;
                          }
                          
                      }
                    //   updateData(set)
                      // redraw the scene with the new rect positions
                      draw();
                      
                      // reset the starting mouse position for the next mousemove
                      startX=mx;
                      startY=my;
            
                    }
                }
             
        
        }
        useEffect(() => {
            Dargdrop()
            
        })
    return (
        <>
            <Box>
                {
                     shapedata && toggle? <Typography onDoubleClick={toggleInput} sx={{fontSize:'18px',fontWeight:700,padding:'5px 0px 23px 0px'}}>{text}</Typography>
                    :
                     <input style={{ border:'#52D5FF', height:'30px', fontWeight:700, fontSize:'18px', textAlign:'center', marginBottom:'25px'}} type="text" defaultValue={text} onChange={handleChange} />
                }
                <canvas id="myCanvas" width="700" height="550" style={{border:'1px solid #617D5E', borderRadius:'6px'}}>
                    Your browser does not support the HTML canvas tag.
                </canvas>
            </Box>
        </>
    );
};

export default Canvas;