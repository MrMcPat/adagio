import React from "react";
import SpotifyPlayer from "react-spotify-web-playback"

function MusicPlayer() {
  
  const token =
    "BQCbmlutN0rO_Zu8DzxnSQCc5Wpfv06Y5-7kVkRhBbBMA7cmIMBiPNwbkAyblMTNiq7cCwIH57nepqvag8tuPTWAkSqrtgyih1B711ubMORe3Sub60WwtJeHxcUg6w81B4JGruMLK1m_jgmo73Ajlgwxj8ppq3EvzcaEGzgWAJdZsCeeLY-5BPSOo30BbEKYPVhEi-k8e6eI-o9STg"  
  
   return (
    <div>
      <SpotifyPlayer
        token={token}
        uris={["spotify:track:2qHGDQmfxScbqf0BAwakKI"]}
      />
    </div>
  );
}

export default MusicPlayer;
