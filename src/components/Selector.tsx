import { useCubes } from "../hooks/useCubes";
import { useKeyboard } from "../hooks/useKeyboard";
import * as images from "../images/images";

import { useEffect } from "react";
export const Selector = () => {
  const { dirt, grass, glass, wood, log } = useKeyboard();
  const [texture, setTexture] = useCubes((state) => [
    state.texture,
    state.setTexture,
  ]);

  useEffect(() => {
    const options = { dirt, grass, glass, wood, log };
    const select = Object.entries(options).find(([_key, value]) => value);
    if (select) {
      setTexture(select[0] as any);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);

  return (
    <div className="texture-selector">
      {Object.entries(images).map(([imgKey, img], idx) => {
        return (
          <div key={imgKey} className="texture-selector__image-container">
            <img
              className={
                texture === imgKey.replace("Img", "") ? "selected" : ""
              }
              src={img}
              alt={imgKey}
            />
            <span>{idx + 1}</span>
          </div>
        );
      })}
    </div>
  );
};
