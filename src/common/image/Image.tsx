import cn from "classnames";
import React from "react";

import { useOnScreen } from "@utils/hooks";

import styles from "./Image.module.scss";

export interface ILoadableImage {
  src: string;
  alt?: string | undefined;
  onLoad?(): void;
}
export const LoadableImage = (props: ILoadableImage) => {
  const { src, alt = "", onLoad = () => {} } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  React.useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn({
        [styles.container_loaded]: isLoaded,
        [styles.container]: !isLoaded,
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          className={cn(styles.image, {
            [styles.image_loaded]: isLoaded,
          })}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};
