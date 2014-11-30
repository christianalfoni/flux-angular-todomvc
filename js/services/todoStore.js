angular.module('todomvc')
.store('todoStore', function (todoStorage, $rootScope, $routeParams) {

  var data = null;

  return {
    // State
    preparingData: true,
    todos: [],
    statusFilter: null,
    status: '',

    // Initialize
    initialize: function () {

      // Set filter on route changes
      $rootScope.$on('$routeChangeSuccess', function () {
        var status = this.status = $routeParams.status || '';

        this.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;

      }.bind(this));

      // Set the correct backend service
      todoStorage
      .then(function (module) {
        data = module;
        return data.get();
      })
      .then(function (todos) {
        this.todos = todos;
        this.preparingData = false;
        this.emit('data.ready');
      }.bind(this));
    },

    // Handlers
    handlers: {

    },

    // Getters
    isPreparingData: function () {
      return this.preparingData;
    },
    getTodos: function () {
      return this.todos;
    },
    getRemainingCount: function () {
      return this.todos.length - this.todos.filter(function (todo) {
        return todo.completed;
      }).length;
    },
    getCompletedCount: function () {
      return this.todos.filter(function (todo) {
        return todo.completed;
      }).length;
    },
    isAllChecked: function () {
      return this.todos.filter(function (todo) {
        return todo.completed;
      }).length === this.todos.length;
    },
    getStatus: function () {
      return this.status;
    },
    getStatusFilter: function () {
      return this.statusFilter;
    }
  };

});