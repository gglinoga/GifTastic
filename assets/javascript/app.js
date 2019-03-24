//APIKEY LHT7iK6UzGi1TfWhTD61gljoy1F3PThp

///js populates page with buttons
// each button chooses category, grabs 10 gifs

//can add buttons with input field

$(document).ready(function () {

    let nom = {
        topics: ["cupcakes", "muffins", "brownies", "candy", "cookies", "crackers", "chips", "sandwiches", "cheetos", "pretzels", "popcorn", "trail mix", "charcuterie", "cheese", "sushi", "ramen"],
        search: "cats",

        buttonClick: function () {
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LHT7iK6UzGi1TfWhTD61gljoy1F3PThp&q=cookies&limit=10&offset=0&lang=en",
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response)
                    console.log(this.search);
                    for (var i = 0; i < 10; i++) {
                        let imageURLstill = response.data[i].images.fixed_height_still.url;
                        let imageURLanimate = response.data[i].images.fixed_height.url;
                        let imageRating = response.data[i].rating;
                        let gifImage = $("<img class='gif'>");
                        let gifRating = $("<h6 class='ratingtxt'>")
                        gifImage.attr("src", imageURLstill);
                        gifImage.attr("data-still", imageURLstill);
                        gifImage.attr("data-animate", imageURLanimate);
                        gifImage.attr("data-state", "still");
                        $(gifRating).html(imageRating);
                        $("#gifanchor").append(gifRating)
                        $("#gifanchor").append(gifImage);

                    }
                })
        },

        dButtons: function () {

        },
        addTopic: function () {

        },
    }

    $("#snacksbutton").on("click", function () {
        nom.buttonClick();
    })

    $("body").on("click", ".gif", function () {
        let state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            let animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            state=$(this).attr("data-state");
        }
        else {
            let still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            state=$(this).attr("data-state");
        }
        ////if still, animate

        ////if animate, still

    })

}) // ready wrapper end