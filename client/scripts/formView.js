var FormView = {

  $form: $('form'),
  currentUser: null,

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  setUser: function(username) {
    FormView.currentUser = username;
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    var msgText = $('#message').val();
    var msg = {username: FormView.currentUser, text: msgText, roomname: window.filter};
    
    Parse.create(msg, (data) => {
      console.log(data);
    });

    $('#refresh').click();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};