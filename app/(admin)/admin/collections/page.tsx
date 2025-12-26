import { CategoryClient } from "@/components/admin/collections/client";

export default function CollectionsPage() {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient />
      </div>
    </div>
  );
}
