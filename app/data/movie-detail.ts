import type { StaticImageData } from "next/image";

import movieImage from "@/public/large.jpg";

export interface CastMember {
  name: string;
  role: string;
  image: StaticImageData;
}

export interface SimilarMovie {
  id: string;
  title: string;
  category: string;
  image: StaticImageData;
}

export interface MovieDetail {
  id: string;
  title: string;
  year: string;
  rating: string;
  runtime: string;
  maturity: string;
  genres: string[];
  overview: string;
  image: StaticImageData;
  cast: CastMember[];
  similarMovies: SimilarMovie[];
}

export const movie: MovieDetail = {
  id: "1",
  title: "Beyond Earth",
  year: "2019",
  rating: "8.7",
  runtime: "2h 16m",
  maturity: "PG",
  genres: ["Adventure", "Sci-Fi", "Drama"],
  overview:
    "A visually rich space odyssey about survival, memory, and the impossible choices made when humanity reaches beyond the edge of home.",
  image: movieImage,
  cast: [
    {
      name: "Ava Stone",
      role: "Commander Elara Voss",
      image: movieImage,
    },
    {
      name: "Miles Carter",
      role: "Dr. Ren Maddox",
      image: movieImage,
    },
    {
      name: "Noah Vale",
      role: "Kai Mercer",
      image: movieImage,
    },
    {
      name: "Iris Monroe",
      role: "Mira Solen",
      image: movieImage,
    },
    {
      name: "Theo Banks",
      role: "Captain Orin Hale",
      image: movieImage,
    },
  ],
  similarMovies: [
    {
      id: "2",
      title: "The Great Lands",
      category: "Sci-Fi",
      image: movieImage,
    },
    {
      id: "3",
      title: "Dust Frontier",
      category: "Adventure",
      image: movieImage,
    },
    {
      id: "4",
      title: "Silent Orbit",
      category: "Sci-Fi",
      image: movieImage,
    },
    {
      id: "5",
      title: "Lunar Signal",
      category: "Drama",
      image: movieImage,
    },
  ],
};
