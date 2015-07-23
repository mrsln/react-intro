'use strict';

import React from 'react';
import _     from 'lodash';

const MIN_TOOLTIP_WIDTH  = 100;
const MIN_TOOLTIP_HEIGHT = 50;
const ARROW_SIZE = 9;

export default class Intro extends React.Component {

  static propsTypes = {
    // the DOM element that needs to be highlighted
    element: React.PropTypes.object,

    // wether to show the intro
    show: React.PropTypes.boolean,
  }

  static defaultProps = {
    element: null,
    show: true,
  }

  constructor(props) {
    super(props);
    this.state = {
      // the element's rect for a justifying
      tooltipRect: {},

      // the element's rect (also for a justifying) placed in the state
      // so the render method would be purely based on the state and the props
      elementRect: {},
    }
  }

  componentWillReceiveProps(props) {
    if (props.element != this.props.element) {
      // restore the styling for the previous element
      if (this.props.element != null) {
        this.props.element.style.zIndex = 0;
        this.props.element.style.position = 'relative';
      }

      // make the element visible (in front of the overlay)
      props.element.style.zIndex = 2;
      props.element.style.position = 'relative';

      this.setState({elementRect: props.element.getBoundingClientRect()});
    }
  }

  componentDidUpdate() {
    if (!this.props.element || !this.props.show) return null;

    const tooltip     = React.findDOMNode(this.refs.tooltip);
    const tooltipRect = tooltip.getBoundingClientRect();
    if (!_.isEqual(tooltipRect, this.state.tooltipRect)) {
      this.setState({tooltipRect});
    }
  }

  render() {
    if (!this.props.element || !this.props.show) return null;

    const style = {
      overlay: {
        position: 'fixed',
        top:     0,
        bottom:  0,
        left:    0,
        right:   0,
        opacity:         0.8,
        backgroundColor: 'black',
        zIndex:  1,
      },
      tooltip: {
        position:  'absolute',
        top:       this.state.elementRect.bottom + ARROW_SIZE,
        left:      this.state.elementRect.left,
        minWidth:  MIN_TOOLTIP_WIDTH,
        minHeight: MIN_TOOLTIP_HEIGHT,
        borderRadius:    3,
        boxShadow:       '0 1px 10px rgba(0,0,0,.4)',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
        transition: 'all .3 ease-out',
      },
      arrow: {
        position: 'absolute',
        top: -(ARROW_SIZE-1),
        width:  0,
        height: 0,
        borderLeft:   ARROW_SIZE + 'px solid transparent',
        borderRight:  ARROW_SIZE + 'px solid transparent',
        borderBottom: ARROW_SIZE + 'px solid white',
      },
      text: {
        padding: 5,
      },
      gap: {
        top: this.state.elementRect.top, // for some reason ...this.state.elementRect didn't work
        left: this.state.elementRect.left,
        width: this.state.elementRect.width,
        height: this.state.elementRect.height,
        bottom: this.state.elementRect.bottom,
        right: this.state.elementRect.right,
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.9)',
        zIndex: 2,
      },
    };

    return (
      <div>
        <div style={style.overlay}/>

        <div style={style.gap}/>

        <div style={style.tooltip} ref='tooltip'>
          <div style={style.arrow}/>
          <div style={style.text}>
            {this.props.text}
          </div>
        </div>

      </div>
    );
  }

};
