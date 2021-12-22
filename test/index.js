// @flow

import {describe, it} from 'mocha'
import * as React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'
import sinon from 'sinon'

import Interval from '../src'

describe('Interval', () => {
  let clock

  beforeEach(() => clock = sinon.useFakeTimers())
  afterEach(() => clock.restore())

  it("rerenders on fixed interval", async function (): Promise<void> {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal("1")
    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("2")
    await clock.tickAsync(1000)
    expect(comp.update().text()).to.equal("3")
    comp.unmount()
  })
  it("supports child function", async function (): Promise<void> {
    let count = 0
    const comp = mount(<Interval delay={1000}>{() => ++count}</Interval>)
    expect(comp.text()).to.equal("1")
    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("2")
    await clock.tickAsync(1000)
    expect(comp.update().text()).to.equal("3")
    comp.unmount()
  })
  it("supports no rendering", async function (): Promise<void> {
    const comp = mount(<Interval delay={1000} />)
    comp.unmount()
  })
  it("resets interval when delay is changed", async function (): Promise<void> {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal("1")
    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("2")

    comp.setProps({
      delay: 500
    })

    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("5")
    comp.unmount()
  })
  it("clears interval when delay becomes non-finite", async function (): Promise<void> {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal("1")
    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("2")

    comp.setProps({
      delay: NaN
    })

    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("3")
    comp.unmount()
  })
  it("stats interval when delay becomes finite", async function (): Promise<void> {
    let count = 0
    const comp = mount(<Interval delay={null} render={() => ++count} />)
    expect(comp.text()).to.equal("1")
    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("1")

    comp.setProps({
      delay: 1000
    })

    await clock.tickAsync(1200)
    expect(comp.update().text()).to.equal("3")
    comp.unmount()
  })
})

