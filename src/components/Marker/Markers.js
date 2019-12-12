import React, { PureComponent } from "react";
import { Marker as LeafletMarker } from "react-leaflet";
import L from "leaflet";
import ReactDOMServer from "react-dom/server";
import {
  createIcon,
  defaultMarker,
  getChildrenProperties
} from "./Utilities/IconUtils";

class Marker extends PureComponent {
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
        ref={e => (this.markerRef = e)}
        {...iconProps}
        {...properties}
        {...this.props}
        onClick={() => {
          iconProps && iconProps.onClick && iconProps.onClick();
          this.props && this.props.onClick && this.props.onClick();
          this.triggerProperty("onClick");
        }}
        ref={ele => (this.markerRef = ele)}
        onMouseOver={() => {
          highlight && this.highlight();
          iconProps && iconProps.onMouseOver && iconProps.onMouseOver();
          this.props && this.props.onMouseOver && this.props.onMouseOver();
          this.triggerProperty("onMouseOver");
        }}
        onMouseOut={() => {
          highlight && this.removeHighlight();
          iconProps && iconProps.onMouseOut && iconProps.onMouseOut();
          this.props && this.props.onMouseOut && this.props.onMouseOut();
          this.triggerProperty("onMouseOut");
        }}
        position={position}
        icon={this.getIcon()}
      />
    );
  }
}

export default Marker;
