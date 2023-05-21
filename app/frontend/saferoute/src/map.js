import React from 'react';
import { GoogleMap, LoadScript, useJsApiLoader, Marker  } from '@react-google-maps/api';
import { mapStyle} from './JS/map_setup';
import { withAuthenticator } from '@aws-amplify/ui-react';
import css from './css/style.css';

const API_KEY = process.env.REACT_APP_API_KEY

console.log(mapStyle);


const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};

const defaultCenter = {
  lat: 40.7,
  lng: -74
};

const defaultOptions = {
  disableDefaultUI: true,
  restriction: {
    latLngBounds: {
      north: 41.3,
      south: 40,
      east: -72,
      west: -76,
    }
  },
  gestureHandling: 'greedy',
  styles: mapStyle,
  language: 'en'
};

const MapComponent = () => {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(mapInstance) {
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={10}
      options={defaultOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Add any additional components, like markers, here */}
      {/* <Marker position={defaultCenter} /> */}
    </GoogleMap>
  );
};

const Map = ({ signOut, user }) => {
  const isLoaded = !!API_KEY;
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
            <li className="navHover" style={{ textAlign: 'right' }}>
              <a onClick={signOut} >SIGNOUT</a>
            </li>
          </ul>
        </nav>
      </header>
      {isLoaded ? (
        <LoadScript googleMapsApiKey={API_KEY}>
          <MapComponent />
        </LoadScript>
      ) : (
        <h2>LOADING MAP</h2>
      )}
    </div>
  );
};

export default withAuthenticator(Map, {
  socialProviders: ['google']
}); 
