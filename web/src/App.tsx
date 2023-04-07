import { Component, For, createSignal, onMount } from "solid-js";
import Containers from "./pages/Containers";
import Images from "./pages/Images";

const eel = window.eel;
eel.set_host("ws://localhost:8080");

const App: Component = () => {
  return (
    <main flex flex-col gap-12 font-sans>
      <Containers />
      <Images />
    </main>
  );
};

export default App;
