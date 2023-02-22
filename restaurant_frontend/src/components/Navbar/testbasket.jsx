import React from 'react';
import { mount } from 'enzyme';
import Basket from './Basket';

describe('Basket component', () => {
  it('adds items to the cart', () => {
    const wrapper = mount(<Basket />);
    wrapper.find('#add-to-cart').simulate('click');
    expect(wrapper.find('li')).toHaveLength(1);
  });

  it('removes items from the cart', () => {
    const wrapper = mount(<Basket />);
    wrapper.find('#add-to-cart').simulate('click');
    wrapper.find('#remove-from-cart').simulate('click');
    expect(wrapper.find('li')).toHaveLength(0);
  });

  it('calculates the correct total price', () => {
    const wrapper = mount(<Basket />);
    wrapper.find('#add-to-cart').simulate('click');
    wrapper.find('#add-to-cart').simulate('click');
    expect(wrapper.find('#finance').text()).toContain('Subtotal: $35.00');
  });

  it('calculates the correct tax', () => {
    const wrapper = mount(<Basket />);
    wrapper.find('#add-to-cart').simulate('click');
    wrapper.find('#add-to-cart').simulate('click');
    expect(wrapper.find('#finance').text()).toContain('Tax: $1.75');
  });

  it('calculates the correct total with tax', () => {
    const wrapper = mount(<Basket />);
    wrapper.find('#add-to-cart').simulate('click');
    wrapper.find('#add-to-cart').simulate('click');
    expect(wrapper.find('#finance').text()).toContain('Total: $36.75');
  });
});
