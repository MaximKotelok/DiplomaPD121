

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './AdaptiveContainerComponent.css';

import { isWidthDown } from '../../../utils/Functions';

const AdaptiveContainerComponent =
    ({
        className="",      
        children,        
        mdDisplayCount = 1,
        lgDisplayCount = 3,
        xlDisplayCount = 5,
        xxlDisplayCount = 5,
        isInMiddleIfNotFull = true
    }) => {
        const [childrenArray, setChildrenArray] = useState([]);
        const [firstNChildren, setFirstNChildren] = useState([]);   
        const [width, setWidth] = useState(window.innerWidth);   


        useEffect(()=>{   
            setChildrenArray(React.Children.toArray(children));
           },[children]);      

        useEffect(()=>{            

            if (isWidthDown("md", width)) {
                setFirstNChildren(childrenArray.slice(0, mdDisplayCount));
              } else if (isWidthDown("lg", width)) {
                setFirstNChildren(childrenArray.slice(0, lgDisplayCount));
              } else if (isWidthDown("xl", width)) {
                setFirstNChildren(childrenArray.slice(0, xlDisplayCount));
              } else {
                setFirstNChildren(childrenArray.slice(0, xxlDisplayCount));
              }
        },[childrenArray, width]);     

        useLayoutEffect(() => {
            function updateSize() {
                let width = window.innerWidth;
                setWidth(width);
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return (
            <div className={`d-flex ${isInMiddleIfNotFull&&firstNChildren.count != xlDisplayCount&&"justify-content-evenly"} ${className}`}>    
                {firstNChildren} 
            </div>
        );
    };

export default AdaptiveContainerComponent;
