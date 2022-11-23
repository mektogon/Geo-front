import React from "react";
import ReactPlayer from "react-player";

import styles from "./Player.module.scss";

interface Props {
  url?: string | undefined;
  isPlaying?: boolean;
}

export const Player = ({ url, isPlaying }: Props) => (
  <div>
    <ReactPlayer
      url={url}
      width="400px"
      height="50px"
      playing={isPlaying}
      controls
    />
  </div>
);
