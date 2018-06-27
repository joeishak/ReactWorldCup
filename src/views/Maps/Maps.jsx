import React from "react";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import { parse } from "path";
import { Z_HUFFMAN_ONLY } from "zlib";
let Markers = undefined;

const CustomMap = withScriptjs(
  // console.log(props)

  
  withGoogleMap(props => (
    // console.log('The Props',props)
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 44.452, lng: 48.704 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
    {
       Markers.map(stadium => {
        //  console.log(stadium);
        return (
            <Marker 
              onMouseOver = {this.onMouseOver}
              key={stadium.stadium} 
              // onClick={handleToggle(1)}
              // onDragOver={handleToggle(2)}
              // onMouseOver={handleToggle(3)}
              position={{lat: stadium.lat,lng:stadium.lang}}
              >
              <InfoWindow >
                <span>{stadium.stadium}</span>
              </InfoWindow>
            </Marker> 
               )
      })
    }
    </GoogleMap>
  ))
);

function Maps({ ...prop }) {
  // console.log(prop);
  Markers = prop.markers;
  // console.log(Markers);
  return (
    <CustomMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVGVMQ5hXbJ73Wz4bvUGQkr8_2CYZf-8k"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `50vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      markers = { Markers }
    />
  );
}

export default Maps;
