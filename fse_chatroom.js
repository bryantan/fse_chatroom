Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.message.rendered = function() {
    $('#messages').scrollTop($('#messages').prop("scrollHeight"));
  };

  Template.message.helpers({
    formatted_time: function() {
      return moment(this.time).fromNow();
    }
  });

  Template.messages.helpers({
    messages: function() {
      return Messages.find({}, { sort: { time: 1 }});
    }
  });

  Template.inputfield.events = {
    "keydown #message": function(event) {
      // detect press of enter key
      if(event.which == 13) {
        var name = $('#name');
        var message = $('#message');

        if(name.val() != '' && message.val() != '') {
          Messages.insert({
            name: name.val(),
            message: message.val(),
            time: Date.now()
          });

          message.val('');
          $('#messages').scrollTop($('#messages')[0].scrollHeight);
        }
        else {
          alert('Please enter a name and message!');
        }
      }
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
