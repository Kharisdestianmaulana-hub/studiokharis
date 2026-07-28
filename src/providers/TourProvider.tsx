"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Joyride, STATUS, Step, TooltipRenderProps } from "react-joyride";
import { X } from "lucide-react";

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

const CustomTooltip = ({
  index,
  step,
  backProps,
  closeProps,
  primaryProps,
  tooltipProps,
}: TooltipRenderProps) => {
  return (
    <div
      {...tooltipProps}
      className="bg-[#FAFAFA] dark:bg-[#18181B] border border-border p-4 rounded-xl shadow-xl w-80 max-w-[90vw] flex flex-col gap-4 relative"
    >
      <button
        {...closeProps}
        className="absolute top-2 right-2 p-1 text-muted hover:text-foreground transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="mt-2">{step.content}</div>
      <div className="flex items-center justify-between mt-2">
        {index > 0 ? (
          <button
            {...backProps}
            className="text-sm font-medium text-muted hover:text-foreground transition-colors px-3 py-1.5"
          >
            {backProps.title}
          </button>
        ) : (
          <div />
        )}
        
        <button
          {...primaryProps}
          className="bg-[var(--color-accent)] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {primaryProps.title}
        </button>
      </div>
    </div>
  );
};

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
      target: "#tour-profile",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">About Me</h4>
          <p className="text-sm text-muted">Get to know more about who I am and my background.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-home",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Home</h4>
          <p className="text-sm text-muted">Return to the main dashboard anytime.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-projects",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Projects</h4>
          <p className="text-sm text-muted">Explore the portfolio of work I've built.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-experience",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Experience</h4>
          <p className="text-sm text-muted">My professional journey and career history.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-articles",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Articles</h4>
          <p className="text-sm text-muted">Read my thoughts and tutorials on software development.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-contact",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-bold text-foreground">Contact</h4>
          <p className="text-sm text-muted">Let's connect! Reach out to me here.</p>
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
        tooltipComponent={CustomTooltip}
        styles={{
          options: {
            zIndex: 10000,
            overlayColor: "rgba(0, 0, 0, 0.6)",
          },
        } as any}
      />
      {children}
    </TourContext.Provider>
  );
}
