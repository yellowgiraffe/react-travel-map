import React, { useState, useRef, useContext } from 'react';
import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import useSupercluster from 'use-supercluster';

import { FilterContext } from '../context/FilterContext';

import PinDescription from './PinDescription';
import Markers from './markers/Markers';
import convertToGeojson from '../utils/convertToGeojson';



const Map = () => {
  const { filtered } = useContext(FilterContext);
  const [viewport, setViewport] = useState({
    latitude: 52.114503,
    longitude: 19.423561,
    zoom: 6,
    width: '100vw',
    height: '100vh',
  });

  const [selectedPin, setSelectedPin] = useState(null);

  const mapRef = useRef();

  const geojsonData = convertToGeojson(filtered);

  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points: geojsonData,
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
      {clusters.length && clusters.map((cluster) => {
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
                  width: `${30 + (pinsCount / geojsonData.length) * 50}px`,
                  height: `${30 + (pinsCount / geojsonData.length) * 50}px`
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
            <Markers object={cluster} onClick={iconClickHandler}/> 
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
          <PinDescription object={selectedPin} />
        </Popup>
      ) : null}
    </ReactMapGL>
  );
  
};

export default Map;

