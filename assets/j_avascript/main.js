$(document).ready(function () {

    // array of NFL team
    var team = ["Miami Dolphins", "New York Giants", "Philadelphia Eages", "New England Patriots"];

    function renderButtons() {
        // clears the array
        $("#buttons-view").empty();

        // Loop through the array of teams    
        for (var i = 0; i < team.length; i++) {

            // Then dynamicaly adds buttons for each movie in the array
            var button = $("<button>");
            button.addClass("theme");
            button.attr("data-name", team[i]);
            button.text(team[i]);
            // adds button
            $("#buttons-view").append(button);
        }
    }
    renderButtons();

    // click to add more buttons
    $("#add-team").on("click", function (event) {
        event.preventDefault();
        var userEntry = $("#textarea").val().trim();
        $("#textarea").val('');
        //   puts button on the page
        team.push(userEntry);
        // console.log(userEntry);
        renderButtons();
    });


    // add gif's 
    $(document).on("click", ".theme", showGIF);

    function showGIF() {

        var chosenbtn = $(this).attr("data-name");
        // console.log (chosenbtn );
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            chosenbtn + "&api_key=GA7rimcdhtQuz4r5ehPjVtrCjF1t5dnt&limit=10";

        // ajax call to giphy api
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;
            $(".image-wrapper").empty();

            //Loop for result    
            for (var i = 0; i < results.length; i++) {
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    console.log(results);
                    var gif = $(".image-wrapper");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var image = $("<img>");
                    image.addClass("gifImg");
                    image.attr("data-state", "still");
                    image.attr("src", results[i].images.fixed_width_still.url);
                    image.attr("data-still", results[i].images.fixed_width_still.url);
                    image.attr("data-animate", results[i].images.fixed_height.url);

                    //appends the image and rating
                    gif.append(p);
                    gif.append(image);
                    
                }
            }
            // start and stop gifs
            $(document).on("click", ".gifImg", function () {
                // alert("hello");
                // create variable
                var move = $(this).attr("data-state");

                // if statement that will start and stop animation
                if (move === "animate") {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                } else {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                }

            });

        });

    };

});


















