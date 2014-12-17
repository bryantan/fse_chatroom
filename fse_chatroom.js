Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.message.rendered = function() {
    console.log("scrolltop is " + $('#messages').scrollTop() + ", scrollHeight is " + $('#messages').prop("scrollHeight"));
    //$('#messages').scrollTop($('#messages')[0].scrollHeight);
    $('#messages').scrollTop( $('#messages').prop("scrollHeight"));
    console.log("scrolltop is " + $('#messages').scrollTop());
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
        // Submit the form
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
