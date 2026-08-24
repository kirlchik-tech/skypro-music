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
    updateTrackLike: (state, action: PayloadAction<{ trackId: number; isLiked: boolean; username: string }>) => {
      const { trackId, isLiked, username } = action.payload;

      const updateStaredUser = (track: Track) => {
        if (!track.stared_user) track.stared_user = [];
        if (isLiked) {

          if (!track.stared_user.find((u) => u.username === username)) {
            track.stared_user.push({ username, id: 0, email: "" });
          }
        } else {

          track.stared_user = track.stared_user.filter((u) => u.username !== username);
        }
      };

      
      if (state.currentTrack && (state.currentTrack.id === trackId || state.currentTrack._id === trackId)) {
        updateStaredUser(state.currentTrack);
      }

      const trackInPlaylist = state.playlist.find(t => t.id === trackId || t._id === trackId);
      if (trackInPlaylist) updateStaredUser(trackInPlaylist);

      const trackInShuffled = state.shuffledPlaylist.find(t => t.id === trackId || t._id === trackId);
      if (trackInShuffled) updateStaredUser(trackInShuffled);
    },

   nextTrack: (state) => {
      const currentList = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      
 
      const currentIndex = currentList.findIndex((t) => (t.id || t._id) === (state.currentTrack?.id || state.currentTrack?._id));

      if (currentIndex !== -1 && currentIndex < currentList.length - 1) {
        state.currentTrack = currentList[currentIndex + 1];
        state.isPlaying = true;
      }
    },
    prevTrack: (state) => {
      const currentList = state.isShuffled ? state.shuffledPlaylist : state.playlist;
      

      const currentIndex = currentList.findIndex((t) => (t.id || t._id) === (state.currentTrack?.id || state.currentTrack?._id));

      if (currentIndex > 0) {
        state.currentTrack = currentList[currentIndex - 1];
        state.isPlaying = true;
      }
    },
  },
});

export const { setCurrentTrack, setIsPlaying, toggleLoop, toggleShuffle, nextTrack, prevTrack, updateTrackLike } = playerSlice.actions; 
export const playerReducer = playerSlice.reducer;