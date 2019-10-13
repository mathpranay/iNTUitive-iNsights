

function callApi(){
    var settings = {
        "async": false,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/run/",
        "method": "POST",
        "headers": {
          "Host": "127.0.0.1:5000",
          "Connection": "keep-alive",
          "cache-control": "no-cache"
        }
      }
      var res;
      $.ajax(settings).done(function (response) {
        console.log(response);
        res = response;

      });
      return res;
}

