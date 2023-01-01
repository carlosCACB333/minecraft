import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "./images";

const configTexture = (img: string): THREE.Texture => {
  const texture = new TextureLoader().load(img);
  texture.magFilter = NearestFilter;
  return texture;
};

export const dirtTexture = configTexture(dirtImg);
export const woodTexture = configTexture(woodImg);
export const logTexture = configTexture(logImg);
export const glassTexture = configTexture(glassImg);

export const grassTexture = configTexture(grassImg);
grassTexture.repeat.set(100, 100);
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;
