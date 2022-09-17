import React, { useState, useEffect } from 'react';
import Meyda from 'meyda';
// detect
const DataContext = React.createContext()

const getMedia = async () => {
    try{
        return await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
       })
    } catch (err) {
        console.log("error: ", err)
    }
}
const AudioProvider = (props) => {
    const [analyser, setAnalyser] = useState(null);
    const [running, setRunning] = useState(false);
    const [features, setFeatures] = useState(null);

    useEffect(() => {
        const audioContext = new AudioContext()
        let newAnalyser
        getMedia().then(stream => {
            console.log(audioContext.state)
            if (audioContext.state === 'closed'){
                return
            }
            const source = audioContext.createMediaStreamSource(stream)
            newAnalyser = Meyda.createMeydaAnalyzer({
                audioContext: audioContext,
                source: source,
                bufferSize: 1024,
                featureExtractors: ['buffer','amplitudeSpectrum', 'mfcc', 'rms'],
                callback: features => {
                    setFeatures(features)
                }
            })
            setAnalyser(newAnalyser)
        })
        return () => {
            if (newAnalyser){
                newAnalyser.stop()
            }
            if (audioContext){
                audioContext.close()
            }
        }
    }, [running])

    useEffect(() => {
        if (analyser){
            if (running){
                analyser.start()
            } else {
                analyser.stop()
            }
        }
    }, [running, analyser])

    return (
        <DataContext.Provider value={{
            running,
            setRunning,
            features,
            setFeatures
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

const AudioConsumer = DataContext.Consumer
export { AudioProvider, AudioConsumer, DataContext}