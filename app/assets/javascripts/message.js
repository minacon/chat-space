$(function() {
  function buildHTML(post){
    var body = post.body? `${post.body}`:"";
    var image = post.image? `${post.image}`:"";
    var html = `<div class="message">
                <div class="upper-info">
                <div class="upper-info__user">
                ${post.user_name}
                </div>
                <div class="upper-info__date">
                ${post.created_at}
                </div>
                </div>
                <div class="message__text">
                <p class="lower-message__content">
                <div>${body}</div>
                <img src=${image}></img>
                </p>
                </div>
                </div>`
    return html;
  }


  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(post){
      html = buildHTML(post);
      $('.messages').append(html)
      $('#message_body').val('')
      $('.submit-btn').prop('disabled', false); 
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  }); 
});