import { useEffect, useRef } from 'react';

interface YouTubeBackgroundProps {
  videoId: string;
  className?: string;
}

export const YouTubeBackground = ({ videoId, className = "" }: YouTubeBackgroundProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Ensure the iframe is properly loaded
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        console.log('YouTube background loaded for video:', videoId);
      };
    }
  }, [videoId]);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          width: '100vw',
          height: '100vh',
          transform: 'scale(1.2)', // Scale up to hide borders
          transformOrigin: 'center center',
          zIndex: -1
        }}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="Background Video"
      />
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 0 }}></div>
    </div>
  );
};