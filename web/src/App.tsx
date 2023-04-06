import { Component, For, createSignal, onMount } from "solid-js";

const eel = window.eel;
eel.set_host("ws://localhost:8080");

interface Containers {
  Command: string;
  CreatedAt: string; // Date string
  ID: string;
  Image: string;
  Labels: string;
  LocalVolumes: string;
  Mounts: string;
  Names: string;
  Networks: string;
  Ports: string;
  RunningFor: string;
  Size: string;
  State: string;
  Status: string;
}

const [runningContainers, setRunningContainers] = createSignal<
  Array<Containers>
>([]);
const [stoppedContainers, setStoppedContainers] = createSignal<
  Array<Containers>
>([]);

function getContainers() {
  window.eel.get_containers<{
    running: Array<Containers>;
    stopped: Array<Containers>;
  }>()((res) => {
    setRunningContainers(res.running);
    setStoppedContainers(res.stopped);
  });
}

window.eel.expose(takeContainers);
function takeContainers(containers: {
  running: Array<Containers>;
  stopped: Array<Containers>;
}) {
  setRunningContainers(containers.running);
  setStoppedContainers(containers.stopped);
}

const App: Component = () => {
  onMount(() => {
    getContainers();
  });

  return (
    <>
      <table>
        <caption>Running Containers</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Stop</th>
          </tr>
        </thead>
        <tbody>
          <For each={runningContainers()}>
            {(container) => (
              <tr>
                <td>{container.ID}</td>
                <td>{container.Image}</td>
                <td>{container.Names}</td>
                <td>
                  <button
                    onClick={() => window.eel.stop_container(container.ID)}
                  >
                    Stop
                  </button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
      <table>
        <caption>Stopped Containers</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Start</th>
          </tr>
        </thead>
        <tbody>
          <For each={stoppedContainers()}>
            {(container) => (
              <tr>
                <td>{container.ID}</td>
                <td>{container.Image}</td>
                <td>{container.Names}</td>
                <td>
                  <button
                    onClick={() => window.eel.start_container(container.ID)}
                  >
                    Start
                  </button>
                </td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </>
  );
};

export default App;
