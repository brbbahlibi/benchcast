window.onload = function () {
    cast.receiver.logger.setLevelValue(0);
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    console.log('Starting Receiver Manager');

    // handler for the 'ready' event
    castReceiverManager.onReady = function (event) {
        console.log('Received Ready event: ' + JSON.stringify(event.data));
        window.castReceiverManager.setApplicationState("Connect to chat...");
    };

    // handler for 'senderconnected' event
    castReceiverManager.onSenderConnected = function (event) {
        // event.data will have the id of the sender that just connected
        console.log('Received Sender Connected event: ' + event.data);
        console.log('UA = "' + window.castReceiverManager.getSender(event.data).userAgent + '"');
        console.log("Senders Connected: " + window.castReceiverManager.getSenders().length);
        outputLine("Welcome " + event.data + "("
            + window.castReceiverManager.getSenders().length + ")");
    };

    // handler for 'senderdisconnected' event
    castReceiverManager.onSenderDisconnected = function (event) {
        console.log('Received Sender Disconnected event: ' + event.data);
        outputLine("Goodbye " + event.data);

        if (window.castReceiverManager.getSenders().length == 0) {
            window.close();
        }
    };

    // handler for 'systemvolumechanged' event
    castReceiverManager.onSystemVolumeChanged = function (event) {
        console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
            event.data['muted']);
    };

    // handler for 'visibilitychanged' event
    castReceiverManager.onVisibilityChanged = function (event) {
        console.log('Received Visibility Changed event: Now visible = ' + event.data);
    };

    // create a CastMessageBus to handle messages for a custom namespace
    window.messageBus =
        window.castReceiverManager.getCastMessageBus(
            'urn:x-cast:net.mackenzie_serres.pongcast');
    console.log("Message Bus created for messages of type: " + window.messageBus.getMessageType());

    // handler for the CastMessageBus message event
    window.messageBus.onMessage = function (event) {
        console.log('Message [' + event.senderId + ']: ' + event.data);

        // display the message from the sender
        outputLine(event.data + "(from " + event.senderId + ")");

        // inform all senders on the CastMessageBus of the incoming message event
        // sender message listener will be invoked
        window.messageBus.broadcast(event.data);
    };

    // start the CastReceiverManager with an application status message
    window.castReceiverManager.start({statusText: "Application is starting"});
    console.log('Receiver Manager started');
}

// utility function to display the text message in the input field
function outputLine(text) {
    console.log("Line: " + text);
    document.getElementById("message").innerHTML += (text + "<br>");
    window.castReceiverManager.setApplicationState(window.castReceiverManager.getSenders().length + " connected");
}