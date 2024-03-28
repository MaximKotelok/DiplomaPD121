import React from 'react';

const CustomTimeComponent = ({ time,setTime, className }) => {
  function handleChange(event) 
  {    
    setTime(event.target.value);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        onChange={handleChange}
        className={`input-text-form ${className}`}
        type="time"        
        value={time}      
      />
    </div>
  );
};

export default CustomTimeComponent;
