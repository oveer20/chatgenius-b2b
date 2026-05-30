"use client";

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/5 ${className ?? ""}`}
    />
  );
}

export function SkeletonBox({ className }: { className?: string }) {
  return <Pulse className={className} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/10 bg-bg/60 p-6 backdrop-blur-xl space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Pulse className="h-5 w-3/4" />
          <Pulse className="h-3 w-1/2" />
        </div>
        <Pulse className="h-5 w-16 rounded-full" />
      </div>
      <Pulse className="h-8 w-2/3" />
      <div className="flex gap-3">
        <Pulse className="h-10 flex-1" />
        <Pulse className="h-10 flex-1" />
      </div>
    </div>
  );
}

export function SkeletonKPI() {
  return (
    <div className="rounded-xl border border-white/10 bg-bg/60 p-6 backdrop-blur-xl space-y-3">
      <div className="flex items-center gap-2">
        <Pulse className="h-4 w-4" />
        <Pulse className="h-3 w-20" />
      </div>
      <Pulse className="h-8 w-16" />
    </div>
  );
}

export function SkeletonTableRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/[0.03]">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <Pulse className={`h-4 ${i === 0 ? "w-32" : i === cols - 1 ? "w-20" : "w-24"}`} />
        </td>
      ))}
    </tr>
  );
}
