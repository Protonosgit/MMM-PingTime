
# MMM-PingTime

A module for the [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror) which displays the ping duration to [websocket.org](https://websocket.org/tools/websocket-echo-server/) or a Custom websocket echo server in ms.

## Previews

![disconnected](.github/discon-preview.png)

![pinging](.github/ping-peview.png)

### Setup

No dependencies required !!<br>
Just download the module and restart MM<br>
DONE :)


```shell
cd ~/MagicMirror/modules 
git clone https://github.com/Protonosgit/MMM-PingTime
```

### Configuration

Add the module configuration to your `config.js` file.

```js
{
  module: 'MMM-PingTime',
  position: 'top_center',
  headder:'Network',
  config: {
    // See options bellow :)

    server:{
      // See: Host your own ping server
    }
  }
},
```

### Config Options
 <b>Everthing here is optional!!!</b>

| Option |  Description | Default | Required |
|---|---|---|---|
| `updateInterval` | The interval in which ping requests are sent  | `4000` (4 sec)| False ||
| `startupDelay` | Defines the delay before a connection is made  | `2000` (2 sec)| False ||
| `timePrefix` | The string which will be displayed before the ping  || False ||
| `timeSuffix` | The string which will be displayed after the ping  | `ms`| False ||
| `connectedText` | The text which is shown after connecting  | `Connected`| False ||
| `disconnectedText` | The text which is shown while offline  | `Disconnected`| False ||
| `pingFontColor` | Changes the default text color  | `--color-text`| False ||
| `connectedFontCollor` | Changes the default text color  | `--color-text`| False ||
| `disconnectedFontColor` | Changes the default text color  | `--color-text`| False ||
| `fontSize` | Changes the default font size  | `1`| False ||
| `loadingIcon` | Changes the default loading indicator  | `loading-icon fas fa-sync fa-spin`| False ||
| `connectedIcon` | Changes the default icon  | `success-icon fas fa-check`| False ||
| `disconnectedIcon` | Changes the default icon   | `warning-icon fas fa-ban`| False ||

### Host your own ping server

By default this module requires an echo server which returns the same message sent by the client<br>
Once the client sends the string: `ping` to the server, the same message should be returned.<br>
However if you wish to change this behaviour you can do so.
The official websocket source should work fine though (in most cases).<br>
<br>
<b>Everything here goes into the `server` tag INSIDE the config!!</b>

| Server Option |  Description | Default | Required |
|---|---|---|---|
| `websocketUrl` | Defines the server url  | `wss://echo.websocket.org`| False ||
| `outgoingMessage` | Defines the message sent in an interval  |`ping`| False ||
| `incomingMessage` | Defines the expected response (diffenrent responses will be ignored)  | `ping`| False ||
| `bypassCheck` | Ignores the `incommingMessage` check above  | `False`| False ||


### [Example server:](https://socket.io/docs/v4/server-api/)

<b>Python<b>

```python
import asyncio
import websockets

async def handle_connection(websocket, path):
    try:
        async for message in websocket:
            if message.lower() == "ping":
                await websocket.send("ping")
    except websockets.exceptions.ConnectionClosedError:
        pass

async def main():
    server = await websockets.serve(handle_connection, "localhost", 8765)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(main())

```

<b>Javascript<b>

```js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8765 });

wss.on('connection', function connection(ws) {

  ws.on('message', function incoming(message) {
    console.log('Ping received: %s', message);

    if (message.toString().toLowerCase() === 'ping') {
      ws.send('ping');
    }
  });

});

```

### Contributions
are always wellcome so feel free to participate!
: )