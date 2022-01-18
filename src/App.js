import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 52.114503,
    longitude: 19.423561,
    zoom: 6,
    width: '100vw',
    height: '100vh',
  });

  const [objects, setMarkers] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setMarkers(json.objects);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  return (
    <ReactMapGL
      { ...viewport }
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/yellowgiraffe/ckykigt3e6m1b15o88wu23ks4"
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {isLoading ? <div>...loading</div> : objects.map((object) => {
        if (object.discriminator === 'vehicle') {
          return <Marker
            key={object.id}
            latitude={object.location.latitude}
            longitude={object.location.longitude}
          >
            <button className="marker-btn">
              <img src="/car.png" alt="Car Icon"/>
            </button>
          </Marker>
        } else if (object.discriminator === 'parking') {
          return <Marker
            key={object.id}
            latitude={object.location.latitude}
            longitude={object.location.longitude}
          >
            <button className="marker-btn">
              <img src="/parking.png" alt="Car Icon"/>
            </button>
          </Marker>
        } else if (object.discriminator === 'poi') {
          return <Marker
            key={object.id}
            latitude={object.location.latitude}
            longitude={object.location.longitude}
          >
            <button className="marker-btn">
              <img src="/magnifying-glass.png" alt="Car Icon"/>
            </button>
          </Marker>
        }
      })}
    </ReactMapGL>
  );
}

export default App;
