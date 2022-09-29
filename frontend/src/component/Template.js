import { DataContext } from '../hook/AudioManager';
import React, { useRef, useEffect } from 'react'

const framerate = 60
const result = { data: 0 }

function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function() {
        return (Math.random() * max);
    });
}

function Template({data_buffer}) {
    const bufferLength = 1024
    // data binding
    const intervalRef = useRef(null);
    const canvasRef = useRef();
    const getCanvas = () => canvasRef.current

    useEffect(() => {
        //when component is mounted
        if (intervalRef.current === null) {
            intervalRef.current = setInterval(() => {
                // if (canvasRef.current) return;
                // result.data++;
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) {
                    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.fillStyle = "gray";
                    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    // const dummy = randomArray(1024, 1)
                    ctx.beginPath();
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "black";
                    const sliceWidth = canvasRef.current.width * 1.0 / bufferLength;
                    let x = 0;
                    for(let i = 0; i < bufferLength; i++) {
                        const v = data_buffer[i];
                        const y = v * canvasRef.current.height/2;
                
                        if(i === 0) {
                          ctx.moveTo(x, y);
                        } else {
                          ctx.lineTo(x, y);
                        }
                
                        x += sliceWidth;
                      }
                
                    ctx.lineTo(ctx.width, ctx.height/2);
                    ctx.stroke();
                }
            }, 1 / framerate)
        }

        return () => {
            // component unmount
            // intervalRef.current && clearInterval(intervalRef.current)
        }
    }, [])


    return (
        <canvas ref={canvasRef} width={600} height={200}>Template</canvas>
    )
}

export default Template