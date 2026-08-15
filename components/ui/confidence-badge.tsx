"use client";

interface ConfidenceBadgeProps {
  confidence: number | null;
  status?: string;
  showBar?: boolean;
}

export function ConfidenceBadge({ confidence, status = "VERIFIED", showBar = true }: ConfidenceBadgeProps) {
  if (confidence === null || confidence === undefined) {
    return (
      <div className="inline-flex items-center gap-2 border border-[#3d4a42] bg-[#191c1d] px-3 py-1 text-[12px] font-semibold text-[#87948b] tracking-wider uppercase">
        <span className="h-2 w-2 rounded-full bg-[#87948b]"></span>
        PENDING VERIFICATION
      </div>
    );
  }

  const roundedConf = Math.min(100, Math.max(0, Math.round(confidence)));
  const filledSegments = Math.round((roundedConf / 100) * 10);

  return (
    <div className="flex flex-col gap-1.5 min-w-[160px]">
      <div className="flex items-center justify-between text-[12px] font-semibold tracking-wider text-[#e1e3e4] uppercase">
        <span className="text-[#059669] flex items-center gap-1.5">
          <span className="h-2 w-2 bg-[#059669]"></span>
          {status.toUpperCase()}
        </span>
        <span className="font-mono text-[13px] text-[#059669]">{roundedConf}%</span>
      </div>

      {showBar && (
        <div className="grid grid-cols-10 gap-1 w-full bg-[#0c0f10] p-1 border border-[#282a2b]">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 transition-colors ${
                idx < filledSegments ? "bg-[#059669]" : "border border-[#3d4a42] bg-[#191c1d]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
