// Funtion for populating buttons
$(function() {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    //console.log("Page");
})

var searchArray = ['Cat', 'Bird', 'Pokemon', 'Dragon', 'Ferret', 'Raptor'];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    //Empties out button to not create duplicates
    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }

}
//Stores data for each button, Bird = Bird, Dog = Dog etc..
$(document).on('click', '.searchButton', function() {
    var type = $(this).data('type');
    //console.log(type);

    //Getting API objects
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=lBMpoai87PhIFtlIkDjpEFl4XiLJY75q';
    $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            //console.log(response);
            for(var i=0;i<response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                //variables for animated and still version of GIF
                //getting it from JSON object
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                //adding image tag
                var image = $('<img>');
                //all images load to the page as stills first
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                //adding class to image
                image.addClass('searchImage');
                //adding to seach DIV
                searchDiv.prepend(p);
                searchDiv.prepend(image);
                $('#searches').prepend(searchDiv);

            }
        })

})
//making gifs animate when clicked on 
$(document).on('click', '.searchImage', function() { 
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }


})

$('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false;
})