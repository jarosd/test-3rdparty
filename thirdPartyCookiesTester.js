// script logic is retrieved from: https://medium.com/devscollab/detecting-whether-3rd-party-cookies-are-enabled-or-not-in-javascript-4328715a527b
// modified for our purposes

const checkCookiesEnabled = () => {
    let isCookieEnabled = window.navigator.cookieEnabled;
    if (typeof window.navigator.cookieEnabled === "undefined" && !isCookieEnabled) {
        // fallback option, if window.navigator.cookieEnabled is not supported
        document.cookie = "testcookie";
        isCookieEnabled = document.cookie.includes("testcookie") === false;
    }

    return isCookieEnabled;
};

(function () {
    window.addEventListener('message', event => {
        try {
            if (parent !== undefined) {
                // check if proper message was received
                let data = JSON.parse(event.data);
                if (data['test'] !== "eMobility cookies") {
                    return;
                }
                
                let result = checkCookiesEnabled();
                // send result back to parent window
                parent.postMessage(JSON.stringify({
                    'result': result
                }), event.origin);
            }
        } catch (error) {
            // console.error(error);
            console.error('3rd party cookie support service has failed.');
        }
    });
})();
