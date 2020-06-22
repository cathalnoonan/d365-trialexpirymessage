(function () {
    "use strict";

    // Prevent the script running more than once
    if (!window.daysRemainingNotification) {
        window.daysRemainingNotification = true;

        var Xrm = window.Xrm;
        var Promise = window.Promise || window.parent.Promise;

        var TRIAL_DURATION_IN_DAYS = 30;

        var notification = {
            level: 4,
            showCloseButton: true,
            type: 2
        };

        function getCreatedOnDate() {
            if (localStorage.getItem("ORG_CREATED_ON")) {
                return Promise.resolve();
            }

            return Xrm.WebApi.retrieveMultipleRecords('organization', '?$select=createdon').then(
                function success(results) {
                    localStorage.setItem("ORG_CREATED_ON", results.entities[0].createdon);
                }
            )
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

        function getExpiryDate() {
            var createdDate = new Date(localStorage.getItem("ORG_CREATED_ON"));
            var expiry = addDays(TRIAL_DURATION_IN_DAYS, createdDate);
            return expiry;
        }

        function getDaysDifference(fromDate, toDate) {
            // https://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates
            var ONE_DAY = 1000 * 60 * 60 * 24;
            var differenceMs = Math.abs(toDate - fromDate);
            return Math.round(differenceMs / ONE_DAY);
        }

        function addDays(numberOfDays, toDate) {
            // https://stackoverflow.com/questions/563406/add-days-to-javascript-date
            var date = new Date(toDate);
            date.setDate(date.getDate() + numberOfDays);
            return date;
        }

        function showNotification() {
            Xrm.App.addGlobalNotification(notification);
        }

        Promise.resolve()
            .then(getCreatedOnDate)
            .then(setNotificationMessage)
            .then(showNotification);
    }
}())