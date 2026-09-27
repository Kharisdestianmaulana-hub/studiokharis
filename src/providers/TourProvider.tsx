"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Joyride, STATUS, Step, TooltipRenderProps } from "react-joyride";
import { X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

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
  const { dict } = useLanguage();
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
      alert(dict.tour.mobileWarning);
      return;
    }
    setTourKey(prev => prev + 1);
    setRunTour(true);
  };

  const initialSteps: Step[] = [
    {
      target: "body",
      content: (
        <div className="flex flex-col gap-2 p-2">
          <h3 className="text-2xl font-black uppercase tracking-widest text-foreground">{dict.tour.welcomeTitle}</h3>
          <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{dict.tour.welcomeDesc}</p>
        </div>
      ),
      placement: "center",
    },
    {
      target: "#tour-collapse",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.sidebarTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.sidebarDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-profile",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.aboutTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.aboutDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-home",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.homeTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.homeDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-projects",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.projectsTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.projectsDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-experience",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.experienceTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.experienceDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-tech-stack",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.techStackTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.techStackDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-articles",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.articlesTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.articlesDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-visitor-map",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.visitorMapTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.visitorMapDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-guestbook",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.guestbookTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.guestbookDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-timeline",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.timelineTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.timelineDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-contact",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.contactTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.contactDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-nav-settings",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.settingsTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.settingsDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-theme",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.themeTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.themeDesc}</p>
        </div>
      ),
      placement: "right",
    },
    {
      target: "#tour-search",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.searchTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.searchDesc} <kbd className="px-2 py-0.5 border-[2px] border-foreground bg-foreground text-background font-black mx-1">⌘ K</kbd></p>
        </div>
      ),
      placement: "bottom",
    },
    {
      target: "#tour-visitor",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.visitorTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.visitorDesc}</p>
        </div>
      ),
      placement: "left",
    },
    {
      target: "#tour-music",
      content: (
        <div className="flex flex-col gap-1 text-left">
          <h4 className="font-black text-lg uppercase tracking-wider text-foreground">{dict.tour.musicTitle}</h4>
          <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{dict.tour.musicDesc}</p>
        </div>
      ),
      placement: "top-end",
    },
  ];
  
  const steps: Step[] = initialSteps.map(step => ({ ...step, isFixed: true }));

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
          disableScrolling={true}
          disableScrollParentFix={true}
          {...({ showProgress: true, showSkipButton: true } as any)}
          callback={handleJoyrideCallback}
          tooltipComponent={CustomTooltip}
          locale={{
            back: dict.tour.back,
            close: dict.tour.close,
            last: dict.tour.last,
            next: dict.tour.next,
            skip: dict.tour.skip,
          }}
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
