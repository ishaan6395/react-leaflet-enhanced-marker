<img width="180" src="https://rawgit.com/Leaflet/Leaflet/master/src/images/logo.svg" alt="Leaflet" />

# react-leaflet-enhanced-marker

This library will help render dynamic markers on Leaflet Map. The marker can be :-
  - A simple String
  - A React Component
  - An Image

It works with any stable version of react-leaflet 1.x.x and 2.x.x.

**How to use :**

Using **react-leaflet-enhanced-marker** to render Marker using plain text
``` javascript
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import Marker from 'react-leaflet-enhanced-marker'


class MarkerExample extends Component {
  state = {
    center: [32, -97],
    zoom: 6,
  };

  render() {
    return (
      <div>
        <Map center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker 
            icon={'Test Marker Here'}
            position={this.state.center}
          />
        </Map>
      </div>
    );
  }
}
```

Using **react-leaflet-enhanced-marker** to render Marker using static React Component

```javascript
class ReactComponent extends Component {
  render() {
    const markerStyle = {
      backgroundColor: "blue",
      color: "white",
      display: "flex",
      justifyContent: "center",
      width: "50px",
      height: "50px",
      borderRadius: "50px",
      alignItems: "center"
    };
    return <div style={markerStyle}>Marker</div>;
  }
}

class MapExample extends Component {
  state = {
    center: [32, -97],
    zoom: 6
  };

  render() {
    return (
      <div>
        <Map center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker icon={<ReactComponent/>} position={this.state.center} />
        </Map>
      </div>
    );
  }
}
```

Using **react-leaflet-enhanced-marker** to render Image markers

```javascript
import img from './imagePath'

class MapExample extends Component {
  state = {
    center: [32, -97],
    zoom: 6
  };

  render() {
    return (
      <div>
        <Map center={this.state.center} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker icon={<img src={img} style={{width:'100'}} />} position={this.state.center} />
        </Map>
      </div>
    );
  }
}
```
