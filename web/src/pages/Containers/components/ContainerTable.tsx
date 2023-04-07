import { Component, For, JSXElement } from "solid-js";
import type { ContainerInfo } from "../Containers";

interface ContainerTableProps {
  containers: Array<ContainerInfo>;
  caption: JSXElement;
  onAction: (containerId: string) => void;
  actionText: string;
}

const ContainerTable: Component<ContainerTableProps> = (props) => {
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
            Image
          </th>
          <th text="left" px-2 py-1>
            Name
          </th>
          <th text="left" px-2 py-1>
            Port
          </th>
          <th text="left" px-2 py-1>
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <For each={props.containers}>
          {(container) => (
            <tr>
              <td px-2 py-1>
                {container.ID}
              </td>
              <td px-2 py-1>
                {container.Image}
              </td>
              <td px-2 py-1>
                {container.Names}
              </td>
              <td px-2 py-1>
                {container.Ports}
              </td>
              <td px-2 py-1>
                <button
                  type="button"
                  onClick={() => props.onAction(container.ID)}
                  border-none
                  px-3
                  py-2
                  rounded
                  bg-blue-9
                  hover:bg-blue-6
                  text-white
                  transition-colors
                  cursor-pointer
                  uppercase
                  font-600
                >
                  {props.actionText}
                </button>
              </td>
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
};

export default ContainerTable;
