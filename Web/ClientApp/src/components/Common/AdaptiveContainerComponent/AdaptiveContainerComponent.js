

import React, { useEffect, useLayoutEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import './AdaptiveContainerComponent.css';

import { isWidthDown } from '../../../utils/Functions';

const AdaptiveContainerComponent =
    ({      
        children,        
        mdDisplayCount = 1,
        lgDisplayCount = 3,
        xlDisplayCount = 5
    }) => {
        const childrenArray = React.Children.toArray(children);
        const [firstNChildren, setFirstNChildren] = useState(childrenArray.slice(0, 5));        
        useLayoutEffect(() => {
            function updateSize() {
                let width = window.innerWidth;

                if (isWidthDown("md", width)) {
                    setFirstNChildren(childrenArray.slice(0, mdDisplayCount));
                }
                else if (isWidthDown("lg", width)) {
                    setFirstNChildren(childrenArray.slice(0, lgDisplayCount));
                } else {
                    setFirstNChildren(childrenArray.slice(0, xlDisplayCount));
                }
            }

            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);


        return (
            <div className={`d-flex ${firstNChildren.count != xlDisplayCount&&"justify-content-evenly"}`}>    
                {firstNChildren} 
            </div>
        );
    };

export default AdaptiveContainerComponent;
