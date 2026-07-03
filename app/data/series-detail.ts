import type { StaticImageData } from "next/image";

import seriesImage from "@/public/large.jpg";

export interface SeriesCastMember {
  name: string;
  role: string;
  image: StaticImageData;
}

export interface SeriesEpisode {
  id: string;
  seasonNumber: number;
  episodeNumber: number;
  title: string;
  runtime: string;
  overview: string;
}

export interface SimilarSeries {
  id: string;
  title: string;
  category: string;
  image: StaticImageData;
}

export interface SeriesDetail {
  id: string;
  title: string;
  year: string;
  rating: string;
  maturity: string;
  seasons: number;
  episodes: number;
  genres: string[];
  overview: string;
  image: StaticImageData;
  cast: SeriesCastMember[];
  episodeList: SeriesEpisode[];
  similarSeries: SimilarSeries[];
}

export const series: SeriesDetail = {
  id: "1",
  title: "Beyond Earth: Origins",
  year: "2022",
  rating: "8.9",
  maturity: "TV-14",
  seasons: 3,
  episodes: 24,
  genres: ["Sci-Fi", "Drama", "Adventure"],
  overview:
    "A serialized sci-fi drama following the first colony beyond Earth as rival crews uncover secrets buried in deep space.",
  image: seriesImage,
  cast: [
    { name: "Ava Stone", role: "Elara Voss", image: seriesImage },
    { name: "Miles Carter", role: "Ren Maddox", image: seriesImage },
    { name: "Noah Vale", role: "Kai Mercer", image: seriesImage },
    { name: "Iris Monroe", role: "Mira Solen", image: seriesImage },
  ],
  episodeList: [
    {
      id: "s1-e1",
      seasonNumber: 1,
      episodeNumber: 1,
      title: "First Signal",
      runtime: "48m",
      overview: "The crew receives a transmission that changes the mission.",
    },
    {
      id: "s1-e2",
      seasonNumber: 1,
      episodeNumber: 2,
      title: "Low Orbit",
      runtime: "51m",
      overview: "A systems failure forces the colony ship into a risky orbit.",
    },
    {
      id: "s1-e3",
      seasonNumber: 1,
      episodeNumber: 3,
      title: "The Quiet Moon",
      runtime: "46m",
      overview: "A survey team finds evidence of an abandoned settlement.",
    },
  ],
  similarSeries: [
    { id: "2", title: "Silent Orbit", category: "Sci-Fi", image: seriesImage },
    {
      id: "3",
      title: "Frontier Ark",
      category: "Adventure",
      image: seriesImage,
    },
    { id: "4", title: "Deep Signal", category: "Drama", image: seriesImage },
    { id: "5", title: "Nova Station", category: "Sci-Fi", image: seriesImage },
  ],
};
