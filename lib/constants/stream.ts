const rawStreamBaseUrl = process.env.NEXT_PUBLIC_STREAM_BASE_URL ?? "";

export const STREAM_BASE_URL = rawStreamBaseUrl.replace(/\/+$/, "");

export const STREAM_ORIGIN = STREAM_BASE_URL
  ? new URL(STREAM_BASE_URL).origin
  : "";
