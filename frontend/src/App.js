import './App.css';
import React from "react";
import { AudioProvider } from './hook/AudioManager'
import {AudioViewDemo} from './component/main'
function App() {
  return (
    <div className='App'>
      <AudioProvider>
        <p>hello world</p>
        <AudioViewDemo/>
      </AudioProvider>
    </div>
  );
}
export default App;
