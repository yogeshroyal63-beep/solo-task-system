import { useEffect, useRef } from "react";

/**
 * ===============================
 * SYSTEM SOUND ENGINE
 * ===============================
 */

export default function useSound(src, { loop = false, volume = 1 } = {}) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src, loop, volume]);

  const play = () => {
    audioRef.current?.play().catch(() => {});
  };

  const stop = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  return { play, stop };
}
