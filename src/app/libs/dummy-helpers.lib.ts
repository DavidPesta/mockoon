import * as DummyJSON from 'dummy-json';
import random from 'lodash/random';

export const DummyJSONHelpers = (request) => {
  return {
    // use params from url /:param1/:param2
    urlParam: (paramName) => {
      return request.params[paramName];
    },
    // use params from query string ?param1=xxx&param2=yyy
    queryParam: (paramName) => {
      return request.query[paramName];
    },
    // use content from request header
    header: (headerName) => {
      return request.get(headerName);
    },
    // use request hostname
    hostname: () => {
      return request.hostname;
    },
    // use request ip
    ip: () => {
      return request.ip;
    },
    // use request method
    method: () => {
      return request.method;
    },
    // return one random item
    oneOf: (itemList: string[]) => {
      return DummyJSON.utils.randomArrayItem(itemList);
    },
    // return some random item
    someOf: (itemList: string[], min: number, max: number) => {
      const shuffledList = itemList.sort(() => .5 - Math.random());
      return shuffledList.slice(0, random(min, max));
    },
    // create an array
    array: (...args: any[]) => {
      // remove last item (dummy json options argument)S
      return args.slice(0, args.length - 1);
    },
    // switch cases
    switch: (value, options) => {
      this.switchValue = value;
      const htmlContent = options.fn(this);
      return htmlContent;
    },
    // case helper for switch
    case: (value, options) => {
      // check switch value to simulate break
      if (this.switchValue && value === this.switchValue) {
        delete this.switchValue;
        return options.fn(this);
      }
    },
    // default helper for switch
    default: (options) => {
      // if there is still a switch value show default content
      if (this.switchValue) {
        delete this.switchValue;
        return options.fn(this);
      }
    }
  }
};