import React, { Component } from 'react'
import { Marker as M } from 'react-leaflet'
import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { createIcon, defaultMarker, imageIcon, extractImagePath } from './Utilities/IconUtils'
import areEqual from 'fbjs/lib/areEqual'

class Marker extends Component {
  state = {
    zoom: '100%',
    defaultHeight: 20,
    defaultWidth: 30,
    iconHeight: 50,
    iconWidth: 50,
    properties: {}
  }

  componentDidMount() {
    const { icon } = this.props
    if (icon) {
      this.setState({ properties: icon.props })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !areEqual(this.state, nextState) || !areEqual(this.props, nextProps)
  }

  getIcon = () => {
    const { icon } = this.props
    const { zoom, defaultHeight, defaultWidth } = this.state

    if (icon) {
      const domContent = ReactDOMServer.renderToString(icon)
      return createIcon(domContent, zoom)
    } else {
      return defaultMarker(defaultHeight, defaultWidth)
    }
  }

  highlight = () => {
    this.setState({
      zoom: '120%',
      defaultHeight: 25,
      defaultWidth: 35
    })
  }
  removeHighlight = () => {
    this.setState({ zoom: '100%', defaultHeight: 20, defaultWidth: 30 })
  }
  render() {
    const { props } = this.props.icon
    const { highlight } = this.props
    return (
      <M
        ref={e => (this.markerRef = e)}
        {...props}
        {...this.props}
        onClick={() => {
          props && props.onClick && props.onClick()
          props && this.props.onClick()
        }}
        ref={ele => (this.markerRef = ele)}
        onMouseOver={() => {
          highlight && this.highlight()
          props && props.onMouseOver && props.onMouseOver()
        }}
        onMouseOut={() => {
          highlight && this.removeHighlight()
          props && props.onMouseOut && props.onMouseOut()
        }}
        position={[32.7767, -96.797]}
        icon={this.getIcon()}
      />
    )
  }
}

export default Marker
