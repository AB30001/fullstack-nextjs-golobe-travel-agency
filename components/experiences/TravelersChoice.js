import { Award } from "lucide-react";

export function TravelersChoiceBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2">
      <Award className="h-5 w-5 text-orange-600" />
      <div>
        <div className="text-xs font-semibold text-orange-900">Travelers' Choice</div>
        <div className="text-xs text-orange-700">2025</div>
      </div>
    </div>
  );
}
