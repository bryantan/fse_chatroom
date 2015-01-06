Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  var username = '';
  var username_dep = new Deps.Dependency();

  Template.page_body.helpers({
    in_chatroom: function() {
      username_dep.depend();
      // check if user is in the chatroom yet
      return username !== '';
    }
  });

  Template.namedisplay.helpers({
    name: function() {
      return username;
    }
  });

  Template.message.rendered = function() {
    // scroll to bottom of chat
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  };

  Template.message.helpers({
    formatted_time: function() {
      // return time in humanized format
      return moment(this.time).fromNow();
    }
  });

  Template.messages.helpers({
    messages: function() {
      // return all messages sorted chronologically
      return Messages.find({}, { sort: { time: 1 }});
    }
  });

  Template.inputfield.events = {
    'keydown #message': function(event) {
      // detect press of enter key
      if(event.which == 13) {
        var name = username;
        var message = $('#message');

        // add new message to database
        if(username != '' && message.val() != '') {
          Messages.insert({
            name: username,
            message: message.val(),
            time: Date.now()
          });

          message.val('');
          $('#messages').scrollTop($('#messages')[0].scrollHeight);
        }
        else {
          alert('Please enter a message!');
        }
      }
    }
  }

  Template.namefield.events = {
    'keydown #name': function(event) {
      // detect press of enter key and set username
      if(event.which == 13 && $('#name').val() != '') {
        username_dep.changed();
        username = $('#name').val();
      }
    }
  }

  Template.leavebutton.events = {
    'click #leave': function(event) {
      username_dep.changed();
      username = '';
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
