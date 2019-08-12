import React, { Component } from 'react'
import { Marker as M } from 'react-leaflet'
import L from 'leaflet'
import ReactDOMServer from 'react-dom/server'
import { createIcon, defaultMarker, getChildrenProperties } from './Utilities/IconUtils'
import areEqual from 'fbjs/lib/areEqual'

class Marker extends Component {
  state = {
    zoom: '100%',
    defaultHeight: 20,
    defaultWidth: 30,
    iconHeight: 50,
    iconWidth: 50,
    properties: []
  }

  componentDidMount() {
    const { icon } = this.props
    if (typeof icon === 'string' || typeof icon.props.children === 'string') return
    if (icon.props.children instanceof Array) {
      const children = icon.props.children.filter(child => typeof child === 'object')
      if (children && typeof children !== 'string') {
        const properties = getChildrenProperties(children, {})
        this.setState({ properties })
      }
    } else {
      const { children } = icon.props
      const properties = getChildrenProperties(children)
      this.setState({ properties })
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
    const { props: iconProps } = this.props.icon
    const { highlight } = this.props
    const { properties } = this.state
    return (
      <React.Fragment>
        <M
          style={{
            cursor: 'pointer'
          }}
          ref={e => (this.markerRef = e)}
          {...iconProps}
          {...properties}
          {...this.props}
          onClick={() => {
            iconProps && iconProps.onClick && iconProps.onClick()
            this.props && this.props.onClick && this.props.onClick()
            properties && properties.onClick && properties.onClick()
          }}
          ref={ele => (this.markerRef = ele)}
          onMouseOver={() => {
            highlight && this.highlight()
            iconProps && iconProps.onMouseOver && iconProps.onMouseOver()
          }}
          onMouseOut={() => {
            highlight && this.removeHighlight()
            iconProps && iconProps.onMouseOut && iconProps.onMouseOut()
          }}
          position={[32.7767, -96.797]}
          icon={this.getIcon()}
        />
      </React.Fragment>
    )
  }
}

export default Marker
