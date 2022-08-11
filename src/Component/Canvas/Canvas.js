import React, { useEffect } from 'react';
import  Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import  Button from 'react-bootstrap/Button';
import { useSelector, useDispatch} from 'react-redux';
import { increment } from '../../service/slice/counter';

const Canvas = () => {
    //const [canvas, setCanvas] = useState('') 
    const value = useSelector((state) => state.counter.value)
    const formdata = useSelector((state) =>state.formData.formdata)
   
   
    console.log("form data canvas", formdata)
    
    const drawShape = () => {
        return (
          <>
            {
                formdata.map((item) => {
                    if(item.shapeName==='Rectangle'){
                    var c = document.getElementById("myCanvas");
                    var ctx = c.getContext("2d");
                    ctx.fillStyle = item.color;
                    ctx.fillRect(item.xaxis, item.yaxis, item.width, item.height);
                    }
                    else if(item.shapeName==='Circle'){
                        var b = document.getElementById("myCanvas");
                        var cty = b.getContext("2d");
                        cty.fillStyle = item.color;
                        cty.fill();
                        cty.arc(item.xaxis, item.yaxis, item.radius, item.start, item.end * Math.PI);
                        cty.stroke();
                    }
                    
                   
                    
                })
            }
          </>
        )

      
    
    }

    useEffect(() => {
        drawShape()
       
    }, [formdata]);

    
    
    
//    const dispatch = useDispatch();

    return (
        <>
            <Box>
                {/* <Typography>Count:{value}</Typography>
                <Button onClick={() => dispatch(increment()) } >Increment</Button> */}
                <Typography sx={{fontSize:'18px',fontWeight:700,padding:'5px 0px 23px 0px'}}>Untitled Canvas</Typography>

                {/* <Box sx={{border:'1px solid #617D5E',height:'50vh', borderRadius:'6px'}}>

                </Box> */}

                <canvas id="myCanvas" style={{border:"1px solid #617D5E", width:'100%', height:'50vh', borderRadius:'6px'}}>
                    Your browser does not support the HTML canvas tag.
                </canvas>
              

            </Box>
        </>
    );
};

export default Canvas;