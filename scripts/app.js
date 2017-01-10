$(function() {
    // hide detail container
    $('#detail').hide();
    var loadingMessage = $('#detail').html();

    // Bind to StateChange Event
    History.Adapter.bind(window,'statechange',function() { // Note: We are using statechange instead of popstate
        var State = History.getState();
        // $('#content').load(State.url);
        // Instead of the line above, you could run the code below if the url returns the whole page instead of just the content (assuming it has a `#content`):
        if (State.url.indexOf('detail') >= 0){
            $('#teasers').hide(300, function(){
                // $.get(State.url, function(response) {
                //     console.log($(response));
                //     $('#detail').html($(response).find('#detail').html()).show();
                // });
                $('#detail').load(State.url + ' #ajax-detail').show(800);
            });
        } else {
            $('#detail').html(loadingMessage).hide(800);
            $('#teasers').show(800);
        }
    });


    // Capture all the links to push their url to the history stack and trigger the StateChange Event
    $('article:not(.coming-soon, .about) a').click(function(evt) {
        evt.preventDefault();
        console.log("clicked on ", evt.target);
        History.pushState(null, $(this).text(), $(this).attr('href'));
    });

    /* look at all work-samples articles and display details on hover */
    /* take all articles and for each of then watch if the mouse hovers over it*/
    $(".work-samples article:not(.coming-soon)").each(function(){
      $(this).hover(showDetails, hideDetails);
    });


    function showDetails(event){
        //make sure we get the article, not the img or p inside it
        var article;
        if ($(event.target).prop('tagName') == 'ARTICLE'){
           article = $(event.target);
        } else {
           article = $(event.target).parents('article');
        }

        // we have the article, grab the description
        var desc = article.find('.work-desc').clone();

        $('.desc-holder').html(desc);

    }

    function hideDetails(event){
        var State = History.getState();
        if (State.url.indexOf('detail') < 0){
            $('.desc-holder').html('');
        }
    }

});
