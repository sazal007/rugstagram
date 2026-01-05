import { BespokeClient } from "@/components/admin/Bespoke/client";

export default function BespokePage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BespokeClient />
      </div>
    </div>
  );
}
