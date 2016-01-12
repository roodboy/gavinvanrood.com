$(function() {

  /* look at all work-samples articles and display details on hover */
  /* take all articles and for each of then watch if the mouse hovers over it*/
  $(".work-samples article").each(function(){
    $(this).hover(showDetails, hideDetails);
  });
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
  $('.desc-holder').html('');
}
