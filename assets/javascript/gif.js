$(document).ready(function(){



//array of topics

var queryURL = " https://api.giphy.com/v1/gifs/search?api_key=&q=cat&limit=10&offset=0&rating=G&lang=en";
var topics = ["batman", "superman", "the flash", "nightwing", "iron man", "spiderman", "hawkeye", "deadpool", "aquaman"];



// creates buttons for each hero
function buttons() {
    $("newHero").empty();
    //for loop for array
    for (var i = 0; i < topics.length; i++) {
        // makes buttons for array
        var btn = $("<button>");
        btn.addClass("super-hero-button");
        btn.attr("data-name", topics[i]);
        btn.text(topics[i]);
        //append button to html page
        $("#herobutton").append(btn);
    }

}
//creates onclick function for button
$("newHero").on("click", function () {

    var good = $("#heros").val().trim();
    topics.push(good);
    buttons();
    return false;


});

// function tha displays the gifs
function displayGifs() {
    var elementClicked = $(this);

    var searchQuery = elementClicked.attr('data-named'); // TODO, fill out with the "name" of the button that was clicked
    var api_key = "WxX4eRyvEOeZhA0odFULqFqm5GXlKm7P"; // TODO, add api key
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + api_key + "&q=" + searchQuery + "&limit=9&offset=0&rating=G&lang=en";

    //calls to ajax
    $.ajax({ url: queryUrl, method: "GET" }).done(function (response) {
        console.log(response.data);

        var results = response.data;
        // for loop goes through each gif and adds variables
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div class=gifs>');
            var showGif = $('<img>');
            showGif.attr('src', results[i].images.fixed_height_still.url);
            // shows rating
            showGif.attr('title', "Rating: " + results[i].rating);
            showGif.attr('data-still', results[i].images.fixed_height_still.url);
            showGif.attr('data-state', 'still');
            showGif.addClass('gif');
            showGif.attr('data-animate', results[i].images.fixed_height.url);

            gifDiv.append(showGif);

            //append gif to html
            $("#heroGif").prepend(gifDiv);
        }

    });
}


// function for animating gifs
$(document).on('click', '.gif', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});


// function for displaying show gifs

$(document).on("click", ".super-hero-button", displayGifs);

// initially calls the makeButtons function
buttons();

});