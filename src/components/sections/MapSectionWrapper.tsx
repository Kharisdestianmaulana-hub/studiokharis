"use client";

import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("./MapSection"), {
  ssr: false,
});

export function MapSectionWrapper({ messages }: { messages: any[] }) {
  return <MapSection messages={messages} />;
}
