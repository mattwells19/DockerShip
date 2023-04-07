import { Component, Show } from "solid-js";
import type { ImageInfo } from "../Images";
import { Portal } from "solid-js/web";

interface RunImageDialogProps {
  image: ImageInfo | null;
  onClose: () => void;
}

const RunImageDialog: Component<RunImageDialogProps> = (props) => {
  return (
    <Show when={props.image}>
      <Portal>
        <div bg-black bg-opacity-20 grid place-items-center absolute inset-0>
          <div role="dialog" bg-white p-10>
            <button onClick={props.onClose}>Close</button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);

                const containerName = formData.get("name")?.toString();
                const containerPort = formData
                  .get("container-port")
                  ?.toString();
                const localPort = formData.get("local-port")?.toString();

                window.eel.start_container_with_image(props.image.ID, {
                  containerName,
                  containerPort,
                  localPort,
                });
              }}
            >
              <div>
                <label>Name</label>
                <input type="text" id="name" name="name" />
              </div>
              <div>
                <label>Container Port</label>
                <input
                  type="number"
                  id="container-port"
                  name="container-port"
                />
              </div>
              <div>
                <label>Local Port</label>
                <input type="number" id="local-port" name="local-port" />
              </div>
              <button type="submit">Start Container</button>
            </form>
          </div>
        </div>
      </Portal>
    </Show>
  );
};

export default RunImageDialog;
