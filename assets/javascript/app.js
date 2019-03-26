$(document).ready(function () {
    let nom = {
        topics: ["cupcakes", "muffins", "brownies", "candy", "cookies", "crackers", "chips", "sandwiches", "cheetos", "pretzels", "popcorn", "trail mix", "charcuterie", "cheese", "sushi", "ramen"],
        search: "",
        gifsOn: 0,
        buttonClick: function () {
            if (nom.gifsON === 1) {
                $(".gif").remove();
                $(".ratingtxt").remove();
            }
            queryURL = "https://api.giphy.com/v1/gifs/search?api_key=LHT7iK6UzGi1TfWhTD61gljoy1F3PThp&q=" + nom.search + "&limit=10&offset=0&lang=en",
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function (response) {
                    console.log(response)
                    for (var i = 0; i < response.data.length; i++) {
                        let imageURLstill = response.data[i].images.fixed_height_still.url;
                        let imageURLanimate = response.data[i].images.fixed_height.url;
                        let imageRating = response.data[i].rating;
                        let gifDiv = $("<div style='display: inline-block'>")
                        let gifImage = $("<img class='gif'>");
                        let gifRating = $("<p class='ratingtxt'>")
                        gifImage.attr("src", imageURLstill);
                        gifImage.attr("data-still", imageURLstill);
                        gifImage.attr("data-animate", imageURLanimate);
                        gifImage.attr("data-state", "still");
                        $(gifRating).html("Rating: " + imageRating);
                        $("#gifanchor").append(gifDiv);
                        $(gifDiv).append(gifImage);
                        $(gifDiv).append(gifRating)
                    }
                })
        },
        dButtons: function () {
            for (var i = 0; i < nom.topics.length; i++) {
                let btndiv = $("<button class='btn btn-primary snackbutton'>")
                $(btndiv).text(nom.topics[i]);
                $("#buttonanchor").append(btndiv);
            }
        },
        addTopic: function () {
            if ($("#search").val) {
                let searchbar = "";
                searchbar = $("#search").val();
                if (searchbar) {
                    nom.topics.push(searchbar);
                    $(".snackbutton").remove();
                    nom.dButtons();
                }
            }
        },
    }
    nom.dButtons();
    $("#submit").on("click", function () {
        nom.addTopic();
    })
    $("body").on("click", ".snackbutton", function () {
        nom.search = $(this).text();
        nom.buttonClick();
        nom.gifsON = 1;
    })
    $("body").on("click", ".gif", function () {
        let state = $(this).attr("data-state");
        if (state === "still") {
            let animate = $(this).attr("data-animate");
            $(this).attr("src", animate);
            $(this).attr("data-state", "animate");
            state = $(this).attr("data-state");
        } else {
            let still = $(this).attr("data-still");
            $(this).attr("src", still);
            $(this).attr("data-state", "still");
            state = $(this).attr("data-state");
        }
    })
})