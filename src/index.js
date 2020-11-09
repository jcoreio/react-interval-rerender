// @flow

import * as React from 'react'

export type Props = {
  delay?: ?number,
  render?: () => ?React.Node,
  children?: () => ?React.Node,
}

export default class Interval extends React.Component<Props> {
  _intervalID: any = null

  state = {
   delay:null,
  };
  
  _stop() {
    if (this._intervalID != null) {
      clearInterval(this._intervalID)
      this._intervalID = null
    }
  }

  _start(delay: ?number) {
    if (delay != null && Number.isFinite(delay)) {
      this._intervalID = setInterval(() => this.forceUpdate(), delay)
    }
  }

  componentDidMount() {
    this._start(this.props.delay)
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.delay !== nextProps.delay) {
      return {delay:nextProps.delay};
    }
    return null;
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.delay !== this.state.delay) {
	  this._stop()
      this._start(this.state.delay)
    }
  }

  componentWillUnmount() {
    this._stop()
  }
  
  render(): React.Node | null {
    const {render, children} = this.props
    if (children) return normalizeNull(children())
    if (render) return normalizeNull(render())
    return null
  }
}

function normalizeNull<T>(value: ?T): T | null {
  if (value == null) return null
  return value
}
