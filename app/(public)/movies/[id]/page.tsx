import type { Metadata } from "next";

import MovieFacts from "@/app/components/movie/detail/movie-facts";
import MovieHero from "@/app/components/movie/detail/movie-hero";
import ReviewForm from "@/app/components/movie/detail/review-form";
import SimilarMovies from "@/app/components/movie/detail/similar-movies";
import StreamingPreview from "@/app/components/movie/detail/streaming-preview";
import { movie } from "@/app/data/movie-detail";
import Cast from "@/app/components/media/cast/cast";

type MoviePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { id } = await params;

  void id;

  // Replace with TMDB Movie detail
  return {
    title: `${movie.title} | Talora Vault`,
    description: `View ${movie.title}, ratings, cast, similar movies, reviews, and legal streaming options on Talora Vault.`,
    openGraph: {
      title: `${movie.title} | Talora Vault`,
      description: movie.overview,
      type: "video.movie",
    },
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  // Keep the route param ready for TMDB integration.
  void id;

  return (
    <div className="pb-10 xl:pr-8">
      <MovieHero movie={movie} />
      <MovieFacts movie={movie} />

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-8">
          <StreamingPreview movie={movie} />
          <SimilarMovies movies={movie.similarMovies} />
          <ReviewForm />
        </div>

        <Cast cast={movie.cast} />
      </div>
    </div>
  );
}
