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

  it('rerenders on fixed interval', () => {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal('1')
    clock.tick(1200)
    expect(comp.update().text()).to.equal('2')
    clock.tick(1000)
    expect(comp.update().text()).to.equal('3')
    comp.unmount()
  })
  it('supports child function', () => {
    let count = 0
    const comp = mount(<Interval delay={1000}>{() => ++count}</Interval>)
    expect(comp.text()).to.equal('1')
    clock.tick(1200)
    expect(comp.update().text()).to.equal('2')
    clock.tick(1000)
    expect(comp.update().text()).to.equal('3')
    comp.unmount()
  })
  it('supports no rendering', () => {
    const comp = mount(<Interval delay={1000} />)
    comp.unmount()
  })
  it('resets interval when delay is changed', () => {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal('1')
    clock.tick(1200)
    expect(comp.update().text()).to.equal('2')
    comp.setProps({delay: 500})
    clock.tick(1200)
    expect(comp.update().text()).to.equal('5')
    comp.unmount()
  })
  it('clears interval when delay becomes non-finite', () => {
    let count = 0
    const comp = mount(<Interval delay={1000} render={() => ++count} />)
    expect(comp.text()).to.equal('1')
    clock.tick(1200)
    expect(comp.update().text()).to.equal('2')
    comp.setProps({delay: NaN})
    clock.tick(1200)
    expect(comp.update().text()).to.equal('3')
    comp.unmount()
  })
  it('stats interval when delay becomes finite', () => {
    let count = 0
    const comp = mount(<Interval delay={null} render={() => ++count} />)
    expect(comp.text()).to.equal('1')
    clock.tick(1200)
    expect(comp.update().text()).to.equal('1')
    comp.setProps({delay: 1000})
    clock.tick(1200)
    expect(comp.update().text()).to.equal('3')
    comp.unmount()
  })
})

