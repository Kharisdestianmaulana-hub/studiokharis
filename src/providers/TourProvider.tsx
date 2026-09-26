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
  isLastStep,
}: TooltipRenderProps) => {
  return (
    <div
      {...tooltipProps}
      className="bg-background border-[4px] border-foreground p-6 rounded-none shadow-[12px_12px_0_0_var(--foreground)] w-[360px] max-w-[90vw] flex flex-col gap-4 relative"
    >
      <button
        {...closeProps}
        className="absolute top-2 right-2 p-1 text-foreground hover:bg-foreground hover:text-background transition-colors border-2 border-transparent hover:border-foreground"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="mt-2 text-foreground">{step.content}</div>
      <div className="flex items-center justify-between mt-4 border-t-[3px] border-foreground pt-4">
        {index > 0 ? (
          <button
            {...backProps}
            className="text-sm font-black uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background border-[3px] border-transparent hover:border-foreground transition-colors px-4 py-2"
          >
            {backProps.title}
          </button>
        ) : (
          <div />
        )}
        
        <button
          {...primaryProps}
          className="bg-foreground text-background border-[3px] border-foreground px-6 py-2 rounded-none text-sm font-black uppercase tracking-widest hover:bg-background hover:text-foreground transition-all shadow-[4px_4px_0_0_var(--foreground)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:translate-x-1 active:translate-y-1"
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
    
    // Check if the user is on mobile (Tailwind md breakpoint is 768px)
    const isMobile = window.innerWidth < 768;
    
    // Check if the user has seen the tour before
    const hasSeenTour = localStorage.getItem("has_seen_tour_v2");
    
    // Auto-start for new visitors after a short delay (only on desktop)
    if (!hasSeenTour && !isMobile) {
      const timer = setTimeout(() => {
        setRunTour(true);
        // Mark as seen immediately so it doesn't auto-run again if they just refresh
        localStorage.setItem("has_seen_tour_v2", "true");
      }, 1500);
      return () => clearTimeout(timer);
    } else if (!hasSeenTour && isMobile) {
      // If they are on mobile, just mark it as seen silently so it doesn't bother them
      localStorage.setItem("has_seen_tour_v2", "true");
    }
  }, []);

  const startTour = () => {
    // Optional: prevent manual start on mobile too, or let them do it if they want
    // But since the targets are hidden, manual start will also break.
    if (window.innerWidth < 768) {
      alert("Tutorial is only available on desktop screens.");
      return;
    }
    setTourKey(prev => prev + 1);
    setRunTour(true);
  };

  const steps: Step[] = [
    {
      target: "body",
      content: (
        <div className="flex flex-col gap-2 p-2">
          <h3 className="text-2xl font-black uppercase tracking-widest text-foreground">WELCOME TO STUDIOKHARIS!</h3>
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Let's take a quick tour of this brutalist interface.</p>
        </div>
      ),
      placement: "center",
    },
    {
      target: "#tour-collapse",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">TOGGLE SIDEBAR</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Expand or collapse the sidebar for more screen real estate.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-profile",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">ABOUT ME</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Get to know more about who I am and my background.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-home",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">HOME</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Return to the main dashboard anytime.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-projects",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">PROJECTS</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Explore the portfolio of work I've built.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-experience",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">EXPERIENCE</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">My professional journey and career history.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-articles",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">ARTICLES</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Read my thoughts and tutorials on software development.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-contact",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">CONTACT</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Let's connect! Reach out to me here.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-globe",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">VISITOR MAP</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">See live visitor locations across the globe.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-theme",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">THEME SWITCH</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Toggle between light and dark brutalism.</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-search",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">GLOBAL SEARCH</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Looking for something? Press <kbd className="px-2 py-0.5 border-[2px] border-foreground bg-foreground text-background font-black mx-1">⌘ K</kbd> anywhere!</p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "#tour-visitor",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">VISITOR COUNTER</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Live statistics of people who visited this page.</p>
        </div>
      ),
      placement: "left",
    },
    {
      target: "#tour-music",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">LO-FI PLAYER</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">Need focus? Play some chill beats while browsing.</p>
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
      localStorage.setItem("has_seen_tour_v2", "true");
    }
  };



  const stopTour = () => {
    setRunTour(false);
  };

  return (
    <TourContext.Provider value={{ runTour, startTour, stopTour }}>
      {isMounted && (
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
      )}
      {children}
    </TourContext.Provider>
  );
}
