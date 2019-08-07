'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLeaflet = require('react-leaflet');

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _IconUtils = require('./Utilities/IconUtils');

var _areEqual = require('fbjs/lib/areEqual');

var _areEqual2 = _interopRequireDefault(_areEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Markers = function (_Component) {
  (0, _inherits3.default)(Markers, _Component);

  function Markers() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Markers);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Markers.__proto__ || (0, _getPrototypeOf2.default)(Markers)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      zoom: '100%',
      defaultHeight: 20,
      defaultWidth: 30,
      iconHeight: 50,
      iconWidth: 50,
      properties: {}
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
        zoom: '120%',
        defaultHeight: 25,
        defaultWidth: 35
      });
    }, _this.removeHighlight = function () {
      _this.setState({ zoom: '100%', defaultHeight: 20, defaultWidth: 30 });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Markers, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var icon = this.props.icon;

      if (icon) {
        this.setState({ properties: icon.props });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !(0, _areEqual2.default)(this.state, nextState) || !(0, _areEqual2.default)(this.props, nextProps);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props.icon.props;
      var highlight = this.props.highlight;

      return _react2.default.createElement(_reactLeaflet.Marker, (0, _extends3.default)({
        ref: function ref(e) {
          return _this2.markerRef = e;
        }
      }, props, this.props, {
        onClick: function onClick() {
          props && props.onClick && props.onClick();
          props && _this2.props.onClick();
        },
        ref: function ref(ele) {
          return _this2.markerRef = ele;
        },
        onMouseOver: function onMouseOver() {
          highlight && _this2.highlight();
          props && props.onMouseOver && props.onMouseOver();
        },
        onMouseOut: function onMouseOut() {
          highlight && _this2.removeHighlight();
          props && props.onMouseOut && props.onMouseOut();
        },
        position: [32.7767, -96.797],
        icon: this.getIcon()
      }));
    }
  }]);
  return Markers;
}(_react.Component);

exports.default = Markers;
