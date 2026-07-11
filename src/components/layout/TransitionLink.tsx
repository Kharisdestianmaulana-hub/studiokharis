"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useStoryStore } from "@/store/useStoryStore";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  href: string;
}

export function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
  const setPendingRoute = useStoryStore((state) => state.setPendingRoute);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call the original onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Ignore modified clicks (ctrl, cmd, shift, middle click)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) {
      return;
    }

    // Ignore external links or download links
    if (props.target === "_blank" || e.currentTarget.hasAttribute("download")) {
      return;
    }

    const url = new URL(href, window.location.href);
    
    // Ignore hash links on the same page
    if (url.pathname === window.location.pathname && url.hash) {
      return;
    }

    e.preventDefault();

    // Only transition if it's a different route
    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      return;
    }

    // Trigger the transition via global store
    setPendingRoute(url.pathname + url.search + url.hash);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
