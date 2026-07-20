import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Track } from "../../../data";

interface PlayerState {
  currentTrack: Track | null;
  playlist: Track[];
  shuffledPlaylist: Track[];
  isPlaying: boolean;
  isShuffled: boolean;
  isLooped: boolean;
}

const initialState: PlayerState = {
  currentTrack: null,
  playlist: [],
  shuffledPlaylist: [],
  isPlaying: false,
  isShuffled: false,
  isLooped: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {

    setCurrentTrack: (state, action: PayloadAction<{ track: Track; playlist: Track[] }>) => {
      state.currentTrack = action.payload.track;
      state.playlist = action.payload.playlist;
      state.isPlaying = true;
      
      if (state.isShuffled) {
        state.shuffledPlaylist = [...action.payload.playlist].sort(() => Math.random() - 0.5);
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    toggleLoop: (state) => {
      state.isLooped = !state.isLooped;
    },
    toggleShuffle: (state) => {
      state.isShuffled = !state.isShuffled;
      if (state.isShuffled) {
        state.shuffledPlaylist = [...state.playlist].sort(() => Math.random() - 0.5);
      } else {
        state.shuffledPlaylist = [];
      }
    },
    nextTrack: (state) => {
      const currentList = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      const currentIndex = currentList.findIndex((t) => t._id === state.currentTrack?._id);

      if (currentIndex !== -1 && currentIndex < currentList.length - 1) {
        state.currentTrack = currentList[currentIndex + 1];
        state.isPlaying = true;
      }
    },
    prevTrack: (state) => {
      const currentList = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      const currentIndex = currentList.findIndex((t) => t._id === state.currentTrack?._id);

      if (currentIndex > 0) {
        state.currentTrack = currentList[currentIndex - 1];
        state.isPlaying = true;
      }
    },
  },
});

export const { setCurrentTrack, setIsPlaying, toggleLoop, toggleShuffle, nextTrack, prevTrack } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;