angular.module('cwoApp')
.run(bus => bus.init())
.service('bus', function bus($window, $rootScope) {
    const channelListeners = {};
    const queue = [];
    let loaded = false;
    let target;

    function sendMsg(channel, data) {
        if (target) {
            target.postMessage({ channel, data }, '*');
        } else {
            console.error('No target found to send message to');
        }
    }

    function processQueue() {
        queue.forEach(item => sendMsg(...item));
    }

    this.message = (channel, data) => {
        console.log(`BUS:SENDMSG(${channel}) : `, data);
        if (loaded) {
            sendMsg(...[channel, data]);
        } else {
            queue.push([channel, data]);
        }
    };

    this.on = (channel, cb) => {
        if (!channelListeners[channel]) {
            channelListeners[channel] = [];
        }
        channelListeners[channel].push(cb);
    };

    this.init = () => {
        $window.addEventListener('message', (event) => {
            const listeners = channelListeners[event.data.channel];

            if (listeners) {
                listeners.forEach((listener) => {
                    $rootScope.$applyAsync(() => {
                        listener(event.data.data);
                    });
                });
            }
        });

        if ($window.frameElement) {
            target = $window.parent;
            loaded = true;
            processQueue();
        } else {
            const iframe = document.querySelector('iframe');
            if (iframe) {
                target = iframe.contentWindow;
                iframe.addEventListener('load', () => {
                    loaded = true;
                    processQueue();
                });
            }
        }
    };
});
