import subprocess
import eel
import json


@eel.expose
def get_containers():
    res = subprocess.run([
        'docker',
        'ps',
        '--all',
        '--format',
        'json'
    ], capture_output=True)

    # convert bytes to string
    res_json_string = res.stdout.decode('utf-8')
    if (len(res_json_string) > 1):
        # objects are separated by newlines so replace new lines with commas
        res_json_string = res_json_string.replace('}\n', '},')
        # remove the comma from the last item that was added by the replace
        res_json_string = res_json_string[:-1]

    # wrap the string in brackets to make it an array
    res_json_string = '[' + res_json_string + ']'

    # parse the now valid JSON and return the result
    containers: list[dict] = json.loads(res_json_string)

    running_containers = []
    stopped_containers = []

    for container in containers:
        if (container['State'] == 'running'):
            running_containers.append(container)
        elif (container['State'] == 'exited'):
            stopped_containers.append(container)

    return {
        'running': running_containers,
        'stopped': stopped_containers,
    }


@eel.expose
def get_running_containers():
    return get_containers().running


@eel.expose
def start_container(container_id: str):
    res = subprocess.run([
        'docker',
        'start',
        container_id
    ], capture_output=True)
    res_text = res.stdout.decode('utf-8').strip()
    if (res_text == container_id):
        eel.takeContainers(get_containers())


@eel.expose
def get_stopped_containers():
    return get_containers().stopped


@eel.expose
def stop_container(container_id: str):
    res = subprocess.run([
        'docker',
        'stop',
        container_id
    ], capture_output=True)
    res_text = res.stdout.decode('utf-8').strip()
    if (res_text == container_id):
        eel.takeContainers(get_containers())


def start_eel(develop: bool):
    """Start Eel with either production or development configuration."""

    if develop:
        directory = 'web/src'
        app = None
        page = {'port': 3000}
    else:
        directory = 'build'
        app = 'chrome-app'
        page = 'index.html'

    eel.init(directory, ['.tsx', '.ts', '.jsx', '.js', '.html'])

    eel_kwargs = dict(
        host='localhost',
        port=8080,
        size=(1280, 800),
    )
    try:
        eel.start(page, mode=app, **eel_kwargs)
    except EnvironmentError:
        # If Chrome isn't found, fallback to Microsoft Edge on Win10 or greater
        eel.start(page, mode='edge', **eel_kwargs)


if __name__ == '__main__':
    import sys

    print(sys.argv)

    # Pass any second argument to enable debugging
    start_eel(develop=len(sys.argv) == 2)
