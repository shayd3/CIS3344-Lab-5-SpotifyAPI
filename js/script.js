var _baseUrl = 'https://api.spotify.com/v1/';
var _artistImg;
var _artistName;
var _artistUri;
var _artistID;

$(document).ready(function(){
    $('#search').click(function(){
        searchArtists($('#query').val());
    });

    $('#game-start').click(function(){
        $(this).hide();
        $('#game-reset').show();
    });

    $('#game-reset').click(function(){
        $(this).hide();
        $('#game-start').hide();
        $('#spotify-search').show();
        $('#artist-img').html("");
        $('#artist-info').html("");
    });
})

var searchArtists = function (query) {
    $.ajax({
        url: _baseUrl + 'search',
        dataType: "json",
        data: {
            q: query,
            type: 'artist',
            limit: 1
        },
        success: function (response) {
            var data = response;

            $('#artist-img').html("");
            $('#artist-info').html("");

            if(data.artists.items.length == 1){
                _artistImg = data.artists.items[0].images[0].url;
                _artistName = data.artists.items[0].name;
                _artistUri = data.artists.items[0].uri;
                _aristID = data.artists.items[0].id;
                
                $('#artist-img').append("<img src='".concat(_artistImg,"'/>"));
                $('#artist-info').append("<h2>".concat(_artistName ,"</h2>"));
                $('#query').val("");
                $('#spotify-search').hide();
                $('#game-start').show();
            } else {

                $('#artist-img').append("<h2 style='color: white;'>Artist not found! Please try again!</h2>");
            }
        },
        error: function(req, status, error){
            alert("Error: " + req.responseText + " | " + status + " | " + error);
        }
    })
};


