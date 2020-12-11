window.fbAsyncInit = function () {
    FB.init({
        appId: "337684514199395",
        cookie: true, // Enable cookies to allow the server to access the session.
        xfbml: true, // Parse social plugins on this webpage.
        version: "v8.0", // Use this Graph API version for this call.
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
};


function facebookLogin(){
    FB.getLoginStatus(function(response){
        console.log(response);
        statusChangeCallback(response);
    })
}


