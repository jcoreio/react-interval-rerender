# react-interval-rerender

[![Build Status](https://travis-ci.org/jcoreio/react-interval-rerender.svg?branch=master)](https://travis-ci.org/jcoreio/react-interval-rerender)
[![Coverage Status](https://codecov.io/gh/jcoreio/react-interval-rerender/branch/master/graph/badge.svg)](https://codecov.io/gh/jcoreio/react-interval-rerender)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Render props component that rerenders its children at regular intervals
This is not the same as [`react-interval`](https://www.npmjs.com/package/react-interval) or
[`react-interval-renderer`](https://www.npmjs.com/package/react-interval-renderer).

# Usage

```sh
npm install --save react-interval-rerender
```

```js
import * as React from 'react'
import Interval from 'react-interval-rerender'

export const Clock = () => (
  <Interval delay={1000}>
    {() => new Date().toLocaleTimeString()}
  </Interval>
)
```

# Props

## `delay?: ?number`

The delay for `setInterval`.  While `!Number.isFinite(delay)`, no interval
will be set.  Whenever `delay` changes the interval will be reset.

## `children?: () => ?React.Node`

Function to render the content.  You can use this or `render`.
`children` takes priority.

## `render?: () => ?React.Node`

Function to render the content.  You can use this or `children`.

