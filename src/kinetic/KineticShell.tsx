import type { ReactNode } from "react";
import { KxAmbientGlow, KxGoldGlowField, KxGrainOverlay } from "@/kinetic/KineticDecor";

/**
 * Outer atmosphere + centered framed surface (reference-style “device” frame).
 */
export function KineticShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <KxAmbientGlow />
      <KxGrainOverlay />
      <div className="relative z-[2] mx-auto max-w-[1440px] px-3 py-3 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="kx-frame-surface relative flex min-h-[calc(100vh-1.5rem)] flex-col sm:min-h-[calc(100vh-2.5rem)]">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[1.75rem]">
            <KxGoldGlowField variant="frame" />
          </div>
          <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
