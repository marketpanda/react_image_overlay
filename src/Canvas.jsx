import {  useEffect, useRef } from "react";

const Canvas =  ({  draw, ...props}, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => { 
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const context = canvas.getContext('2d');

        if (!context) {
            return;
        }

        draw(context)
        

        
    }, []);

    return (
        <>
            <canvas
                id = "canvasId"
                 
                width = { props.width }
                height = { props.height }
                ref = { canvasRef } 
            
            />
        </>
    )

} 

export default Canvas