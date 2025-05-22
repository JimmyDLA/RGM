import { useEffect, useMemo, useRef, useState } from 'react'
import { APIProvider, Map, Marker, useMap, AdvancedMarker } from '@vis.gl/react-google-maps';
import './App.css'


const MapEffect = ({ 
  center,
  setPlaces,
  desiredCount = 60,
  initialRadius = 500,
  maxRadius=3000 
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    async function fetchPlaces(radius) {
      const url = 'https://places.googleapis.com/v1/places:searchNearby';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'AIzaSyDlMPxqwY6sc6keDYjO9LNnhct8mgmLrs0',
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.location,places.formattedAddress',
        },
        body: JSON.stringify({
          includedTypes: ['school'],
          locationRestriction: {
            circle: {
              center: {
                latitude: center.lat,
                longitude: center.lng,
              },
              radius: radius,
            },
          },
        }),
      });

      if (!response.ok) {
        console.error('Places API request failed:', response.statusText);
        return [];
      }

      const data = await response.json();
      return data.places || [];
    }

    async function gatherPlaces() {
      let allResults = [];
      let radius = initialRadius;

      while (allResults.length < desiredCount && radius <= maxRadius) {
        const results = await fetchPlaces(radius);
        console.log(`Fetched ${results.length} places at radius ${radius}`);

        // Merge new unique places by id
        const uniqueResults = results.filter(
          (place) => !allResults.some((p) => p.id === place.id)
        );
        allResults = [...allResults, ...uniqueResults];
        console.log('✅ FuniqueResults places:', uniqueResults);

        if (allResults.length >= desiredCount) break;

        // Increase search radius for next try
        radius += 500;
      }

      console.log('✅ Final gathered places:', allResults);
      setPlaces(allResults.slice(0, desiredCount));
    }

    gatherPlaces();
  }, [map]);

  return null;
}

export const GoogleMap = () => {
  const [places, setPlaces] = useState([]);
  const mapRef = useRef(null);
  const center = { lat: 19.45827037215659, lng: -70.68147776264945 }; //19.455660228054015, -70.68801244529995   19.45827037215659, -70.68147776264945

  const mapOptions = useMemo(() => ({
    draggable: true,
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: false,
    gestureHandling: 'auto',
  }), []);


  return (
      <APIProvider 
        apiKey="AIzaSyDlMPxqwY6sc6keDYjO9LNnhct8mgmLrs0"
        libraries={['places']}
      >
        <div style={{ padding: '20px', width: '90%', height: '90%'}}>
          <Map 
            ref={mapRef}
            defaultCenter={center} 
            defaultZoom={15}
            options={mapOptions}
            mapId="ee078752655abaa"
          >
            <Marker position={center}></Marker>
            {places.map((place) => (
              <AdvancedMarker
                key={place.id}
                position={{
                  lat: place.location.latitude,
                  lng: place.location.longitude,
                }}
              >
                <span style={{fontSize: '35px'}}>🚸</span>
              </AdvancedMarker>
            ))}
            <MapEffect center={center} setPlaces={setPlaces} />
          </Map>
        </div>
      </APIProvider>
  )
}