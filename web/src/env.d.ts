/// <reference types="vite/client" />

type EelCallback<Response> = (callback: (res: Response) => void) => void;

declare interface Window {
  eel: {
    // Built in eel function //
    set_host: (path: string) => void;
    expose: (...params: any) => any;

    // Python exposed functions //
    get_containers: <Response>() => EelCallback<Response>;
    stop_container: (containerId: string) => EelCallback<void>;
    start_container: (containerId: string) => EelCallback<void>;
  };
}
