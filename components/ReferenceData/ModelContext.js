import React, { createContext, useContext, useState } from 'react';
import Shiba from '../Model/shiba.glb';

const ModelContext = createContext();

export const useModelContext = () => useContext(ModelContext);

export const ModelProvider = ({ children }) => {
  const [scale, setScale] = useState(7.5);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [brightness, setBrightness] = useState(0);
  const [selectedModel, setSelectedModel] = useState(Shiba);
  const [temp, setTemp] = useState(0);
  const [tint, setTint] = useState(0);

  const resetState = () => {
    setScale(7.5);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setBrightness(0);
    setTemp(0);
    setTint(0);
  };

  return (
    <ModelContext.Provider
      value={{
        scale,
        setScale,
        rotationX,
        setRotationX,
        rotationY,
        setRotationY,
        rotationZ,
        setRotationZ,
        brightness,
        setBrightness,
        selectedModel,
        setSelectedModel,
        temp,
        setTemp,
        tint,
        setTint,
        resetState
      }}
    >
      {children}
    </ModelContext.Provider>
  );
};
