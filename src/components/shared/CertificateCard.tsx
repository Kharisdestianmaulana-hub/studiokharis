import * as React from "react";
import { Award, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function CertificateCard({ certificate }: { certificate: any }) {
  return (
    <Card className="group bg-surface border-border overflow-hidden rounded-[16px] hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <CardContent className="p-6 flex flex-col h-full justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-secondary/5 rounded-xl text-accent border border-border/50 group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-foreground leading-tight">
              {certificate.title}
            </h4>
            <span className="text-sm text-secondary-text">
              {certificate.institution}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border/50">
          <span>Issued {new Date(certificate.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          {certificate.credentialId && (
            <span className="font-mono bg-secondary/10 px-2 py-0.5 rounded">
              ID: {certificate.credentialId}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
