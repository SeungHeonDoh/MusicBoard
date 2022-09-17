import React, {useRef, useContext, useEffect} from 'react';
import { Waveform } from './waveform';
import { DataContext } from '../hook/AudioManager';

export const AudioViewDemo = () => {
    const Context = useContext(DataContext);
    const { running, setRunning,features,setFeatures } = Context;
    const handleClick = () => {
        setRunning(running => !running)
    }
    return (
        <div>
            <button onClick={handleClick}>
                {!running ? 'Start':'Stop'}
            </button>
            <Waveform
                width = {640}
                height = {100}
                backgroundColor = {'rgba(0,0,0,1)'}
                strokeColor = {'rgba(255, 255, 255, 1)'}
            />
        </div>
    );
};

