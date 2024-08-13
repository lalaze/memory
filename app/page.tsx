import View from "../components/view";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <div className="dark">
        <View></View>
      </div>
    </NextUIProvider>
  );
}
