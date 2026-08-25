"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import MainLayout from "../../../src/components/Layout/MainLayout";
import CenterBlock from "../../../src/components/CenterBlock/CenterBlock";
import { getSelection } from "../../../src/api/tracks";
import { Track } from "../../../data"; 

export default function SelectionPage() {
  const params = useParams();
  const id = params?.id as string; // Достаем ID 

  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState("Загрузка..."); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Если ID еще не подтянулся из URL, ждем

    setIsLoading(true);
    getSelection(id)
      .then((data) => {
        setTracks(data.items); 
        setTitle(data.name);   
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <MainLayout>
      <CenterBlock 
        tracks={tracks} 
        isLoading={isLoading} 
        error={error} 
        title={title} 
      />
    </MainLayout>
  );
}