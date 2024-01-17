import React from 'react';
import { Element, useNode, useEditor } from "@craftjs/core";


export const Row = ({ children, className, ...props }) => {
  const {
    connectors: { connect },
  } = useNode();

  return (
    <div {...props} ref={connect} className={'row ' + className}>
      {children ? <React.Fragment>{children}</React.Fragment> : <div className='div-empty'>Empty Row</div>}
    </div>
  );
};


export default function MyRow({ children, ...props }) {
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  
      return (<>
        {children ??
        [...Array(1).keys()].map((id) => (
            <Element
              is={Row}
              id={'row-' + Math.floor(Math.random() * 1000) + 1} 
              canvas
              className={'row'}
            
            />
            ))
          }
          </>
      );
}
