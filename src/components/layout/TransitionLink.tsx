"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useTransitionStore } from "@/store/useTransitionStore";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: string;
  href: string;
}

export function TransitionLink({ children, href, onClick, ...props }: TransitionLinkProps) {
  const setPendingRoute = useTransitionStore((state) => state.setPendingRoute);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) {
      return;
    }

    if (props.target === "_blank" || e.currentTarget.hasAttribute("download")) {
      return;
    }

    const url = new URL(href, window.location.href);
    
    if (url.pathname === window.location.pathname && url.hash) {
      return;
    }

    e.preventDefault();

    if (url.pathname === window.location.pathname && url.search === window.location.search) {
      return;
    }

    setPendingRoute(url.pathname + url.search + url.hash);
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
