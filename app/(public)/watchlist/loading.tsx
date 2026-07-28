import { MediaSectionSkeleton } from "@/app/components/media/media-skeletons";

export default function Loading() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6 pl-1.5">
      <MediaSectionSkeleton filters />
    </div>
  );
}
