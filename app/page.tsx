"use client";

import { useEffect, useState } from "react";
import MainLayout from "../src/components/Layout/MainLayout";
import CenterBlock from "../src/components/CenterBlock/CenterBlock";
import { getTracks } from "../src/api/tracks";
import { Track } from "../data"; 

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTracks()
      .then((data) => setTracks(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MainLayout>
      <CenterBlock 
        tracks={tracks} 
        isLoading={isLoading} 
        error={error} 
        title="Треки" 
      />
    </MainLayout>
  );
}