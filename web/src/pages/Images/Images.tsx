import { Component, Show, createSignal, onMount } from "solid-js";
import ImageTable from "./components/ImageTable";
import RunImageDialog from "./components/RunImageDialog";

export interface ImageInfo {
  Containers: string;
  CreatedAt: string; // date string
  CreatedSince: string;
  Digest: string;
  ID: string;
  Repository: string;
  SharedSize: string;
  Size: string;
  Tag: string;
  UniqueSize: string;
  VirtualSize: string;
}

const [images, setImages] = createSignal<Array<ImageInfo>>([]);

function getImages() {
  window.eel.get_images<Array<ImageInfo>>()((images) => {
    setImages(images);
  });
}

window.eel.expose(takeImages);
function takeImages(images: Array<ImageInfo>) {
  setImages(images);
}

const Containers: Component = () => {
  onMount(() => {
    getImages();
  });

  const [imageToRun, setImageToRun] = createSignal<ImageInfo | null>(null);

  return (
    <>
      <ImageTable
        caption="Images"
        images={images()}
        onRun={(imageInfo) => setImageToRun(imageInfo)}
      />
      <RunImageDialog
        image={imageToRun()}
        onClose={() => setImageToRun(null)}
      />
    </>
  );
};

export default Containers;
