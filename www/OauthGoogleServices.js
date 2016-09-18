/*global cordova, module*/

function parseArguments(args) {
    var options = {};
    if (args.length === 0) {
        throw new Error('A callback must be defined');
    } else if (args.length === 1) {
        if (typeof args[0] !== "function") {
            throw new Error('A callback must be defined');
        }
        options.scope = null;
        options.done = args[0];
        options.err = undefined;
    } else if (args.length === 2) {
        if (typeof args[0] === "function") {
            options.scope = null;
            options.done = args[0];
            options.err = args[1];
        } else {
            options.scope = args[0];
            options.done = args[1];
            options.err = undefined;
        }
    } else if (args.length >= 3) {
        if (typeof args[1] !== "function") {
            throw new Error('A callback must be defined');
        }
        options.scope = args[0];
        options.done = args[1];
        options.err = args[2];
    }
    return options;
}

module.exports = {
    login: function (options) {
        var scope, done, err;
        // var options = parseArguments(arguments);
        if (!window.cordova) {
            if (options.failure) {
                options.failure("The window.cordova API is not present.");
            }
            return;
        }
        window.cordova.exec(function (response) {
            options.success(response);
        }, function (error) {
            console.log("The getToken call failed with the error: " + err);
            if (options.failure) {
                options.failure(error);
            }
        }, "OauthGoogleServices", "getToken", [options.scope, options.account]);
    },

    logout: function() {
        window.cordova.exec(function (response) {
            options.success(response);
        }, function (error) {
           options.success(error);
        }, "OauthGoogleServices", "logout", []);
    }
}