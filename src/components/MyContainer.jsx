import React from 'react';
import { useNode } from "@craftjs/core";

export default function MyContainer({ children, ...props }) {
    const {
        connectors: { connect, drag },
      } = useNode();
  return (
    <div className="" {...props} ref={(ref) => connect(drag(ref))}>
    {children ? (
      children
    ) : (
      <div className="container custom-container">
        Empty container
      </div>
    )}
  </div>
  )
}
