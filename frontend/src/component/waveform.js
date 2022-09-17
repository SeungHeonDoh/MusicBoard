import React, {useRef, useContext, useEffect} from 'react';
import { DataContext } from '../hook/AudioManager';


export const Waveform = ({width, height, backgroundColor, strokeColor}) => {
    const Context = useContext(DataContext);
    const { running, setRunning,features,setFeatures } = Context;
    const visualizer = React.createRef(null)
    function stop() {
      setRunning(false);
    }
    function draw() {
        if (!running) return
        console.log("start draw")
        const canvas = visualizer.current
        console.log(canvas)
        if(canvas) return;
        const canvasCtx = canvas.getContext('2d')
        console.log(canvasCtx)
        let drawVisual
        const bufferLength = 1024
        const dataArray = new Uint8Array(bufferLength)
    
        canvasCtx.clearRect(0, 0, width, height)
    
        drawVisual = requestAnimationFrame(draw)
        canvasCtx.fillStyle = backgroundColor
        canvasCtx.fillRect(0, 0, width, height)
        canvasCtx.lineWidth = 2
        canvasCtx.strokeStyle = strokeColor
        canvasCtx.beginPath()
        const sliceWidth = width * 1.0 / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0
          const y = v * height / 2
  
          if (i === 0) {
            canvasCtx.moveTo(x, y)
          } else {
            canvasCtx.lineTo(x, y)
          }
  
          x += sliceWidth
        }
  
        canvasCtx.lineTo(canvas.width, canvas.height / 2)
        canvasCtx.stroke()
    };
    // draw();
    useEffect(() => {
        console.log(running);
        draw()
    }, [running]); // <= Runs once on component load
    return (
        <div>
            waveform
            <canvas ref={visualizer} height={height} width={width}></canvas>
        </div> 
    );
};