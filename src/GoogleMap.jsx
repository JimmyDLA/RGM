import { useEffect, useMemo, useRef, useState } from 'react'
import { APIProvider, InfoWindow, Map, Pin, useMap, AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import './App.css'
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const cent = { lat: 19.45827037215659, lng: -70.68147776264945 }; //19.455660228054015, -70.68801244529995   19.45827037215659, -70.68147776264945



const MapEffect = ({ 
  center,
  setPlaces,
  nearbyType,
  desiredCount = 100,
  initialRadius = 0,
  maxRadius=5000,
  refreshCount
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !nearbyType.length) return setPlaces([]);

    async function fetchPlaces(radius) {
      const url = 'https://places.googleapis.com/v1/places:searchNearby';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': `${apiKey}`,
          'X-Goog-FieldMask':
            'places.id,places.displayName,places.location,places.formattedAddress',
        },
        body: JSON.stringify({
          includedTypes: nearbyType,
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
        console.log('✅ unique Results places:', uniqueResults);

        if (allResults.length >= desiredCount) break;

        // Increase search radius for next try
        radius += 500;
      }

      console.log('✅ Final gathered places:', allResults);
      setPlaces(allResults.slice(0, desiredCount));
    }

    gatherPlaces();
  }, [map, refreshCount]);

  return null;
}

export const GoogleMap = ({ 
  marker, 
  nearbyType, 
  count, 
  radius,
  refreshCount,
  inputRef,
}) => {
  
  const mapRef = useRef(null);
  const circleRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [center, setCenter] = useState(cent);
  const [mapCenter, setMapCenter] = useState(cent);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [initialLoad, setInitialLoad] = useState(0);
  const [markerRefs, setMarkerRefs] = useState({});
  const [advancedMarkerRef, setAdvancedMarkerRef] = useAdvancedMarkerRef();


    // If center or radius change, update the circle
    useEffect(() => {
      if (circleRef.current) {
        circleRef.current.setCenter(center);
        circleRef.current.setRadius(radius !== 5001 ? radius : 0);
      }
    }, [center, radius]);

  const handleMarkerClick = (place) => {
    setSelectedMarker(place);
  };

  const handleMapLoad = (mapRef) => {
    console.log('Map Ref: ', mapRef.map)
    if (initialLoad < 1) {
      setInitialLoad(1)
      const map = mapRef.map
      // Create the circle
      circleRef.current = new window.google.maps.Circle({
        map,
        center,
        radius: 0,
        fillColor: "#4285F4",
        fillOpacity: 0.2,
        strokeColor: "#4285F4",
        strokeOpacity: 0.5,
        strokeWeight: 2,
      });

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          setCenter({ lat, lng });
          setMapCenter({ lat, lng });
          setTimeout(() => {
            setMapCenter(null)
          }, 100);
        }
      });
      console.log({circleRef})
    }
  };

  const mapOptions = useMemo(() => ({
    draggable: true,
    zoomControl: true,
    scrollwheel: true,
    disableDefaultUI: false,
    gestureHandling: 'auto',
  }), []);

  console.log({radius, count})
  return (
      <APIProvider 
        apiKey={apiKey}
        libraries={['places']}
      >
        <div style={{ padding: '50px', width: '80%', height: '80%'}}>
          <Map 
            ref={mapRef}
            defaultCenter={cent} 
            center={mapCenter}
            defaultZoom={15}
            zoomControl
            options={mapOptions}
            mapId="ee078752655abaa"
            onTilesLoaded={handleMapLoad}
          >
            <AdvancedMarker position={center}>
            </AdvancedMarker>
            {places.map((place) => {
              // Store marker refs for later use
              if (markerRefs[place.id] !== setAdvancedMarkerRef) {
                setMarkerRefs((prev) => ({ ...prev, [place.id]: setAdvancedMarkerRef }));
              }
              return (
                <AdvancedMarker
                  key={place.id}
                  position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                  }}
                  ref={setAdvancedMarkerRef}
                  onClick={() => handleMarkerClick(place)}
                >
                  <span style={{fontSize: '35px'}}>{marker}</span>
                </AdvancedMarker>
              )}
            )}
            {selectedMarker && (
              <InfoWindow
                position={{
                  lat: selectedMarker.location.latitude,
                  lng: selectedMarker.location.longitude,
                }}
                anchor={markerRefs[selectedMarker.id]?.current}
                onCloseClick={() => setSelectedMarker(null)}
                maxWidth={300}
                headerContent={<h2 style={styles.header}>{selectedMarker.displayName.text}</h2>}
              >
                <p style={styles.body}>{selectedMarker.formattedAddress}</p>
                <a
                  style={styles.link}
                  target='_blank'
                  href={`https://www.google.com/maps/place/?q=place_id:${selectedMarker.id}`}
                >
                  View on Google Maps
                </a>
              </InfoWindow>
            )}
            <MapEffect 
              maxRadius={radius} 
              desiredCount={count} 
              center={center} 
              setPlaces={setPlaces} 
              nearbyType={nearbyType}
              refreshCount={refreshCount}
            />
          </Map>
        </div>
      </APIProvider>
  )
}

const styles = {
  header: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: '10px',
  },
  body: {
    paddingBottom: '5px'
  },
  link: {
    color: 'blue',
    textDecoration: 'underline',
  }
}