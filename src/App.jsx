import './App.css';
import { useState } from 'react';
import { GoogleMap } from './GoogleMap';
import { InputTools } from './InputTools';

function App() {
  const [marker, setMarker] = useState('🚸');
  const [nearbyType, setNearbyType] = useState('school')
  return (
    <>
      <InputTools 
        marker={marker} 
        setMarker={setMarker} 
        nearbyType={nearbyType} 
        setNearbyType={setNearbyType} 
      />
      <GoogleMap marker={marker} nearbyType={nearbyType} />
    </>
  )
}

export default App
