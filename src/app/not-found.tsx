import { NotFoundInteractive } from "@/components/sections/NotFoundInteractive";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "Looks like you are lost.",
};

export default function NotFound() {
  return <NotFoundInteractive />;
}
