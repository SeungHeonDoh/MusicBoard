import React, {useRef, useContext, useEffect} from 'react';
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
        </div>
    );
};

