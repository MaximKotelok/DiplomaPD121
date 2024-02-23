import React, { useState, useEffect } from "react";

const Content = ({ selectedMenu }) => {
  const [generatedData, setGeneratedData] = useState("");

  useEffect(() => {
    // Генерація нових даних залежно від вибраного меню
    generateData(selectedMenu);
  }, [selectedMenu]);

  const generateData = (menuId) => {
    // Логіка генерації даних на основі вибраного меню
    const newData = `Дані для ${menuId}`;
    setGeneratedData(newData);
  };

  return (
    <div>
      <h2>Дані:</h2>
      <p>{generatedData}</p>
    </div>
  );
};

export default Content;
