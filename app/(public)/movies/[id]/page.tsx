import type { Metadata } from "next";

import MovieFacts from "@/app/components/movie/detail/movie-facts";
import MovieHero from "@/app/components/movie/detail/movie-hero";
import ReviewForm from "@/app/components/movie/detail/review-form";
import SimilarMovies from "@/app/components/movie/detail/similar-movies";
import MovieStreamingPreview from "@/app/components/movie/detail/movie-streaming-preview";
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
    <div className="pb-6 mb-16 sm:mb-0 xl:pr-8">
      <MovieHero movie={movie} />
      <MovieFacts movie={movie} />

      <div className="mt-8 grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="xl:col-start-1 xl:row-start-1">
          <MovieStreamingPreview movie={movie} />
        </div>

        <div className="xl:col-start-1 xl:row-start-2">
          <Cast cast={movie.cast} />
        </div>

        <div className="xl:col-start-1 xl:row-start-3">
          <ReviewForm />
        </div>

        <div className="xl:col-start-2 xl:row-span-3 xl:row-start-1">
          <SimilarMovies movies={movie.similarMovies} />
        </div>
      </div>
    </div>
  );
}
