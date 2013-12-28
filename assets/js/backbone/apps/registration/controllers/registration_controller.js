define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'utilities',
  'base_controller',
  'registration_view',
  'modal_component'
], function ($, _, Backbone, Bootstrap, utils, BaseController, RegistrationView, ModalComponent) {

  Application.Registration = BaseController.extend({

    events: {
    },

    initialize: function ( options ) {
      var self = this;
      this.options = options;
      this.initializeView();
    },

    initializeView: function () {
      if (this.registrationView) {
        this.registrationView.cleanup();
        this.modalComponent.cleanup();
      }

      this.modalComponent = new ModalComponent({
        el: this.el,
        id: "register",
        modalTitle: "Register"
      }).render();

      this.registrationView = new RegistrationView({
        el: "#container",
	target: "register",
        register: Register,
        message: this.options.message
      }).render();
      $("#register").modal('show');

      window.cache.userEvents.on("user:login", function (user) {
        // hide the modal
        $('#login').bind('hidden.bs.modal', function() {
          // reload the page after login
          Backbone.history.loadUrl();
          window.cache.userEvents.trigger("user:login:success", user);
        }).modal('hide');
      });
    },

    // ---------------------
    //= UTILITY METHODS
    // ---------------------
    cleanup: function() {
      // don't do anything
      if (this.registrationView) { this.registrationView.cleanup(); }
      if (this.modalComponent) { this.modalComponent.cleanup(); }
      removeView(this);
    }

  });

  return Application.Register;
})
