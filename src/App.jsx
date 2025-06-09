import './App.css';
import { useState, useRef } from 'react';
import { GoogleMap } from './GoogleMap';
import { InputTools } from './InputTools';

const DEFAULT_COUNT = 100;
const DEFAULT_RADIUS = 5001;

function App() {
  const [marker, setMarker] = useState('📍');
  const [nearbyType, setNearbyType] = useState([])
  const [count, setCount] = useState(DEFAULT_COUNT)
  const [radius, setRadius] = useState(DEFAULT_RADIUS)
  const [refreshCount, setRefreshCount] = useState(0);
  const inputRef = useRef(null);


  return (
    <>
      <InputTools 
        marker={marker} 
        setMarker={setMarker} 
        nearbyType={nearbyType} 
        setNearbyType={setNearbyType} 
        setRadius={setRadius}
        setCount={setCount}
        setRefreshCount={setRefreshCount}
        radius={radius}
        inputRef={inputRef}
      />
      <GoogleMap 
        marker={marker} 
        nearbyType={nearbyType} 
        count={count}
        radius={radius}
        refreshCount={refreshCount}
        inputRef={inputRef}
      />
    </>
  )
}

export default App
