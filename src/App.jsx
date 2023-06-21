import { useEffect, useRef, useState } from 'react';  
import './App.css'  
import Canvas from './Canvas';

function App() {
  const canvasRef= useRef(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => { 
    const canvas = canvasRef.current;
    if (canvas) {
      
      setCanvasReady(true)
    }
  }, [])

  const drawArt = (context) => {
 
    context.fillRect(0, 0, 100, 100);
    context.fillStyle = 'red';
    context.strokeRect(100, 100, 220, 220)
  }

  const clearCanvas = ( ) => {
   
    const cv = document.getElementById('canvasId')
    const context = cv.getContext('2d')
    
    context.fillStyle = 'white';
    context.fillRect(0, 0, cv.width, cv.height);  
  } 

  const handleFileBackground = (event) => {
    const backgroundImage = event.target.files[0];
    if (backgroundImage) {
      const reader = new FileReader(); 
       
      reader.onloadend = () => {
        const canvas = document.getElementById('canvasId')
        const context = canvas.getContext('2d') 
        
        const image = new Image

        image.src = reader.result;

        console.log(image.width, image.height)

        image.onload = () => {
          context.drawImage(image, 0, 0, image.width, image.height)
          console.log(image.width, image.height)
        } 
        
      }
      reader.readAsDataURL(backgroundImage)
    } 
  } 

  const saveImage = () => {
    console.log('saving...')

    const cv = document.getElementById('canvasId')
    const dataURL = cv.toDataURL('video_avatar.jpg')
    const link = document.createElement('a')
    link.href = dataURL;
    link.download = 'video_background.jpg'
    link.click()
  }
    
  return (
    <>
      <Canvas  draw={drawArt} ref={canvasRef} width={800} height={600} />   
      <div>
        <input type="file" accept=".jpg, .jpeg, .png, .gif" onChange={handleFileBackground} />
          
        <button onClick={ clearCanvas }>Clear</button> 
        <button onClick={ saveImage }>Save Image</button> 
      </div>
    </>
  )
}

export default App
