"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "../../src/components/Layout/MainLayout";
import CenterBlock from "../../src/components/CenterBlock/CenterBlock";
import { getFavoriteTracks } from "../../src/api/tracks";
import { Track } from "../../data"; 
import { withReAuth } from "../../src/api/withReAuth";

export default function FavoritesPage() {
  const router = useRouter();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Передаем саму функцию запроса внутрь withReAuth
    withReAuth(getFavoriteTracks)
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
        title="Мои треки" 
      />
    </MainLayout>
  );
}