var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    FormView.setUser(App.username);
    RoomsView.initialize();
    MessagesView.initialize();


    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);


    App.refresher = $('.submit').click(function() {
      FormView.handleSubmit(App.stopSpinner);
      MessagesView.clearMessages();
      App.startSpinner();
      App.fetch(App.stopSpinner);
    });

    RoomsView.$select.change(function() {
      App.changeRoom(this.value);
    });
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text) {
          var usr = data.results[i].username;
          var msg = data.results[i].text;
          // if not include dont append 
          // hacker defense
          if (!msg.includes("<")) {
            $('#chats').append(`<div class="chat"><div class="username">${usr}</div>
            <div>${msg}</div></div>`);
          } 
        }
        // console.log('working');
      }
      callback();
    });
  },

  changeRoom: function(roomName) {
    MessagesView.clearMessages();
    window.filter = roomName.toLowerCase();
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

};

