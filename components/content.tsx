"use client";

import { ToastContainer } from "react-toastify";
import { useGlobalState } from './view'
import dynamic from "next/dynamic";

const loadComponent = (componentName: string) => {
  switch (componentName) {
    case "new":
      return dynamic(() => import("./new"), {
        loading: () => <p>Loading Component New...</p>,
      });
    case "list":
      return dynamic(() => import("./list"), {
        loading: () => <p>Loading Component New...</p>,
      });
    default:
      return null;
  }
};

const Content = () => {
  const { componentName } = useGlobalState();

  const DynamicComponent = loadComponent(componentName);

  return (
    <div className="w-full h-full">
      <ToastContainer stacked />
      {DynamicComponent && <DynamicComponent />}
    </div>
  );
};

export default Content;
