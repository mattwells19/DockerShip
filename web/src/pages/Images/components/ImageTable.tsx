import { Component, For, JSXElement } from "solid-js";
import type { ImageInfo } from "../Images";

interface ImageTableProps {
  images: Array<ImageInfo>;
  caption: JSXElement;
  onRun: (imageId: ImageInfo) => void;
}

const ImageTable: Component<ImageTableProps> = (props) => {
  return (
    <table table table-fixed border border-collapse w-full>
      <caption text-xl text-left mb-2>
        {props.caption}
      </caption>
      <thead>
        <tr>
          <th text="left" px-2 py-1>
            ID
          </th>
          <th text="left" px-2 py-1>
            Repository
          </th>
          <th text="left" px-2 py-1>
            Containers
          </th>
          <th text="left" px-2 py-1>
            Tag
          </th>
          <th text="left" px-2 py-1>
            Size
          </th>
          <th text="left" px-2 py-1>
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        <For each={props.images}>
          {(image) => (
            <tr>
              <td px-2 py-1>
                {image.ID}
              </td>
              <td px-2 py-1>
                {image.Repository}
              </td>
              <td px-2 py-1>
                {image.Containers}
              </td>
              <td px-2 py-1>
                {image.Tag}
              </td>
              <td px-2 py-1>
                {image.Size}
              </td>
              <td px-2 py-1>
                <div role="group" flex gap-1>
                  <button
                    type="button"
                    onClick={() => window.eel.remove_image(image.ID)}
                    border-none
                    px-3
                    py-2
                    rounded
                    bg-red-9
                    hover:bg-red-6
                    text-white
                    transition-colors
                    cursor-pointer
                    uppercase
                    font-600
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={() => props.onRun(image)}
                    border-none
                    px-3
                    py-2
                    rounded
                    bg-green-9
                    hover:bg-green-6
                    text-white
                    transition-colors
                    cursor-pointer
                    uppercase
                    font-600
                  >
                    Run
                  </button>
                </div>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default ImageTable;
