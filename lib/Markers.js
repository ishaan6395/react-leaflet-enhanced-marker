"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require("react-leaflet");

var _server = require("react-dom/server");

var _server2 = _interopRequireDefault(_server);

var _IconUtils = require("./Utilities/IconUtils");

var _areEqual = require("fbjs/lib/areEqual");

var _areEqual2 = _interopRequireDefault(_areEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Marker = function (_Component) {
  (0, _inherits3.default)(Marker, _Component);

  function Marker() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Marker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Marker.__proto__ || (0, _getPrototypeOf2.default)(Marker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      zoom: "100%",
      defaultHeight: 20,
      defaultWidth: 30,
      iconHeight: 50,
      iconWidth: 50,
      properties: {},
      onClickProps: []
    }, _this.getIcon = function () {
      var icon = _this.props.icon;
      var _this$state = _this.state,
          zoom = _this$state.zoom,
          defaultHeight = _this$state.defaultHeight,
          defaultWidth = _this$state.defaultWidth;


      if (icon) {
        var domContent = _server2.default.renderToString(icon);
        return (0, _IconUtils.createIcon)(domContent, zoom);
      } else {
        return (0, _IconUtils.defaultMarker)(defaultHeight, defaultWidth);
      }
    }, _this.highlight = function () {
      _this.setState({
        zoom: "120%",
        defaultHeight: 25,
        defaultWidth: 35
      });
    }, _this.removeHighlight = function () {
      _this.setState({ zoom: "100%", defaultHeight: 20, defaultWidth: 30 });
    }, _this.triggerProperty = function (property) {
      var props = _this.state.properties[property];
      if (!props) return;

      for (var i = 0; i < props.length; i++) {
        props[i]();
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Marker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var icon = this.props.icon;

      if (!icon) return;
      var properties = (0, _IconUtils.getChildrenProperties)(icon, this.state.properties);
      this.setState({ properties: properties });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _areEqual2.default)(this.state, nextState) || !(0, _areEqual2.default)(this.props, nextProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var iconProps = this.props.icon && this.props.icon.props;
      var _props = this.props,
          highlight = _props.highlight,
          position = _props.position;
      var properties = this.state.properties;


      return _react2.default.createElement(_reactLeaflet.Marker, (0, _extends3.default)({
        style: {
          cursor: "pointer"
        }
      }, iconProps, properties, this.props, {
        ref: function ref(ele) {
          return _this2.markerRef = ele;
        },
        position: position,
        icon: this.getIcon(),
        onClick: function onClick(event) {
          iconProps && iconProps.onClick && iconProps.onClick();
          _this2.props && _this2.props.onClick && _this2.props.onClick(event);
          _this2.triggerProperty("onClick");
        },
        onMouseOver: function onMouseOver(event) {
          highlight && _this2.highlight();
          iconProps && iconProps.onMouseOver && iconProps.onMouseOver();
          _this2.props && _this2.props.onMouseOver && _this2.props.onMouseOver(event);
          _this2.triggerProperty("onMouseOver");
        },
        onMouseOut: function onMouseOut(event) {
          highlight && _this2.removeHighlight();
          iconProps && iconProps.onMouseOut && iconProps.onMouseOut();
          _this2.props && _this2.props.onMouseOut && _this2.props.onMouseOut(event);
          _this2.triggerProperty("onMouseOut");
        }
      }));
    }
  }]);
  return Marker;
}(_react.Component);

exports.default = Marker;
