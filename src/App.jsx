import './App.css';
import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { InputTools } from './InputTools';

function App() {
  const [marker, setMarker] = useState('📍');
  const [nearbyType, setNearbyType] = useState([])
  const [count, setCount] = useState(undefined)
  const [radius, setRadius] = useState(undefined)
  const [refreshCount, setRefreshCount] = useState(0);

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
      />
      <GoogleMap 
        marker={marker} 
        nearbyType={nearbyType} 
        count={count}
        radius={radius}
        refreshCount={refreshCount}
      />
    </>
  )
}

export default App
