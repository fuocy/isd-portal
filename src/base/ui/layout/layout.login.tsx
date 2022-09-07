import React from 'react';
import styles from './layout.module.css';

const Layout = ({ content,}: {content: React.ReactNode,}) => {
  return (
      <div>
        {content}
      </div>

  )
};

export type LayoutHOC = <T = {}>(Content: React.ComponentType<T>) => React.ComponentType<T>;

export function createLayoutLoginHOC() {
  return function withLayout<T = {}>(Content: React.ComponentType<T>) {
    return (props: T) => (
      <Layout
   
        content={<Content {...props} />}
      />
    )
  }
}
