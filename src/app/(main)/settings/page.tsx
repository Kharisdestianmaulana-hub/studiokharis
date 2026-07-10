import { SettingsContent } from "./SettingsContent";

export const metadata = {
  title: "Settings | Studiokharis",
  description: "Settings for Studiokharis",
};

export default function SettingsPage() {
  return (
    <div className="pb-16 pt-8">
      <SettingsContent />
    </div>
  );
}
