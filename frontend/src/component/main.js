import React, {useRef, useContext, useEffect} from 'react';
import { Waveform } from './waveform';
import { DataContext } from '../hook/AudioManager';
import Template from './Template';

function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function() {
        return (Math.random() * max);
    });
}

export const AudioViewDemo = () => {
    const Context = useContext(DataContext);
    const { running, setRunning,features,setFeatures } = Context;
    const global_data = {};
    if (features === null){
        global_data.buffer = randomArray(1024, 1)
        global_data.mfcc = randomArray(13, 1)
        global_data.av = randomArray(2, 1)
        global_data.genre = randomArray(50, 1)
    } else {
        global_data.buffer = features.buffer
        global_data.mfcc = features.mfcc
    }
    // console.log(global_data);
    const handleClick = () => {
        setRunning(running => !running)
    }
    return (
        <div>
            <button onClick={handleClick}>
                {!running ? 'Start':'Stop'}
            </button>
            <Template data_buffer = {global_data.buffer}/> 
        </div>
    );
};

