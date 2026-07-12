import {
  MediaSectionSkeleton,
  SearchSkeleton,
} from "@/app/components/media/media-skeletons";

export default function Loading() {
  return (
    <div className="space-y-6 md:space-y-8 pb-6">
      <SearchSkeleton />
      <MediaSectionSkeleton />
    </div>
  );
}
