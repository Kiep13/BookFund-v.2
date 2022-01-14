import { Component } from 'react';

const compose = (...func: Function[]) => (comp: Component | Function) => {
  return func.reduceRight((wrapped: any, f: Function) => f(wrapped), comp);
}

export default compose;
