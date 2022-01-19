import React, { useState, useRef } from 'react';
import useSupercluster from 'use-supercluster';
import useSWR from 'swr';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';

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

  // const [items, setMarkers] = useState(null);
  // const [isLoading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';

  const { data, error }  = useSWR(url, fetcher);
  const items = data && !error ? data.objects : [];
  const geojson = items.map((item) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      itemId: item.id,
      itemType: item.discriminator,
    },
    geometry: {
      type: 'Point',
      coordinates: [
        item.location.longitude, 
        item.location.latitude
      ],
    },
  }));

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
          point_count: itemsCount 
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
                  width: `${30 + (itemsCount / geojson.length) * 60}px`,
                  height: `${30 + (itemsCount / geojson.length) * 60}px`
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
                {itemsCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={cluster.properties.itemId}
            latitude={latitude}
            longitude={longitude}
        >
            {cluster.properties.itemType === 'vehicle' ? (
              <button className="marker-btn" onClick={(event => {
                event.preventDefault();
                setSelectedItem(cluster);
                console.log(selectedItem)
              })}>
                <img src="/car.png" alt="Car Icon"/>
              </button>
            ) : null}

            {cluster.properties.itemType === 'parking' ? (
              <button className="marker-btn">
                <img src="/parking.png" alt="Car Icon"/>
              </button>
            ) : null}

            {cluster.properties.itemType === 'poi' ? (
              <button className="marker-btn">
                <img src="/magnifying-glass.png" alt="Car Icon"/>
              </button>
            ) : null}
        </Marker>
        );
      })}
      
      {selectedItem ? (
        <Popup
          latitude={52.114503}
          longitude={19.423561}
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
