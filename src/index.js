// @flow

import * as React from 'react'

export type Props = {
  delay?: ?number,
  render?: () => ?React.Node,
  children?: () => ?React.Node,
}

export default class Interval extends React.Component<Props> {
  _intervalID: any = null

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

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.delay !== nextProps.delay) {
      this._stop()
      this._start(nextProps.delay)
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
