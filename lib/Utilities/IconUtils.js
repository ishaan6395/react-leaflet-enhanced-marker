"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChildrenProperties = exports.defaultMarker = exports.createIcon = undefined;

var _leaflet = require("leaflet");

var _leaflet2 = _interopRequireDefault(_leaflet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createIcon = exports.createIcon = function createIcon(param, zoom) {
  return _leaflet2.default.divIcon({
    className: "dummy",
    iconSize: [100, 50],
    html: "\n    <div style=\"zoom:" + zoom + ";overflow:visible\">\n      " + param + "\n    </div>"
  });
};

var defaultMarker = exports.defaultMarker = function defaultMarker() {
  var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
  var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
  return new _leaflet2.default.Icon({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new _leaflet2.default.Point(height, width)
    //className: 'dummy'
  });
};

var getChildrenProperties = exports.getChildrenProperties = function getChildrenProperties(icon, properties) {
  var props = icon.props;
  var neededProps = ["onClick", "onMouseOver", "onHover", "onHighlight", "onMouseOut"];
  while (props && props.children) {
    if (typeof props.children !== "string") {
      (function () {
        var childrenProps = props.children.props;
        neededProps.forEach(function (prop) {
          if (!properties[prop]) {
            var propList = [];
            childrenProps[prop] && propList.push(childrenProps[prop]);
            properties[prop] = propList;
          } else {
            var _propList = properties[prop];
            childrenProps[prop] && _propList.push(childrenProps[prop]);
            properties[prop] = _propList;
          }
        });
      })();
    }
    props = props.children.props;
  }

  return properties;
};
