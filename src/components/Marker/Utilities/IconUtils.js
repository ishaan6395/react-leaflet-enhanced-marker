import L from "leaflet";

export const createIcon = (param, zoom) =>
  L.divIcon({
    className: "dummy",
    iconSize: [100, 50],
    html: `
    <div style="zoom:${zoom};overflow:visible">
      ${param}
    </div>`
  });

export const defaultMarker = (height = 20, width = 30) =>
  new L.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(height, width)
    //className: 'dummy'
  });

export const getChildrenProperties = (icon, properties) => {
  let props = icon.props;
  const neededProps = [
    "onClick",
    "onMouseOver",
    "onHover",
    "onHighlight",
    "onMouseOut"
  ];
  while (props && props.children) {
    if (typeof props.children !== "string") {
      const childrenProps = props.children.props;
      neededProps.forEach(prop => {
        if (!properties[prop]) {
          let propList = [];
          childrenProps[prop] && propList.push(childrenProps[prop]);
          properties[prop] = propList;
        } else {
          let propList = properties[prop];
          childrenProps[prop] && propList.push(childrenProps[prop]);
          properties[prop] = propList;
        }
      });
    }
    props = props.children.props;
  }

  return properties;
};
