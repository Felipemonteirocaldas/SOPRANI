import React from 'react';

// ─────────────────────────────────────────────
// 💀 SKELETON LOADERS — Elegant loading states
// ─────────────────────────────────────────────

/** Base shimmer animation block */
function SkeletonBlock({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-none ${className}`}
      style={{
        background: 'linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.5s ease-in-out infinite',
      }}
    />
  );
}

/** Hero placeholder: full-screen dark skeleton */
export function HeroSkeleton() {
  return (
    <div
      className="w-full min-h-screen flex items-center"
      style={{ background: 'linear-gradient(135deg, #001F5F 0%, #011244 100%)' }}
    >
      <div className="max-w-[100rem] mx-auto px-6 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="h-3 w-24 rounded-none" style={{ background: 'rgba(196,18,48,0.5)' }} />
          <div className="space-y-3">
            <div className="h-12 rounded-none" style={{ background: 'rgba(255,255,255,0.08)', width: '85%' }} />
            <div className="h-12 rounded-none" style={{ background: 'rgba(255,255,255,0.06)', width: '70%' }} />
            <div className="h-12 rounded-none" style={{ background: 'rgba(255,255,255,0.04)', width: '55%' }} />
          </div>
          <div className="h-5 rounded-none" style={{ background: 'rgba(255,255,255,0.06)', width: '90%' }} />
          <div className="h-5 rounded-none" style={{ background: 'rgba(255,255,255,0.04)', width: '75%' }} />
          <div className="flex gap-4 mt-8">
            <div className="h-14 w-48 rounded-none" style={{ background: 'rgba(196,18,48,0.3)' }} />
            <div className="h-14 w-44 rounded-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Marquee strip skeleton */
export function MarqueeSkeleton() {
  return (
    <div className="w-full h-14 bg-primary flex items-center gap-8 px-8 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="h-4 flex-shrink-0 rounded-none"
          style={{
            width: `${80 + Math.random() * 60}px`,
            background: 'rgba(255,255,255,0.08)',
            animation: `pulse 1.5s ease-in-out ${i * 0.1}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Split layout skeleton */
export function SplitLayoutSkeleton() {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
      <div style={{ background: 'linear-gradient(135deg, #001F5F 0%, #011244 100%)' }} className="min-h-[300px]" />
      <div className="bg-white p-12 flex flex-col gap-6 justify-center">
        <div className="h-3 w-20 bg-slate-200" />
        <div className="h-8 w-3/4 bg-slate-100" />
        <div className="h-8 w-1/2 bg-slate-100" />
        <div className="space-y-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-slate-100" style={{ width: `${60 + i * 15}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Services grid skeleton — 6 cards 3×2 */
export function ServicesSkeleton() {
  return (
    <div className="py-12 md:py-16" style={{ background: 'linear-gradient(180deg, #F8F9FA 0%, #EEF2F7 100%)' }}>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div className="space-y-3">
            <div className="h-3 w-20 bg-accent/30" />
            <div className="h-10 w-80 bg-slate-200" />
            <div className="h-10 w-64 bg-slate-100" />
          </div>
          <div className="h-10 w-36 border border-slate-200 bg-white" />
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-100">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="p-14 border-b border-r border-slate-100 space-y-5">
              <div className="w-16 h-16 bg-slate-100 border border-slate-200" />
              <div className="h-6 w-2/3 bg-slate-100" />
              <div className="space-y-2">
                <div className="h-4 bg-slate-100" style={{ width: '100%' }} />
                <div className="h-4 bg-slate-100" style={{ width: '85%' }} />
                <div className="h-4 bg-slate-100" style={{ width: '70%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Partners section skeleton — 2 cards */
export function PartnersSkeleton() {
  return (
    <div
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(135deg, #001F5F 0%, #011244 100%)' }}
    >
      <div className="max-w-[100rem] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="mx-auto h-3 w-32" style={{ background: 'rgba(196,18,48,0.3)' }} />
          <div className="mx-auto h-12 w-80" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="mx-auto h-5 w-96" style={{ background: 'rgba(255,255,255,0.05)' }} />
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="h-64"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** News section skeleton */
export function NewsSkeleton() {
  return (
    <div className="py-16 md:py-32 bg-background-alt">
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 space-y-3">
          <div className="mx-auto h-10 w-64 bg-slate-200" />
          <div className="mx-auto h-5 w-80 bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-slate-100 h-96" />
          <div className="lg:col-span-5 flex flex-col gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[120px] bg-white border border-slate-100" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Events section skeleton */
export function EventsSkeleton() {
  return (
    <div className="bg-white">
      <div className="py-8 bg-primary">
        <div className="max-w-[100rem] mx-auto px-8">
          <div className="h-10 w-72" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>
      </div>
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8 border-b border-slate-100 pb-8">
                <div className="w-32 h-6 bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-6 w-3/4 bg-slate-100" />
                  <div className="h-4 w-1/2 bg-slate-50" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-96 bg-slate-100 hidden lg:block" />
        </div>
      </div>
    </div>
  );
}

/** Generic page section skeleton */
export function SectionSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="py-16 px-6 max-w-[100rem] mx-auto">
      <div className="space-y-4">
        {[...Array(lines)].map((_, i) => (
          <div
            key={i}
            className="h-5 bg-slate-100 rounded-none"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
