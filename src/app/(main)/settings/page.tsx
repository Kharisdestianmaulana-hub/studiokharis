export const metadata = {
  title: "Settings | Studiokharis",
  description: "Settings for Studiokharis",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-16 pb-16 pt-8">
      <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-bold tracking-tight text-foreground">Settings</h3>
            <p className="text-muted text-sm md:text-base max-w-xl">
              Application preferences.
            </p>
          </div>
          <div className="text-secondary-text">
            Use the sidebar to toggle Theme. More settings coming soon!
          </div>
        </div>
      </section>
    </div>
  );
}
