import { useRef, useState, useEffect } from "react";
import "./VideoIntro.css";

type VideoIntroProps = {
  onFinish: () => void;
};

function VideoIntro({ onFinish }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;

      setTimeout(() => {
        video
          .play()
          .then(() => {
            // Video playing
            setShowButton(false);
          })
          .catch((err) => console.error("Playback failed", err));
      }, 50);
    }
  }, [showVideo]);

  useEffect(() => {
    let frame: number;

    const checkTime = () => {
      const video = videoRef.current;
      if (video && !fadeOut) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= 1) {
          setFadeOut(true);
        } else {
          frame = requestAnimationFrame(checkTime);
        }
      }
    };

    if (showVideo) {
      frame = requestAnimationFrame(checkTime);
    }

    return () => cancelAnimationFrame(frame);
  }, [showVideo, fadeOut]);

  const handleEnter = () => {
    setShowVideo(true);
  };

  const handleVideoEnd = () => {
    setTimeout(() => {
      onFinish();
    }, 1000);
  };

  return (
    <div className={`video-intro ${fadeOut ? "fade-out" : ""}`}>
      {showButton && (
        <button className="enter-button" onClick={handleEnter}>
          ENTER HERE
        </button>
      )}

      {showVideo && (
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
          playsInline
          className="video-element"
        >
          <source src="/bobs-burgers-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

export default VideoIntro;
