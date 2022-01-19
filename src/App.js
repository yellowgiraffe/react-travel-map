import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import './App.css';

function App() {
  const [viewport, setViewport] = useState({
    latitude: 52.114503,
    longitude: 19.423561,
    zoom: 6,
    width: '100vw',
    height: '100vh',
  });

  const [items, setMarkers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

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
      {isLoading ? <div>...loading</div> : items.map((item) => {
        if (item.discriminator === 'vehicle') {
          return <Marker
            key={item.id}
            latitude={item.location.latitude}
            longitude={item.location.longitude}
          >
            <button className="marker-btn" onClick={(event => {
              event.preventDefault();
              setSelectedItem(item);
            })}>
              <img src="/car.png" alt="Car Icon"/>
            </button>
          </Marker>
        } else if (item.discriminator === 'parking') {
          return <Marker
            key={item.id}
            latitude={item.location.latitude}
            longitude={item.location.longitude}
          >
            <button className="marker-btn">
              <img src="/parking.png" alt="Car Icon"/>
            </button>
          </Marker>
        } else if (item.discriminator === 'poi') {
          return <Marker
            key={item.id}
            latitude={item.location.latitude}
            longitude={item.location.longitude}
          >
            <button className="marker-btn">
              <img src="/magnifying-glass.png" alt="Car Icon"/>
            </button>
          </Marker>
        }
      })}

      {selectedItem ? (
        <Popup
          latitude={selectedItem.location.latitude}
          longitude={selectedItem.location.longitude}
          onClose={() => {
            setSelectedItem(null);
          }}
        >
          <div>
            <h2>{selectedItem.name}</h2>
            <ul>
              <li>Status: {selectedItem.status === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
              <li>Poziom baterii: {selectedItem.batteryLevelPct}%</li>
            </ul>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
