import subprocess
import eel
import json
from . import containers


@eel.expose
def get_images():
    res = subprocess.run([
      'docker',
      'image',
      'list',
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
    return json.loads(res_json_string)


@eel.expose
def remove_image(image_id: str):
    subprocess.run([
        'docker',
        'image',
        'rm',
        image_id
    ], capture_output=True)
    eel.takeImages(get_images())


@eel.expose
def start_container_with_image(image_id: str, options: dict):
    command = ['docker', 'run', '-d']

    if ('containerName' in options):
        command.extend(['--name', options['containerName']])
    if ('localPort' in options and 'containerPort' in options):
        command.extend([
            '-p',
            "{}:{}".format(options['localPort'], options['containerPort'])
        ])

    command.append(image_id)

    subprocess.run(command, capture_output=True)

    eel.takeContainers(containers.get_containers())
    eel.takeImages(get_images())
