"use strict";

var chai = require('chai');
var expect = chai.expect;
var tabs = require('./product-tabs');

describe('Product Tabs Controller', function () {
  var prodTabs;
  
  beforeEach(function () {
    prodTabs = Object.create(tabs.dir());
    prodTabs = new prodTabs.controller();
  });
  
  it('should have property of 99', function () {
    expect(tabs.prop).to.equal(99);
  });
  
  it('should have a restrict property set to \'E\'', function () {
    expect(tabs.dir().restrict).to.equal('E');
  });
  
  it('should be set to 1 initially', function () {
    expect(prodTabs.isSet(1)).to.equal(true);
  });
});