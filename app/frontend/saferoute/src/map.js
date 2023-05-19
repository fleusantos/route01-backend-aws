import React from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { style } from './JS/map_setup';
import {withAuthenticator } from '@aws-amplify/ui-react';
// import css from './css/style.css';

const API_KEY = process.env.REACT_APP_API_KEY


const MapComponent = () => {
  const mapRef = React.useRef(undefined) 

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined
  }, [])

  return <div>
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      center={{ lat: 40.7, lng: -74 }}
      zoom={10}
      disableDefaultUI = {true}
      styles = {style}
      onLoad={onLoad}
      onUnmount={onUnmount}
      restriction = {{
        latLngBounds: {
          north: 41.3,
          south: 40,
          east: -72,
          west: -76,
        }
      }}
    >
    { /* Child components, such as markers, info windows, etc. */ }
    <></>
    </GoogleMap>
      {/* <GoogleMap
        id="map"
        center={{ lat: 40.7, lng: -74 }}
        zoom={10}
        disableDefaultUI = {true}
        gestureHandling = 'greedy'
        styles = {style}
        restriction = {{
          latLngBounds: {
            north: 41.3,
            south: 40,
            east: -72,
            west: -76,
          }
        }}
      /> */}
  </div>
};

const Map = ({ signOut, user }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li style={{ textAlign: 'left', float: 'left' }}>
              <a href="./map">SAFEROUTE</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="./map">Map</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a className="navHover" href="./about">About</a>
            </li>
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a href="./used_data">Used data</a>
            </li>
          </ul>
        </nav>
      </header>
      {isLoaded ? <MapComponent />: <h2>LOADING MAP</h2>}
    </div>
  );
};

export default withAuthenticator(Map{
  socialProviders: ['google']
}); 
