import { Component } from 'react';

export const compose = (...func: Function[]) => (comp: Component | Function) => {
  return func.reduceRight((wrapped: any, f: Function) => f(wrapped), comp);
}
