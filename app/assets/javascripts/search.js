$(document).on("turbolinks:load",function() {
  var search_list = $('#user-search-result');
  var member_list = $('#chat-group-users');

  function userHtml(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
                </div>`
    search_list.append(html);
  }

  function errHtml(msg) {
    var html = `<div class="chat-group-user clearfix">${msg}</div>`

    search_list.append(html);
  }

  function memberHtml(id,name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value=${id}>
                <p class='chat-group-user__name'>${name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    member_list.append(html);
  }


  $('#user-search-field').on('keyup',function(e){
    e.preventDefault();

    var input = $('#user-search-field').val();
    $('#user-search-result').empty();
    if (input.length !== 0) {
      $.ajax({
        type: 'GET',
        url: '/users/search',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        if (users.length !== 0) {
          users.forEach(function(user){
            userHtml(user);
          });
        }
        else {
          errHtml("一致するuserはいません");
        }
      })
      .fail(function() {
        errHtml("一致するuserはいません");
      });
    }
  });

  $(document).on('click','.chat-group-user__btn--add',function(){
    $(this).parent().remove();
    var id = $(this).data('user-id')
    var name = $(this).data('user-name')
    memberHtml(id,name)
    });

    $(document).on('click','.user-search-remove',function(){
      $(this).parent().remove();
    });
});

