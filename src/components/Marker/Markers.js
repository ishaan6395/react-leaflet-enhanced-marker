import React, { Component } from "react";
import { Marker as LeafletMarker } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import {
  createIcon,
  defaultMarker,
  getChildrenProperties
} from "./Utilities/IconUtils";
import areEqual from "fbjs/lib/areEqual";

class Marker extends Component {
  state = {
    zoom: "100%",
    defaultHeight: 20,
    defaultWidth: 30,
    iconHeight: 50,
    iconWidth: 50,
    properties: {},
    onClickProps: []
  };

  componentDidMount() {
    const { icon } = this.props;
    if (!icon) return;
    const properties = getChildrenProperties(icon, this.state.properties);
    this.setState({ properties });
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !areEqual(this.state, nextState) || !areEqual(this.props, nextProps);
  }

  getIcon = () => {
    const { icon } = this.props;
    const { zoom, defaultHeight, defaultWidth } = this.state;

    if (icon) {
      const domContent = ReactDOMServer.renderToString(icon);
      return createIcon(domContent, zoom);
    } else {
      return defaultMarker(defaultHeight, defaultWidth);
    }
  };
  highlight = () => {
    this.setState({
      zoom: "120%",
      defaultHeight: 25,
      defaultWidth: 35
    });
  };
  removeHighlight = () => {
    this.setState({ zoom: "100%", defaultHeight: 20, defaultWidth: 30 });
  };
  triggerProperty = property => {
    const props = this.state.properties[property];
    if (!props) return;

    for (let i = 0; i < props.length; i++) {
      props[i]();
    }
  };

  render() {
    const iconProps = this.props.icon && this.props.icon.props;
    const { highlight, position } = this.props;
    const { properties } = this.state;

    return (
      <LeafletMarker
        style={{
          cursor: "pointer"
        }}
        {...iconProps}
        {...properties}
        {...this.props}
        ref={ele => (this.markerRef = ele)}
        position={position}
        icon={this.getIcon()}
        onClick={(event) => {
          iconProps && iconProps.onClick && iconProps.onClick();
          this.props && this.props.onClick && this.props.onClick(event);
          this.triggerProperty("onClick");
        }}
        onMouseOver={(event) => {
          highlight && this.highlight();
          iconProps && iconProps.onMouseOver && iconProps.onMouseOver();
          this.props && this.props.onMouseOver && this.props.onMouseOver(event);
          this.triggerProperty("onMouseOver");
        }}
        onMouseOut={(event) => {
          highlight && this.removeHighlight();
          iconProps && iconProps.onMouseOut && iconProps.onMouseOut();
          this.props && this.props.onMouseOut && this.props.onMouseOut(event);
          this.triggerProperty("onMouseOut");
        }}
      />
    );
  }
}

export default Marker;
