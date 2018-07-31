$(document).ready(function(){
   
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
            $("#buttons-view").append(a);
          }  
    }   
    
    renderButtons();

    // click to add more buttons
      $("#input").on("click"), function(event){

      event.preventDefault();
      var userEntry = $("#textarea").val().trim();

    //   puts button on the page
      team.push(userEntry);

      renderButtons();

    });  

    // add gif's 
    $(document).on("click", ".theme", showGIF);

        function showGIF(){

        var chosenbtn = $(this).attr("data-name");   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        chosenbtn + "&api_key=GA7rimcdhtQuz4r5ehPjVtrCjF1t5dnt&limit=10";

        // ajax call to giphy api
        $.ajax({
            url: queryURL,
            method: "GET"   
        })
        .then(function(response){
            var results = response.data;

        //Loop for over result    
        for (var i=0; i < results.length; i++){
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        
            var gif = $("<div>"); 
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);   
            var image =$("<img>");
            image.addClass("still");
            image.attr("data-state", "paused"); 
            image.attr("src", results[i].images.fixed_height.url);
            image.attr("data-pause", result[i].image.fixed_height.url); 
            image.attr("data-moving", result[i].images.fixed_height.url);
            
            //appends the image and rating
            gif.append(p);
            gif.append(image);
        }
    }

    // start and stop gifs
    $(document).on("click", ".still", function(){

        // create variable
        var animation = $(".still").attr("data-state");

        // if statement that will start and stop animation
            if(animation=== "paused"){
                $(this).attr("src", $(this).attr("data-moving"));
                $(this).attr("data-state", "moving");
            }  else {
                $(this).attr("src", $(this).attr("data-paused"));
                $(this).attr("data-state", "paused");
            }
            $("#teamView").prepend(gif);
        });
    });
        };
                   
     
    

      $("#add-team").on("click", function(event) {
      // Preventing the buttons default behavior when clicked (which is submitting a form)
      event.preventDefault();

      // grabs the input from the textbox
      var team = $("#team-input").val().trim();

      // Adds movie to the array
      team.push(team);
      renderButtons();

    });

    $(document).on("click", ".team", teamName);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
  
});