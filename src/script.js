(function (Xrm, Promise) {
    "use strict";

    var TRIAL_DURATION_IN_DAYS = 30;

    var notification = {
        level: 4,               // Information
        type: 2,                // Top
        showCloseButton: true,
        action: {
            actionLabel: "Dismiss for this session",
            eventHandler: dismissNotification
        }
    };

    if (scriptShouldLoad()) {
        preventLoadingTwice();

        Promise.resolve()
            .then(retrieveCreatedOnDate)
            .then(setNotificationMessage)
            .then(showNotification);
    }

    function scriptShouldLoad() {
        // User has clicked the button to dismiss
        if (sessionStorage.getItem("EXPIRY_MESSAGE_HIDDEN")) return false;

        // Script has already run on this browser window
        return !window.daysRemainingNotification;
    }

    function preventLoadingTwice() {
        window.daysRemainingNotification = true;
    }

    function retrieveCreatedOnDate() {
        if (localStorage.getItem("ORG_CREATED_ON")) {
            return Promise.resolve();
        }

        return Xrm.WebApi.retrieveMultipleRecords("organization", "?$select=createdon").then(
            function success(results) {
                localStorage.setItem("ORG_CREATED_ON", results.entities[0].createdon);
            }
        );
    }

    function setNotificationMessage() {
        var daysRemaining = getDaysRemaining();
        var expiry = getExpiryDate();

        notification.message = daysRemaining + " day(s) remaining in trial. Expires on " + expiry;
    }

    function getDaysRemaining() {
        var createdDate = new Date(localStorage.getItem("ORG_CREATED_ON"));
        var currentDate = new Date();
        return TRIAL_DURATION_IN_DAYS - getDaysDifference(createdDate, currentDate);
    }

    function getDaysDifference(fromDate, toDate) {
        // https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
        var ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
        var differenceMilliseconds = Math.abs(toDate - fromDate);
        return Math.round(differenceMilliseconds / ONE_DAY_IN_MILLISECONDS);
    }

    function getExpiryDate() {
        var createdDate = new Date(localStorage.getItem("ORG_CREATED_ON"));
        var expiry = addDays(TRIAL_DURATION_IN_DAYS, createdDate);
        return expiry;
    }

    function addDays(numberOfDays, toDate) {
        // https://stackoverflow.com/questions/563406/add-days-to-javascript-date
        var date = new Date(toDate);
        date.setDate(date.getDate() + numberOfDays);
        return date;
    }

    function showNotification() {
        return Xrm.App.addGlobalNotification(notification)
            .then(function success(uniqueId) {
                sessionStorage.setItem("EXPIRY_MESSAGE_UNIQUE_ID", uniqueId);
            });
    }

    function dismissNotification() {
        sessionStorage.setItem("EXPIRY_MESSAGE_HIDDEN", "EXPIRY_MESSAGE_HIDDEN");
        var uniqueId = sessionStorage.getItem("EXPIRY_MESSAGE_UNIQUE_ID");
        if (!uniqueId) return;
        return Xrm.App.clearGlobalNotification(uniqueId);
    }

}(window.Xrm, window.Promise || window.parent.Promise))