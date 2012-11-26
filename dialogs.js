;(function (window, document, $, undefined) {
  var modalWindow = {
    frame: null,
    header: null,
    body: null,
    footer: null,
    self: null,
    getHTML: function () {
      return this.frame.append(this.header, this.body, this.footer);
    }
  };

  $(function () {
    // Create an hidden modal window
    modalWindow.frame = $('<div>', {
      class: 'modal hide fade',
      tabindex: '-1',
      role: 'dialog',
    });
    modalWindow.header = $('<div>', {class: 'modal-header'});
    var title = $('<h3>');
    modalWindow.header.append(title);
    modalWindow.title = title;
    
    modalWindow.body = $('<div>', {class: 'modal-body'});
    
    modalWindow.footer = $('<div>', {class: 'modal-footer'});
    
    modalWindow.self = modalWindow.getHTML();
    modalWindow.self.modal({backdrop: 'static', show: false});

    $('body').append(modalWindow.self);
  });

  // Return a button object
  var getButton = function (text, primary) {
    text = text || 'Button';
    return $('<button>', {
      class: (!!primary) ? 'btn btn-primary': 'btn',
      html: text
    });
  };

  // Return a close button object
  // for the modal window
  var getCloseButton = function (text, primary) {
    text = text || 'Close';
    if (primary == null) {
      primary = true;
    }
    var button = getButton(text, primary);
    return button.attr('data-dismiss', 'modal');
  };

  // Return two button objects
  // for the modal window
  var getDoubleButtons = function (text1, text2) {
    text1 = text1 || 'Ok';
    text2 = text2 || 'Cancel';
    return [getButton(text1, true), getCloseButton(text2, false)];
  };

  // Remove all the listeners from the object
  var removeListeners = function () {
    modalWindow.self.off('hidden');
    modalWindow.self.off('shown');
    modalWindow.footer.off('click');
  };

  var dialogs = {
    alert: function (message, callback) {
      if (arguments.length === 0) {
        message = null;
        callback = null;
      } else if (arguments.length === 1) {
        if ($.isFunction(message)) {
          callback = message;
          message = null;
        } else {
          callback = null;
        }
      }

      modalWindow.title.text('Alert');
      removeListeners();
      modalWindow.body.html('<p>' + message + '</p>');
      modalWindow.footer.empty().append(getCloseButton('Ok'));
      modalWindow.self.modal('show');
      
      if (callback != null) {
        modalWindow.self.on('hidden', callback);
      }
    },

    confirm: function (message, callback) {
      if (arguments.length === 0) {
        message = null;
        callback = null;
      } else if (arguments.length === 1) {
        if ($.isFunction(message)) {
          callback = message;
          message = null;
        } else {
          callback = null;
        }
      }

      modalWindow.title.text('Confirm');
      removeListeners();
      modalWindow.body.html('<p>' + message + '</p>');
      modalWindow.footer.empty().append(getDoubleButtons());
      modalWindow.self.modal('show');
      
      modalWindow.footer.on('click', 'button', function (evt) {
        var result = evt.target.innerHTML === 'Ok';
        if (result) {
          modalWindow.self.modal('hide'); 
        }
        if (callback != null) {
         callback(result); 
        }
      });
    },

    prompt: function (message, value, callback) {
      if (arguments.length === 0) {
        message = null;
        value = '';
        callback = null;
      } else if (arguments.length === 1) {
        if ($.isFunction(message)) {
          callback = message;
          message = null;
        } else {
          callback = null;
        }
        value = '';
      } else if (arguments.length === 2) {
        if ($.isFunction(value)) {
          callback = value;
          value = '';
        } else{
          callback = null;
        }
      }

      modalWindow.title.text('Prompt');
      removeListeners();
      modalWindow.body
        .html('<p>' + message + '</p><p><input type="text" value="'+value+'"></p>');
      modalWindow.self.on('shown', function () {
        modalWindow.body.find('input').focus();
      });
      modalWindow.footer.empty().append(getDoubleButtons());
      modalWindow.self.modal('show');

      modalWindow.footer.on('click', 'button', function (evt) {
        var confirm = evt.target.innerHTML === 'Ok';
        var result = modalWindow.body.find('input').val();
        
        if (confirm) {
          modalWindow.self.modal('hide'); 
        }
        if (callback != null) {
          callback((confirm && result != null) ? result : null);
        }
      });
    }
  };

  window.dialogs = dialogs;
})(window, window.document, jQuery);