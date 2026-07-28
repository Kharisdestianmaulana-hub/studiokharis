"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Joyride, STATUS, Step } from "react-joyride";

interface TourContextType {
  runTour: boolean;
  startTour: () => void;
  stopTour: () => void;
}

const TourContext = createContext<TourContextType>({
  runTour: false,
  startTour: () => {},
  stopTour: () => {},
});

export const useTour = () => useContext(TourContext);

export function TourProvider({ children }: { children: React.ReactNode }) {
  const [runTour, setRunTour] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [tourKey, setTourKey] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    // Check if the user has seen the tour before
    const hasSeenTour = localStorage.getItem("studiokharis_tour_seen");
    
    // Auto-start for new visitors after a short delay
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const steps: Step[] = [
    {
      target: "body",
      content: (
        <div className="flex flex-col gap-2 p-2">
          <h3 className="text-xl font-bold text-foreground">Welcome to StudioKharis! 👋</h3>
          <p className="text-sm text-muted">Let me give you a quick tour of the features on this website. It will only take a moment!</p>
        </div>
      ),
      placement: "center",
    },
    {
      target: "#tour-sidebar",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Navigation Menu</h4>
          <p className="text-sm text-muted">Explore my articles, projects, and experiences easily from here.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-search",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Global Search</h4>
          <p className="text-sm text-muted">Looking for something specific? Press <kbd className="px-1.5 py-0.5 bg-primary/20 rounded-md mx-1">⌘ K</kbd> to search anywhere!</p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "#tour-visitor",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Live Visitor Counter</h4>
          <p className="text-sm text-muted">See how many awesome people like you have visited this page.</p>
        </div>
      ),
      placement: "left",
    },
    {
      target: "#tour-music",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Lo-Fi Music Player</h4>
          <p className="text-sm text-muted">Need focus? Click here to play some chill Lo-Fi beats while browsing.</p>
        </div>
      ),
      placement: "top-end",
    },
  ];

  const handleJoyrideCallback = (data: any) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem("studiokharis_tour_seen", "true");
    }
  };

  const startTour = () => {
    setTourKey(prev => prev + 1);
    setRunTour(true);
  };

  const stopTour = () => {
    setRunTour(false);
  };

  if (!isMounted) return <>{children}</>;

  return (
    <TourContext.Provider value={{ runTour, startTour, stopTour }}>
      {/* @ts-ignore - react-joyride typings are incomplete in this version */}
      <Joyride
        key={tourKey}
        steps={steps}
        run={runTour}
        continuous
        {...({ showProgress: true, showSkipButton: true } as any)}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "var(--color-accent)",
            textColor: "var(--color-primary-text)",
            backgroundColor: "var(--color-surface)",
            arrowColor: "var(--color-surface)",
            overlayColor: "rgba(0, 0, 0, 0.6)",
          },
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "var(--color-accent)",
            color: "var(--color-surface)",
            borderRadius: "0.5rem",
          },
          buttonBack: {
            marginRight: 10,
            color: "var(--color-muted)",
          },
          buttonSkip: {
            color: "var(--color-muted)",
          },
        } as any}
      />
      {children}
    </TourContext.Provider>
  );
}
