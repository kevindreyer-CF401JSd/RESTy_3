import React from 'react';
import { render } from '@testing-library/react';
import {shallow, mount } from 'enzyme';
import fetchMock from 'fetch-mock-jest';
import waitForExpect from 'wait-for-expect';

import App from './App';

describe('<App/> (enzyme test)', () => {
  beforeEach(() => {
    fetchMock.restore() //so test don't interfere with each other
  })
  it('App is alive, RUN button exists', () => {
    let app = shallow(<App />)
    expect(app.find({ children: 'RUN' }).exists()).toBeTruthy()
  })

  it('the Run button gets ', async () => {
    const testRESTy =
      [
        { name: 'test 1 RESTy get from api', url: 'http://example.com/1' },
        { name: 'test 2 RESTy get from api', url: 'http://example.com/2' }
      ]
    fetchMock.getAny(JSON.stringify(testRESTy))
    const app = mount(<App />)
    const button = app.find({ children: 'RUN' })
    button.simulate('click')
    await waitForExpect(() => {
      expect(app.state('results')).toEqual(JSON.stringify(testRESTy))
    })
  })

  it('Post toggle sets POST', () => {
    const app = mount(<App />)
    const button = app.find({ children: 'POST' })
    button.simulate('click')
    expect(app.state('restMethod')).toEqual('POST')
  })
  it('Put toggle sets PUT', () => {
    const app = mount(<App />)
    const button = app.find({ children: 'PUT' })
    button.simulate('click')
    expect(app.state('restMethod')).toEqual('PUT')
  })
  it('Delete toggle sets DELETE', () => {
    const app = mount(<App />)
    const button = app.find({ children: 'DELETE' })
    button.simulate('click')
    expect(app.state('restMethod')).toEqual('DELETE')
  })
  it('Get toggle sets GET', () => {
    const app = mount(<App />)
    const button = app.find({ children: 'GET' })
    button.simulate('click')
    expect(app.state('restMethod')).toEqual('GET')
  })
})
