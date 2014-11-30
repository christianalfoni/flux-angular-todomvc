angular.module('todomvc')
.store('todoStore', function (todoStorage) {

  var data = null;

  return {
    isPreparingData: true,
    todos: [],
    initialize: function () {
      return todoStorage
      .then(function (module) {
        data = module;
        return data.get();
      })
      .then(function (todos) {
        this.todos = todos;
        this.isPreparingData = false;
        this.emit('data.ready');
      }.bind(this));
    }
  };

});