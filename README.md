
# MMM-PingTime

A module for the [MagicMirror](https://github.com/MagicMirrorOrg/MagicMirror) to display the ping duration to the [Socket.io](https://socket.io/) server in ms.

## Previews

![disconnected](.github/discon-preview.png)

![pinging](.github/ping-peview.png)

### Setup

Download the module:

```shell
cd ~/MagicMirror/modules && git clone https://github.com/Protonosgit/MMM-PingTime
```

### Configuration

Add the module configuration to your `config.js` file.

```js
{
  module: 'MMM-PingTime',
  position: 'top_center',
  headder:'Network',
  config: {
    // Only change this if you know what you are doing
  }
},
```

### Config Options

Purely optional:

| Option |  Description | Default | Required |
|---|---|---|---|
| `websocketUrl` | Use your own ping server | `wss://echo.websocket.org`| False ||
| `updateInterval` | The interval in which ping requests are sent  | `6000 (6 sec)`| False ||
| `timeSuffix` | The string which will be displayed after the ping  | `ms`| False ||
