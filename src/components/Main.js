import React, { Component, Fragment } from "react";
import { Map, TileLayer } from "react-leaflet";
import Markers from "./Marker/Markers";

class Main extends Component {
  state = {
    count: 0
  };
  render() {
    return (
      <Fragment>
        <Map
          style={{ height: "700px", width: "700px", border: "0px" }}
          center={[32, -96]}
          zoom={6}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          <Markers
            onMouseOver={() => console.log("in")}
            onMouseOut={() => console.log("out")}
            position={[32, -97]}
            highlight
            icon={<div>ishaan is here</div>}
          />
        </Map>
      </Fragment>
    );
  }
}
export default Main;
