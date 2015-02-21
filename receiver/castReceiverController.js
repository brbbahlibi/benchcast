function CastController() {
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.WARNING);

    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

    // create a CastMessageBus to handle messages for a custom namespace
    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
    window.messageBus = window.castReceiverManager.getCastMessageBus('urn:x-cast:net.mackenzie_serres.benchcast');

    // handler for the 'ready' event
    castReceiverManager.onReady = function () {
        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
        window.castReceiverManager.setApplicationState("Started");
    };

    // handler for 'senderconnected' event - this player can then enter the court
    castReceiverManager.onSenderConnected = function (event) {
        //noinspection JSUnresolvedVariable
        var name = event.senderId;
        console.log("Connected: " + name);

        //noinspection JSUnresolvedFunction,JSUnresolvedVariable
        var senderChannel = window.messageBus.getCastChannel(event.senderId);
        senderChannel.send("Hello");
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function () {
        // when the last man leaves - switch out the lights
        //noinspection JSUnresolvedFunction
        if (window.castReceiverManager.getSenders().length == 0) {
            setTimeout(function() {
                window.close();
            }, 3000);
        }
    };

    // handler for incoming messages on the message bus
    window.messageBus.onMessage = function (event) {
        //noinspection JSUnresolvedVariable
        console.log('Message [' + event.senderId + ']: ' + event.data);

        // handle message
        switch (event.data) {
            case "Hello":
                //noinspection JSUnresolvedFunction
                window.messageBus.broadcast("Hello");
                break;

            default:
                break;
        }

    };

    // start the CastReceiverManager with an application status message
    window.castReceiverManager.start({statusText: "Ready"});
}