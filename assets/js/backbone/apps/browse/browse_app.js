define([
  'jquery',
  'underscore',
  'backbone',
  'utilities',
  'nav_view',
  'browse_list_controller',
  'project_model',
  'project_show_controller',
  'profile_show_controller',
  'task_model',
  'task_show_controller',
  'task_edit_form_view',
  'registration_view',
  'registration_controller'
], function ($, _, Backbone, utils, NavView, BrowseListController, ProjectModel, ProjectShowController, ProfileShowController, TaskModel, TaskShowController, TaskEditFormView, RegistrationView, RegistrationController) {

  var BrowseRouter = Backbone.Router.extend({

    routes: {
      ''                          : 'redirectHome',
      'register'	          : 'showRegister',
      'projects(/)'               : 'listProjects',
      'projects/:id(/)'           : 'showProject',
      'projects/:id/:action(/)'   : 'showProject',
      'tasks(/)'                  : 'listTasks',
      'tasks/:id(/)'              : 'showTask',
      'tasks/:id/:action(/)'      : 'showTask',
      'profile(/)'                : 'showProfile',
      'profile/:id(/)'            : 'showProfile'
    },

    data: { saved: false },

    initialize: function () {
      this.navView = new NavView({
        el: '.navigation'
      }).render();
    },

    cleanupChildren: function () {
      if (this.browseListController) { this.browseListController.cleanup(); }
      if (this.projectShowController) { this.projectShowController.cleanup(); }
      if (this.profileShowController) { this.profileShowController.cleanup(); }
      if (this.taskShowController) { this.taskShowController.cleanup(); }
      if (this.RegistrationController) { this.RegistrationController.cleanup(); }
      this.data = { saved: false };
    },

    redirectHome: function () {
      Backbone.history.navigate('/projects', { trigger: true });
    },

    showRegister: function () {
      this.cleanupChildren();
      this.RegistrationController = new RegistrationController({
        target: 'register',
        data: this.data
      });
    },

    listProjects: function () {
      this.cleanupChildren();
      this.browseListController = new BrowseListController({
        target: 'projects',
        data: this.data
      });
    },

    listTasks: function () {
      this.cleanupChildren();
      this.browseListController = new BrowseListController({
        target: 'tasks',
        data: this.data
      });
    },

    showProject: function (id, action) {
      this.cleanupChildren();
      var model = new ProjectModel();
      model.set({ id: id });
      this.projectShowController = new ProjectShowController({ model: model, router: this, id: id, action: action, data: this.data });
    },

    showTask: function (id, action) {
      this.cleanupChildren();
      var model = new TaskModel();
      model.set({ id: id });
      this.taskShowController = new TaskShowController({ model: model, router: this, id: id, action: action, data: this.data });
    },

    showProfile: function (id) {
      this.cleanupChildren();
      this.profileShowController = new ProfileShowController({ id: id, data: this.data });
    }

  });

  var initialize = function () {
    var router = new BrowseRouter();
    return router;
  }

  return {
    initialize: initialize
  };
});
