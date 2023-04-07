import { Component, createSignal, onMount } from "solid-js";
import ContainerTable from "./components/ContainerTable";

export interface ContainerInfo {
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
  Array<ContainerInfo>
>([]);
const [stoppedContainers, setStoppedContainers] = createSignal<
  Array<ContainerInfo>
>([]);

function getContainers() {
  window.eel.get_containers<{
    running: Array<ContainerInfo>;
    stopped: Array<ContainerInfo>;
  }>()((res) => {
    setRunningContainers(res.running);
    setStoppedContainers(res.stopped);
  });
}

window.eel.expose(takeContainers);
function takeContainers(containers: {
  running: Array<ContainerInfo>;
  stopped: Array<ContainerInfo>;
}) {
  setRunningContainers(containers.running);
  setStoppedContainers(containers.stopped);
}

const Containers: Component = () => {
  onMount(() => {
    getContainers();
  });

  return (
    <div flex flex-col gap-12 font-sans>
      <ContainerTable
        caption="Running Containers"
        containers={runningContainers()}
        onAction={(containerID) => window.eel.stop_container(containerID)}
        actionText="Stop"
      />
      <ContainerTable
        caption="Stopped Containers"
        containers={stoppedContainers()}
        onAction={(containerID) => window.eel.start_container(containerID)}
        actionText="Start"
      />
    </div>
  );
};

export default Containers;
