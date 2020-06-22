// JavaScript source code
var bootstrapLink = "https://go.microsoft.com/fwlink/?linkid=851737";

function LoadedNPSSurvey() {
	try {
		loadScript(bootstrapLink);
	}
	catch (e) {
		console.log("Error in initializing NPS Survey : " + e);
	}
}

/** Load script function with callback to handle synchronicity
	* @param src - script file path.
	* @param scripts - script tag.
	*/
function loadScript(src) {
    var that = this;

    if (!document.getElementById(src)) {
        var script = document.createElement('script');
        script.onerror = function () {
            // handling error when loading script
            console.log('Error in loading script');
        };

        script.onload = function () {
            console.log(src + ' loaded ');
        };

        script.src = src;
        script.id = src;
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    else {
        console.log(src + ' already loaded ');
    }
}

LoadedNPSSurvey();

var script = document.createElement('script');
script.src = '/WebResources/cn_/trialexpirymessage/script.js';
document.head.appendChild(script);