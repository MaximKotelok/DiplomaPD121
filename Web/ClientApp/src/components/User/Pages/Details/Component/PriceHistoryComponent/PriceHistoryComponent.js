import React, { useState, useLayoutEffect,useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import "./PriceHistoryComponent.css"
import { breakpoints, isWidthDown } from '../../../../../../utils/Functions';
const PriceHistoryComponent = ({history}) => {
    const [clickedBarIndex, setClickedBarIndex] = useState(null);
    const [data, setData] = useState(history);
    const [tableWidth, setTableWidth] = useState(1400);    
    
    useLayoutEffect(() => {
        function updateSize() {
            let width = window.innerWidth;
            setTableWidth(width);
        }
    
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    

    const handleBarClick = (index) => {
        setClickedBarIndex(index);
        data.forEach((item, index) => {
            if (item.fill) {
                delete data[index].fill
            }
        });
        data[index].fill = "#007AFF";
        setData(data)
    };

    const CloudLabel = ({ x, y, width, value }) => {
        const labelWidth = 60;
        const labelHeight = 33;
        const triangleHeight = 10;
        const triangleWidth = 17;      
        return (    
          <g transform={`translate(${x + width / 2 - labelWidth / 2}, ${y - labelHeight - triangleHeight})`}>
            <rect x="0" y="1" width={labelWidth} height={labelHeight} rx="5" fill="#FF9500" />
            <polygon points={`${labelWidth / 2 - triangleWidth / 2}, ${labelHeight} ${labelWidth / 2 + triangleWidth / 2}, ${labelHeight} ${labelWidth / 2}, ${labelHeight + triangleHeight}`} fill="#FF9500" />
            <text x={labelWidth / 2} y={labelHeight / 2+3} fill="white" fontSize="14px" textAnchor="middle" dominantBaseline="middle" fontFamily='Mulish' fontWeight="bold">{value.toFixed(2)}</text>
          </g>
        );
      };
      const renderCustomBarLabel = ({ x, y, width, height, value, index, payload }) => {
        if (index === clickedBarIndex) {
          return <CloudLabel x={x} y={y} width={width} value={value} />;
        } else {
          return null;
        }
      };

    return (
        <div className='w-100'>
            <BarChart className='price-history' style={{ width: "100%" }} width={tableWidth} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} >
                <CartesianGrid horizontal={true} vertical={false} strokeDasharray="12 12" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} 
                tickCount={5}
                />
                <Legend />
                <Bar dataKey="value" fill="#0E3E75" radius={[30, 30, 0, 0]} barSize={28}                    
                    onClick={(event, data) => {
                        handleBarClick(data)
                    }
                    
                    } 
                    label={renderCustomBarLabel}
                    />
             
             
                

            </BarChart>
        </div>
    );
};

export default PriceHistoryComponent;
