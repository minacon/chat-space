$(document).on("turbolinks:load",function() {
  function buildHTML(post){
    var body = post.body? `${post.body}`:"";
    var image = post.image? `${post.image}`:"";
    var html = `<div class="message" data-id=${post.id}>
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
      var html = buildHTML(post);
      $('.messages').append(html)
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false); 
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
      $('.group_id-' + post.group_id ).text(post.body)
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
  });


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('id')
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML)
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight });
          
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    };
  };
  setInterval(reloadMessages, 5000);
});
