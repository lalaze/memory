"use client";

import { useState } from 'react';
import dynamic from "next/dynamic";

const loadComponent = (componentName: string) => {
  switch (componentName) {
    case "new":
      return dynamic(() => import("./new"), {
        loading: () => <p>Loading Component New...</p>,
      });
    default:
      return null;
  }
};

const New = () => {
  const [componentName, setComponentName] = useState("new");

  const DynamicComponent = loadComponent(componentName);

  return <div className="w-full h-full">{DynamicComponent && <DynamicComponent />}</div>;
};

export default New;
