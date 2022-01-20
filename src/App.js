import React, { useState, useRef } from 'react';
import useSupercluster from 'use-supercluster';
import useSWR from 'swr';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';

import PinDescription from './PinDescription';
import MarkerButton from './MarkerButton';

import './App.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const [viewport, setViewport] = useState({
    latitude: 52.114503,
    longitude: 19.423561,
    zoom: 6,
    width: '100vw',
    height: '100vh',
  });

  const mapRef = useRef();

  const [selectedPin, setSelectedPin] = useState(null);

  const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';

  const { data, error }  = useSWR(url, fetcher);
  const pins = data && !error ? data.objects : [];
  const geojson = pins.map((pin) => {
    let details;

    switch (pin.discriminator) {
      case 'vehicle':
        details = {
          vehicleType: pin.type,
          availability: pin.status,
          batteryLevel: pin.batteryLevelPct,
          platesNumber: pin.platesNumber,
        }
        break;
      case 'parking':
        details = {
          description: pin.description,
          address: `${pin.address.street} ${pin.address.house}, ${pin.address.city}`,
          availableSpacesCount: pin.availableSpacesCount,
        }
        break;
      case 'poi':
        details = {
          description: pin.description,
          category: pin.category,
        }
        break;
      default:
        details = {}
    }

    return {
      type: 'Feature',
      properties: {
        cluster: false,
        pinId: pin.id,
        pinName: pin.name,
        pinType: pin.discriminator,
        details,
      },
      geometry: {
        type: 'Point',
        coordinates: [
          pin.location.longitude, 
          pin.location.latitude
        ],
      },
    }
  });

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points: geojson,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <ReactMapGL
      { ...viewport }
      maxZoom={20}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/yellowgiraffe/ckykigt3e6m1b15o88wu23ks4"
      onViewportChange={(viewport) => setViewport(viewport)}
      ref={mapRef}
    >
      {clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { 
          cluster: isCluster,
          cluster_id: clusterId,
          point_count: pinsCount 
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={clusterId}
              latitude={latitude}
              longitude={longitude}
            >
              <div
                className='marker-cluster'
                style={{
                  width: `${30 + (pinsCount / geojson.length) * 60}px`,
                  height: `${30 + (pinsCount / geojson.length) * 60}px`
                }}
                onClick={() =>{
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(clusterId),
                    20
                    );
                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({ speed: 3 }),
                      transitionDuration: 'auto',
                    })
                }}
              >
                {pinsCount}
              </div>
            </Marker>
          );
        }

        const iconClickHandler = (event) => {
          event.preventDefault();
          setSelectedPin(cluster);
        }

        return (
          <Marker
            key={cluster.properties.pinId}
            latitude={latitude}
            longitude={longitude}
          >
            <MarkerButton pin={cluster} clickHandler={iconClickHandler} />   
          </Marker>
        );
      })}
      
      {selectedPin ? (
        <Popup
          latitude={selectedPin.geometry.coordinates[1]}
          longitude={selectedPin.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPin(null);
          }}
        >
          <PinDescription pin={selectedPin} />
        </Popup>
      ) : null}
    </ReactMapGL>


  // useEffect(() => {
  //   const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';

  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       console.log(json);
  //       setMarkers(json.objects);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);

  // const onClick = event => {
  //   const feature = event.features[0];
  //   const clusterId = feature.properties.cluster_id;

  //   const mapboxSource = mapRef.current.getMap().getSource('markers');

  //   mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
  //     if (err) {
  //       return;
  //     }

  //     setViewport({
  //       ...viewport,
  //       longitude: feature.geometry.coordinates[0],
  //       latitude: feature.geometry.coordinates[1],
  //       zoom,
  //       transitionDuration: 500
  //     });
  //   });
  // };


  // return (
  //   <ReactMapGL
  //     { ...viewport }
  //     mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
  //     mapStyle="mapbox://styles/yellowgiraffe/ckykigt3e6m1b15o88wu23ks4"
  //     onViewportChange={(viewport) => setViewport(viewport)}
  //     interactiveLayerIds={[clusterLayer.id]}
  //     onClick={onClick}
  //     ref={mapRef}
  //   >
  //     {isLoading ? <div>...loading</div> : items.map((item) => {
  //       if (item.discriminator === 'vehicle') {
  //         return <Marker
  //           key={item.id}
  //           latitude={item.location.latitude}
  //           longitude={item.location.longitude}
  //         >
  //           <button className="marker-btn" onClick={(event => {
  //             event.preventDefault();
  //             setSelectedItem(item);
  //           })}>
  //             <img src="/car.png" alt="Car Icon"/>
  //           </button>
  //         </Marker>
  //       } else if (item.discriminator === 'parking') {
  //         return <Marker
  //           key={item.id}
  //           latitude={item.location.latitude}
  //           longitude={item.location.longitude}
  //         >
  //           <button className="marker-btn">
  //             <img src="/parking.png" alt="Car Icon"/>
  //           </button>
  //         </Marker>
  //       } else if (item.discriminator === 'poi') {
  //         return <Marker
  //           key={item.id}
  //           latitude={item.location.latitude}
  //           longitude={item.location.longitude}
  //         >
  //           <button className="marker-btn">
  //             <img src="/magnifying-glass.png" alt="Car Icon"/>
  //           </button>
  //         </Marker>
  //       }
  //     })}

  //     {isLoading ? <div>...loading</div> : <Source
  //       id="markers"
  //       type="geojson"
  //       cluster={true}
  //       clusterMaxZoom={14}
  //       clusterRadius={50}
  //       data={items.map((item) => ({
  //         type: 'Feature',
  //         geometry: {
  //           type: 'Point',
  //           coordinates: [
  //             [item.location.longitude, item.location.latitude]
  //           ],
  //         properties: {
  //           itemId: item.id,
  //           itemType: item.discriminator,
  //         },
  //         }
  //       }))}
  //     >
  //       <Layer {...clusterLayer} />
  //       <Layer {...clusterCountLayer} />
  //       <Layer {...unclusteredPointLayer} />
  //     </Source>}

  //     {selectedItem ? (
  //       <Popup
  //         latitude={selectedItem.location.latitude}
  //         longitude={selectedItem.location.longitude}
  //         onClose={() => {
  //           setSelectedItem(null);
  //         }}
  //       >
  //         <div>
  //           <h2>{selectedItem.name}</h2>
  //           <ul>
  //             <li>Status: {selectedItem.status === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
  //             <li>Poziom baterii: {selectedItem.batteryLevelPct}%</li>
  //           </ul>
  //         </div>
  //       </Popup>
  //     ) : null}
  //   </ReactMapGL>
  );
}

export default App;
