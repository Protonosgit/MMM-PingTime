

Module.register("MMM-PingTime", {
    defaults: {
        updateInterval: 4000,
        timePrefix: "",
        timeSuffix: "ms",
        connectedText: "Connected",
        disconnectedText: "Disconnected",
        loadingIcon: 'loading-icon fas fa-sync fa-spin',
        connectedIcon: 'success-icon fas fa-check',
        disconnectedIcon: 'warning-icon fas fa-ban',
        pingFontColor: "--color-text",
        connectedFontCollor: "--color-text",
        disconnectedFontColor: "--color-text",
        fontSize: 1,
        server: {
            websocketUrl: "wss://echo.websocket.org",
            outgoingMessage: "ping",
            incomingMessage: "ping",
            bypassCheck: false
        }
    },

    getTemplate: function() {
        return "MMM-PingTime.njk";
    },

    getTemplateData: function() {
        return {
            pingResult: this.pingResult,
            config: this.config,
            connectedText: this.config.connectedText,
            disconnectedText: this.config.disconnectedText
        };
    },

    start: function() {
        console.log("Starting module: " + this.name);
        this.updateDom();

        setTimeout(() => {
            this.connect();
        }, 2000);
    },

    connect: function() {
        this.socket = new WebSocket(this.config.server.websocketUrl);

        this.socket.onopen = () => {
            console.log("WebSocket connected");
            this.pingResult = "cn";
            this.updateDom();
            this.startPinging();
        };

        this.socket.onclose = () => {
            console.log("WebSocket disconnected");
            this.pingResult = "dc";
            this.pingStartTime = 0;
            this.updateDom();
            this.stopPinging();
            // Try to reconnect after a delay
            setTimeout(() => {
                this.connect();
            }, 5000);
        };

        this.socket.onmessage = (event) => {
            const latency = Date.now() - this.pingStartTime;
            if(event.data === this.config.server.incomingMessage || this.config.server.bypassCheck) {
                this.pingResult = this.config.timePrefix + latency + " " + this.config.timeSuffix;
            }
            this.updateDom();
        };
    },

    startPinging: function() {
        console.log("Starting pinging");
        this.pingInterval = setInterval(() => {
            this.ping();
        }, this.config.updateInterval);
    },

    stopPinging: function() {
        if (this.pingInterval) {
            clearInterval(this.pingInterval);
        }
    },

    ping: function() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.pingStartTime = Date.now();
            this.socket.send(this.config.server.outgoingMessage);
        }
    },

    suspend: function() {
        this.stopPinging();
        if (this.socket) {
            this.socket.close();
        }
    },

    resume: function() {
        this.connect();
    }
});