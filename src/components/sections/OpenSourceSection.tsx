import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getOpenSource } from "@/data/oss";
import { RepositoryCard } from "@/components/shared/RepositoryCard";
import { FaGithub } from "react-icons/fa";

export async function OpenSourceSection() {
  const ossData = await getOpenSource();
  return (
    <section id="open-source" className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
      <div className="flex items-end justify-between mb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">Open Source</h3>
          <p className="text-muted text-sm md:text-base max-w-xl">
            My contributions to the open-source community.
          </p>
        </div>
        <Link 
          href="https://github.com/amelie" 
          target="_blank"
          className="hidden md:flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
        >
          <FaGithub className="w-4 h-4" /> View GitHub Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ossData.map((repo: any) => (
          <RepositoryCard key={repo.id} repo={repo} />
        ))}
      </div>
      
      <div className="mt-6 md:hidden">
        <Link 
          href="https://github.com/amelie" 
          target="_blank"
          className="flex items-center justify-center gap-1.5 text-sm font-medium text-foreground bg-secondary/5 border border-border rounded-xl py-3 hover:bg-secondary/10 transition-colors"
        >
          <FaGithub className="w-4 h-4" /> View GitHub Profile
        </Link>
      </div>
    </section>
  );
}
