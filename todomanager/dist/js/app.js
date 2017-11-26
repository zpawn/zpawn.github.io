((window, $) => {
    "use strict";

    class Alert {
        render(data) {
            let alert = $(`<div class="alert alert-${data.type ? data.type : 'danger'} alert-dismissible fade show" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>${data.name ? data.name + ':' : ''}</strong>
                ${data.message}
            </div>`);

            $('#alerts').append(alert);

            setTimeout(() => alert.remove(), 3000);
        }
    }

    window.todo = window.todo || {};
    window.todo.Alert = Alert;
})(window, jQuery);
(window => {
    "use strict";

    class DateTimePicker {

        constructor() {
            this.picker = {
                $root: this,
                callback: {}
            };

            let picker = this.picker;

            $("#dateTimePicker").AnyPicker({
                onInit: function () {
                    picker.$root = this;
                },
                mode: "datetime",
                theme: "iOS",
                rowsNavigation: "scroller",
                onSetOutput: function (sOutput, oArrSelectedValues) {
                    picker.callback(oArrSelectedValues.date);
                }
            });
        }

        open(callback) {
            this.picker.$root.showOrHidePicker();
            this.picker.callback = callback;
        }
    }

    window.todo = window.todo || {};
    window.todo.DateTimePicker = DateTimePicker;
})(window);
const Mediator = (() => {
    "use strict";

    return {
        subscribers: {
            any: [] // event type: subscribers
        },

        subscribe(fn, type = 'any') {
            if (typeof this.subscribers[type] === "undefined") {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        unsubscribe(fn, type) {
            this.visitSubscribers('unsubscribe', fn, type);
        },
        publish(publication, type) {
            this.visitSubscribers('publish', publication, type);
        },
        visitSubscribers(action, arg, type = 'any') {
            let subscribers = this.subscribers[type];

            for (let i = 0; i < subscribers.length; i += 1) {
                if (action === 'publish') {
                    subscribers[i](arg);
                } else {
                    if (subscribers[i] === arg) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        }
    };
})();
(window => {
    "use strict";

    class Scroller {

        constructor(selector) {
            this.scrollerContainer = document.querySelectorAll(selector);
        }

        render() {
            this.scrollerContainer.forEach(scroll => {
                let ps = new PerfectScrollbar(scroll);
            });
        }
    }

    window.todo = window.todo || {};
    window.todo.Scroller = Scroller;
})(window);
((window, $) => {
    "use strict";

    let Spinner = selector => {
        const $root = $(selector);
        let show = false;

        return {
            toggle(type) {
                type === 'show' ? $root.show() : $root.hide();
            }
        };
    };

    window.todo = window.todo || {};
    window.todo.Spinner = Spinner;
})(window, jQuery);
((window, $, _) => {
    "use strict";

    class Controller {

        constructor(model, listView, taskView) {
            this.model = model;
            this.listView = listView;
            this.taskView = taskView;
            this.listActive = '';
            this.spinner = todo.Spinner('#spinner');
            this.alert = new todo.Alert();
            this.scroller = new todo.Scroller('.js-scroller');
            this.dateTimePicker = new todo.DateTimePicker();

            ////

            Mediator.subscribe(this.listView.render, 'list');
            Mediator.subscribe(this.taskView.render, 'task');
            Mediator.subscribe(this.listView.listActive, 'listActive');
            Mediator.subscribe(this.spinner.toggle, 'spinner');
            Mediator.subscribe(this.alert.render, 'alert');

            ////

            this.scroller.render();
            this.model.findAll();
            this.bind();
        }

        bind() {
            this.listView.$root.on('click', 'a', this._bindListItemClick.bind(this));
            $('#addNewListForm').on('submit', this._bindNewListSubmit.bind(this));
            $('#addNewTaskForm').on('submit', this._bindNewTaskSubmit.bind(this));
            $('#todoTasks').on('click', this._bindTaskItemClick.bind(this));
            $('#searchList').on('keyup', this._bindSearchList.bind(this));
            $('#searchTask').on('keyup', this._bindSearchTask.bind(this));
            $('#sortByDone').on('click', this._bindSortByDone.bind(this));
        }

        _bindListItemClick(e) {
            let $elm = $(e.currentTarget),
                $parent = $elm.closest('.js-list-parent'),
                listId = $parent.data('listId') || '';

            if ($elm.hasClass('js-set')) {
                this.listActive = listId;
                Mediator.publish(this.model.getTasks(parseInt(this.listActive)), 'task');
                Mediator.publish(this.listActive, 'listActive');
            } else if ($elm.hasClass('js-edit')) {
                this._editList(listId);
            } else if ($elm.hasClass('js-remove')) {
                this.model.remove(listId);
            }
        }

        _editList(listId) {
            let editList = this.listView.$root.find(`#editList${listId}`);

            editList.addClass('openForm');
            this.listView.toggleEditList(editList);

            editList.on('submit', e => {
                e.preventDefault();
                editList.off('submit');

                editList.removeClass('openForm');
                this.listView.toggleEditList(editList);
                this.model.updateList(listId, e.target.elements[0].value);
            });

            editList.on('focusout', e => {
                editList.removeClass('openForm');
                this.listView.toggleEditList(editList);
                editList.off('focusout');
            });
        }

        _bindNewListSubmit(e) {
            e.preventDefault();
            this.model.create(e.target);
            $('#newToDoList').val("");
        }

        _bindTaskItemClick(e) {
            let $elm = $(e.target),
                $parent = $elm.closest('.js-task-parent'),
                taskId = $parent.data('taskId');

            if ($elm.hasClass('js-datetime')) {
                this.dateTimePicker.open(date => {
                    this.model.updateTask(this.listActive, taskId, {
                        field: 'deadline',
                        value: moment(date).valueOf()
                    });
                });
            } else if ($elm.hasClass('js-done')) {
                this.model.updateTask(this.listActive, taskId, {
                    field: 'done',
                    value: !$elm.find('input').prop('checked')
                });
            } else if ($(e.target).closest('.js-edit').length) {
                this._editTask(taskId);
            } else if ($(e.target).closest('.js-remove').length) {
                this.model.removeTask(this.listActive, taskId);
            }
        }

        _bindNewTaskSubmit(e) {
            e.preventDefault();
            this.model.update(e.target, this.listActive);
            $('#newToDoTask').val("");
        }

        _editTask(taskId) {
            let editTask = $(`#editTask${taskId}`);

            editTask.addClass('openForm');
            this.taskView.toggleEditTask(editTask);

            editTask.on('submit', e => {
                e.preventDefault();
                editTask.off('submit');

                editTask.removeClass('openForm');
                this.taskView.toggleEditTask(editTask);
                this.model.updateTask(this.listActive, taskId, {
                    field: 'description',
                    value: e.target.elements[0].value
                });
            });

            editTask.on('focusout', e => {
                editTask.removeClass('openForm');
                this.taskView.toggleEditTask(editTask);
                editTask.off('focusout');
            });
        }

        _bindSearchList(e) {
            let search = _.trim(e.target.value).toLowerCase();

            if (search.length > 0) {
                Mediator.publish(this.model.lists.filter(list => list.title.toLowerCase().indexOf(search) !== -1), 'list');
            } else {
                Mediator.publish(this.model.lists, 'list');
            }
        }

        _bindSearchTask(e) {
            if (this.listActive) {

                let search = _.trim(e.target.value).toLowerCase();

                if (search.length > 0) {
                    Mediator.publish(this.model.getTasks(this.listActive).filter(task => task.description.toLowerCase().indexOf(search) !== -1), 'task');
                } else {
                    Mediator.publish(this.model.getTasks(this.listActive), 'task');
                }
            }
        }

        _bindSortByDone(e) {
            if (this.listActive) {
                let sortIcon = $('#sortByDoneIcon');

                if (sortIcon.is(':visible')) {
                    sortIcon.hide();
                    Mediator.publish(this.model.getTasks(this.listActive), 'task');
                } else {
                    sortIcon.show();
                    Mediator.publish(this.model.getTasks(this.listActive).filter(task => task.done === false), 'task');
                }
            }
        }
    }

    window.todo = window.todo || {};
    window.todo.Controller = Controller;
})(window, jQuery, _);
((window, $, _) => {
    "use strict";

    class ListView {

        static getRoot() {
            return $("#todoList");
        }

        constructor() {
            this.$root = ListView.getRoot();
        }

        toggleEditList(list) {
            if (list.hasClass('openForm')) {
                list.find('input').prop('type', 'text').focus();
                list.find('span').hide();
            } else {
                list.find('input').prop('type', 'hidden');
                list.find('span').show();
            }
        }

        render(listTasks) {

            let $root = ListView.getRoot();
            $root.html('');

            _.forEach(listTasks, listItem => {
                $root.append(`<li class="list-group-item js-list-parent" href="javascript:void(0)" data-list-id="${listItem.id}">
                    <div class="d-flex w-100 justify-content-between">
                        <form id="editList${listItem.id}">
                            <span><a class="js-set" href="javascript:void(0)">${listItem.title}</a></span>
                            <input class="form-control" type="hidden" name="lists[${listItem.id}]" value="${listItem.title}">                        
                        </form>
                        <span>
                            <a class="js-edit" href="javascript:void(0)"><span class="dripicons-pencil"></span></a>
                            <a class="js-remove" href="javascript:void(0)"><span class="dripicons-cross"></span></a>
                        </span>
                    </div>
                </li>`);
            });
        }

        listActive(listId) {
            ListView.getRoot().find('[data-list-id]').each((i, item) => {
                let $listItem = $(item);
                $listItem.removeClass('active');

                if (parseInt($listItem.data('listId')) === listId) {
                    $listItem.addClass('active');
                }
            });
        }
    }

    window.todo = window.todo || {};
    window.todo.ListView = ListView;
})(window, jQuery, _);
((window, _) => {
    "use strict";

    class Model {
        constructor(store) {
            this.store = store;
            this.lists = {};
        }

        findAll() {
            this.store.find().then(listIds => {
                return Promise.all(listIds.map(listId => {
                    return this.store.find(listId).then(res => {
                        return _.merge(res, { id: listId });
                    });
                }));
            }, err => Mediator.publish({ message: err }, 'alert')).then(lists => {
                this.lists = lists;
                Mediator.publish(this.lists, 'list');
            });
        }

        findOne(listId) {
            this.store.find(listId).then(res => Mediator.publish(res, 'task'), err => Mediator.publish({ message: err }, 'alert'));
        }

        create(form) {
            let listId = Date.now(),
                data = {
                title: form.elements[0].value,
                created: new Date().toString(),
                tasks: []
            };

            this.store.create(listId, data).then(res => res.created ? this.findAll() : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }

        update(form, listId = 0) {

            let list = this.getList(listId);

            list.tasks.push({
                description: form.elements[0].value,
                done: false,
                deadline: Date.now()
            });

            this.store.update(listId, list).then(res => res.updated ? Mediator.publish(list.tasks, 'task') : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }

        remove(listId) {
            this.store.remove(listId).then(res => res.deleted ? this.findAll() : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }

        getList(listId) {
            return this.lists.find(list => list.id == listId);
        }

        updateList(listId = 0, listTitle) {
            let list = this.getList(listId);
            list.title = listTitle;

            this.store.update(listId, list).then(res => res.updated ? this.findAll() : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }

        getTasks(listId = 0) {
            return this.lists.reduce((tasks, list) => {
                if (list.id == listId) {
                    return list.tasks;
                }
                return tasks;
            }, []);
        }

        updateTask(listId, taskId, taskData) {
            let list = this.lists.find(list => list.id == listId);
            list.tasks[taskId][taskData.field] = taskData.value;

            this.store.update(listId, list).then(res => res.updated ? Mediator.publish(list.tasks, 'task') : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }

        removeTask(listId, taskId) {
            let list = this.getList(listId);
            list.tasks.splice(taskId, 1);

            this.store.update(listId, list).then(res => res.updated ? Mediator.publish(list.tasks, 'task') : Mediator.publish(res.error, 'alert'), err => Mediator.publish({ message: err }, 'alert'));
        }
    }

    window.todo = window.todo || {};
    window.todo.Model = Model;
})(window, _);
(window => {
    "use strict";

    class Store {

        constructor() {
            this.endpoint = 'https://enigmatic-temple-67838.herokuapp.com/todo';
            this.STATE_READY = 4;
        }

        find(listId = 0) {
            return this.send(listId);
        }

        create(listId = 0, data = {}) {
            return this.send(listId, 'POST', { todo: JSON.stringify(data) });
        }

        update(listId = 0, data = {}) {
            return this.send(listId, 'PUT', { todo: JSON.stringify(data) });
        }

        remove(listId = 0) {
            return this.send(listId, 'DELETE');
        }

        send(listId, method = 'GET', data = {}) {

            const url = `${this.endpoint}/${listId === 0 ? '' : listId}`;

            return new Promise((resolve, reject) => {
                const req = new XMLHttpRequest();

                Mediator.publish('show', 'spinner');

                req.open(method, url, true);
                // req.withCredentials = true;
                req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
                req.onload = () => {
                    if (req.status === 200) {
                        resolve(JSON.parse(req.response));
                    } else {
                        reject(Error(req.statusText));
                    }
                };
                req.onreadystatechange = () => {
                    if (req.readyState === this.STATE_READY) {
                        Mediator.publish('hide', 'spinner');
                    }
                };
                req.onerror = () => reject(Error("Network error"));
                req.send(JSON.stringify(data));
            });
        }
    }

    window.todo = window.todo || {};
    window.todo.Store = Store;
})(window);
((window, $, _) => {
    "use strict";

    class TaskView {

        static getRoot() {
            return $("#todoTasks");
        }

        constructor() {
            this.$root = TaskView.getRoot();
        }

        toggleEditTask(task) {
            if (task.hasClass('openForm')) {
                task.find('input').prop('type', 'text').focus();
                task.find('span').hide();
            } else {
                task.find('input').prop('type', 'hidden');
                task.find('span').show();
            }
        }

        render(tasks) {
            let $root = TaskView.getRoot();

            $root.html('');

            if (tasks.length === 0) {
                $root.append(`<tr>
                    <td class="text-center" colspan="3">No Tasks!</td>
                </tr>`);
            } else {

                _.forEach(tasks, (task, taskId) => {
                    $root.append(`<tr class="js-task-parent" data-task-id="${taskId}">
                        <td>
                            <div class="d-flex w-100 justify-content-between align-items-center">
                                <form id="editTask${taskId}">
                                    <span>${task.description}</span>
                                    <input class="form-control" type="hidden" name="tasks[${taskId}]" value="${task.description}">
                                </form>
                                <span>
                                    <a class="js-edit" href="javascript:void(0)"><span class="dripicons-pencil"></span></a>
                                    <a class="js-remove" href="javascript:void(0)"><span class="dripicons-cross"></span></a>
                                </span>
                            </div>
                        </td>
                        <td class="js-datetime" data-timestamp="${task.deadline}">${task.deadline ? moment(task.deadline).format('DD.MM.YYYY HH:mm') : '---'}</td>
                        <td>
                            <label class="js-done custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" ${task.done ? 'checked' : ''}>
                                <span class="custom-control-indicator"></span>
                            </label>
                        </td>
                    </tr>`);
                });
            }
        }
    }

    window.todo = window.todo || {};
    window.todo.TaskView = TaskView;
})(window, jQuery, _);
(() => {
    "use strict";

    const store = new todo.Store(),
          model = new todo.Model(store),
          listView = new todo.ListView(),
          taskView = new todo.TaskView(),
          controller = new todo.Controller(model, listView, taskView);
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFsZXJ0LmpzIiwiRGF0ZVRpbWVQaWNrZXIuanMiLCJNZWRpYXRvci5qcyIsIlNjcm9sbGVyLmpzIiwiU3Bpbm5lci5qcyIsIkNvbnRyb2xsZXIuY2xhc3MuanMiLCJMaXN0Vmlldy5jbGFzcy5qcyIsIk1vZGVsLmNsYXNzLmpzIiwiU3RvcmUuY2xhc3MuanMiLCJUYXNrVmlldy5jbGFzcy5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCIkIiwiQWxlcnQiLCJyZW5kZXIiLCJkYXRhIiwiYWxlcnQiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwidG9kbyIsImpRdWVyeSIsIkRhdGVUaW1lUGlja2VyIiwiY29uc3RydWN0b3IiLCJwaWNrZXIiLCIkcm9vdCIsImNhbGxiYWNrIiwiQW55UGlja2VyIiwib25Jbml0IiwibW9kZSIsInRoZW1lIiwicm93c05hdmlnYXRpb24iLCJvblNldE91dHB1dCIsInNPdXRwdXQiLCJvQXJyU2VsZWN0ZWRWYWx1ZXMiLCJkYXRlIiwib3BlbiIsInNob3dPckhpZGVQaWNrZXIiLCJNZWRpYXRvciIsInN1YnNjcmliZXJzIiwiYW55Iiwic3Vic2NyaWJlIiwiZm4iLCJwdXNoIiwidW5zdWJzY3JpYmUiLCJ2aXNpdFN1YnNjcmliZXJzIiwicHVibGlzaCIsInB1YmxpY2F0aW9uIiwiYWN0aW9uIiwiYXJnIiwiaSIsImxlbmd0aCIsInNwbGljZSIsIlNjcm9sbGVyIiwic2VsZWN0b3IiLCJzY3JvbGxlckNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzY3JvbGwiLCJwcyIsIlBlcmZlY3RTY3JvbGxiYXIiLCJTcGlubmVyIiwic2hvdyIsInRvZ2dsZSIsImhpZGUiLCJfIiwiQ29udHJvbGxlciIsIm1vZGVsIiwibGlzdFZpZXciLCJ0YXNrVmlldyIsImxpc3RBY3RpdmUiLCJzcGlubmVyIiwic2Nyb2xsZXIiLCJkYXRlVGltZVBpY2tlciIsImZpbmRBbGwiLCJiaW5kIiwib24iLCJfYmluZExpc3RJdGVtQ2xpY2siLCJfYmluZE5ld0xpc3RTdWJtaXQiLCJfYmluZE5ld1Rhc2tTdWJtaXQiLCJfYmluZFRhc2tJdGVtQ2xpY2siLCJfYmluZFNlYXJjaExpc3QiLCJfYmluZFNlYXJjaFRhc2siLCJfYmluZFNvcnRCeURvbmUiLCJlIiwiJGVsbSIsImN1cnJlbnRUYXJnZXQiLCIkcGFyZW50IiwiY2xvc2VzdCIsImxpc3RJZCIsImhhc0NsYXNzIiwiZ2V0VGFza3MiLCJwYXJzZUludCIsIl9lZGl0TGlzdCIsImVkaXRMaXN0IiwiZmluZCIsImFkZENsYXNzIiwidG9nZ2xlRWRpdExpc3QiLCJwcmV2ZW50RGVmYXVsdCIsIm9mZiIsInJlbW92ZUNsYXNzIiwidXBkYXRlTGlzdCIsInRhcmdldCIsImVsZW1lbnRzIiwidmFsdWUiLCJjcmVhdGUiLCJ2YWwiLCJ0YXNrSWQiLCJ1cGRhdGVUYXNrIiwiZmllbGQiLCJtb21lbnQiLCJ2YWx1ZU9mIiwicHJvcCIsIl9lZGl0VGFzayIsInJlbW92ZVRhc2siLCJ1cGRhdGUiLCJlZGl0VGFzayIsInRvZ2dsZUVkaXRUYXNrIiwic2VhcmNoIiwidHJpbSIsInRvTG93ZXJDYXNlIiwibGlzdHMiLCJmaWx0ZXIiLCJsaXN0IiwidGl0bGUiLCJpbmRleE9mIiwidGFzayIsImRlc2NyaXB0aW9uIiwic29ydEljb24iLCJpcyIsImRvbmUiLCJMaXN0VmlldyIsImdldFJvb3QiLCJmb2N1cyIsImxpc3RUYXNrcyIsImh0bWwiLCJsaXN0SXRlbSIsImlkIiwiZWFjaCIsIml0ZW0iLCIkbGlzdEl0ZW0iLCJNb2RlbCIsInN0b3JlIiwidGhlbiIsImxpc3RJZHMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicmVzIiwibWVyZ2UiLCJlcnIiLCJmaW5kT25lIiwiZm9ybSIsIkRhdGUiLCJub3ciLCJjcmVhdGVkIiwidG9TdHJpbmciLCJ0YXNrcyIsImVycm9yIiwiZ2V0TGlzdCIsImRlYWRsaW5lIiwidXBkYXRlZCIsImRlbGV0ZWQiLCJsaXN0VGl0bGUiLCJyZWR1Y2UiLCJ0YXNrRGF0YSIsIlN0b3JlIiwiZW5kcG9pbnQiLCJTVEFURV9SRUFEWSIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0aG9kIiwidXJsIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcSIsIlhNTEh0dHBSZXF1ZXN0Iiwic2V0UmVxdWVzdEhlYWRlciIsIm9ubG9hZCIsInN0YXR1cyIsInBhcnNlIiwicmVzcG9uc2UiLCJFcnJvciIsInN0YXR1c1RleHQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwib25lcnJvciIsIlRhc2tWaWV3IiwiZm9ybWF0IiwiY29udHJvbGxlciJdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFDQSxNQUFELEVBQVNDLENBQVQsS0FBZTtBQUNaOztBQUVBLFVBQU1DLEtBQU4sQ0FBWTtBQUNSQyxlQUFRQyxJQUFSLEVBQWM7QUFDVixnQkFBSUMsUUFBUUosRUFBRywyQkFBMEJHLEtBQUtFLElBQUwsR0FBWUYsS0FBS0UsSUFBakIsR0FBd0IsUUFBUzs7OzswQkFJNURGLEtBQUtHLElBQUwsR0FBWUgsS0FBS0csSUFBTCxHQUFZLEdBQXhCLEdBQThCLEVBQUc7a0JBQ3pDSCxLQUFLSSxPQUFRO21CQUxQLENBQVo7O0FBUUFQLGNBQUUsU0FBRixFQUFhUSxNQUFiLENBQW9CSixLQUFwQjs7QUFFQUssdUJBQVcsTUFBTUwsTUFBTU0sTUFBTixFQUFqQixFQUFpQyxJQUFqQztBQUNIO0FBYk87O0FBZ0JaWCxXQUFPWSxJQUFQLEdBQWNaLE9BQU9ZLElBQVAsSUFBZSxFQUE3QjtBQUNBWixXQUFPWSxJQUFQLENBQVlWLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0gsQ0FyQkQsRUFxQkdGLE1BckJILEVBcUJXYSxNQXJCWDtBQ0FBLENBQUViLE1BQUQsSUFBWTtBQUNUOztBQUVBLFVBQU1jLGNBQU4sQ0FBcUI7O0FBRWpCQyxzQkFBZTtBQUNYLGlCQUFLQyxNQUFMLEdBQWM7QUFDVkMsdUJB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ckwsTUEvREgsRUErRFdhLE1BL0RYLEVBK0RtQjZDLENBL0RuQjtBQ0FBLENBQUMsTUFBTTtBQUNIOztBQUVBLFVBQU02RSxRQUFRLElBQUkzSCxLQUFLbUosS0FBVCxFQUFkO0FBQUEsVUFDSW5HLFFBQVEsSUFBSWhELEtBQUswSCxLQUFULENBQWVDLEtBQWYsQ0FEWjtBQUFBLFVBRUkxRSxXQUFXLElBQUlqRCxLQUFLZ0gsUUFBVCxFQUZmO0FBQUEsVUFHSTlELFdBQVcsSUFBSWxELEtBQUt5SyxRQUFULEVBSGY7QUFBQSxVQUlJRSxhQUFhLElBQUkzSyxLQUFLK0MsVUFBVCxDQUFvQkMsS0FBcEIsRUFBMkJDLFFBQTNCLEVBQXFDQyxRQUFyQyxDQUpqQjtBQUtILENBUkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKCh3aW5kb3csICQpID0+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGNsYXNzIEFsZXJ0IHtcbiAgICAgICAgcmVuZGVyIChkYXRhKSB7XG4gICAgICAgICAgICBsZXQgYWxlcnQgPSAkKGA8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtJHtkYXRhLnR5cGUgPyBkYXRhLnR5cGUgOiAnZGFuZ2VyJ30gYWxlcnQtZGlzbWlzc2libGUgZmFkZSBzaG93XCIgcm9sZT1cImFsZXJ0XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGRhdGEtZGlzbWlzcz1cImFsZXJ0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPiZ0aW1lczs8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHN0cm9uZz4ke2RhdGEubmFtZSA/IGRhdGEubmFtZSArICc6JyA6ICcnfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICR7ZGF0YS5tZXNzYWdlfVxuICAgICAgICAgICAgPC9kaXY+YCk7XG5cbiAgICAgICAgICAgICQoJyNhbGVydHMnKS5hcHBlbmQoYWxlcnQpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0LnJlbW92ZSgpLCAzMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uQWxlcnQgPSBBbGVydDtcbn0pKHdpbmRvdywgalF1ZXJ5KTtcbiIsIigod2luZG93KSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBEYXRlVGltZVBpY2tlciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAgICAgdGhpcy5waWNrZXIgPSB7XG4gICAgICAgICAgICAgICAgJHJvb3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHt9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgcGlja2VyID0gdGhpcy5waWNrZXI7XG5cbiAgICAgICAgICAgICQoXCIjZGF0ZVRpbWVQaWNrZXJcIikuQW55UGlja2VyKHtcbiAgICAgICAgICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGlja2VyLiRyb290ID0gdGhpcztcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1vZGU6IFwiZGF0ZXRpbWVcIixcbiAgICAgICAgICAgICAgICB0aGVtZTogXCJpT1NcIixcbiAgICAgICAgICAgICAgICByb3dzTmF2aWdhdGlvbjogXCJzY3JvbGxlclwiLFxuICAgICAgICAgICAgICAgIG9uU2V0T3V0cHV0OiBmdW5jdGlvbiAoc091dHB1dCwgb0FyclNlbGVjdGVkVmFsdWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlci5jYWxsYmFjayhvQXJyU2VsZWN0ZWRWYWx1ZXMuZGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBvcGVuIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5waWNrZXIuJHJvb3Quc2hvd09ySGlkZVBpY2tlcigpO1xuICAgICAgICAgICAgdGhpcy5waWNrZXIuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uRGF0ZVRpbWVQaWNrZXIgPSBEYXRlVGltZVBpY2tlcjtcbn0pKHdpbmRvdyk7XG4iLCJjb25zdCBNZWRpYXRvciA9ICgoKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmVyczoge1xuICAgICAgICAgICAgYW55OiBbXSAvLyBldmVudCB0eXBlOiBzdWJzY3JpYmVyc1xuICAgICAgICB9LFxuXG4gICAgICAgIHN1YnNjcmliZSAoZm4sIHR5cGUgPSAnYW55Jykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnN1YnNjcmliZXJzW3R5cGVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1t0eXBlXSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzY3JpYmVyc1t0eXBlXS5wdXNoKGZuKTtcbiAgICAgICAgfSxcbiAgICAgICAgdW5zdWJzY3JpYmUgKGZuLCB0eXBlKSB7XG4gICAgICAgICAgICB0aGlzLnZpc2l0U3Vic2NyaWJlcnMoJ3Vuc3Vic2NyaWJlJywgZm4sIHR5cGUpO1xuICAgICAgICB9LFxuICAgICAgICBwdWJsaXNoIChwdWJsaWNhdGlvbiwgdHlwZSkge1xuICAgICAgICAgICAgdGhpcy52aXNpdFN1YnNjcmliZXJzKCdwdWJsaXNoJywgcHVibGljYXRpb24sIHR5cGUpO1xuICAgICAgICB9LFxuICAgICAgICB2aXNpdFN1YnNjcmliZXJzIChhY3Rpb24sIGFyZywgdHlwZSA9ICdhbnknKSB7XG4gICAgICAgICAgICBsZXQgc3Vic2NyaWJlcnMgPSB0aGlzLnN1YnNjcmliZXJzW3R5cGVdO1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1YnNjcmliZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3B1Ymxpc2gnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzW2ldKGFyZyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmliZXJzW2ldID09PSBhcmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuIiwiKCh3aW5kb3cpID0+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGNsYXNzIFNjcm9sbGVyIHtcblxuICAgICAgICBjb25zdHJ1Y3RvciAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlciAoKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyQ29udGFpbmVyLmZvckVhY2goc2Nyb2xsID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcHMgPSBuZXcgUGVyZmVjdFNjcm9sbGJhcihzY3JvbGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLlNjcm9sbGVyID0gU2Nyb2xsZXI7XG59KSh3aW5kb3cpOyIsIigod2luZG93LCAkKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBsZXQgU3Bpbm5lciA9IHNlbGVjdG9yID0+IHtcbiAgICAgICAgY29uc3QgJHJvb3QgPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgbGV0IHNob3cgPSBmYWxzZTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9nZ2xlICh0eXBlKSB7XG4gICAgICAgICAgICAgICAgKHR5cGUgPT09ICdzaG93JykgPyAkcm9vdC5zaG93KCkgOiAkcm9vdC5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uU3Bpbm5lciA9IFNwaW5uZXI7XG59KSh3aW5kb3csIGpRdWVyeSk7XG4iLCIoKHdpbmRvdywgJCwgXykgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY2xhc3MgQ29udHJvbGxlciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKG1vZGVsLCBsaXN0VmlldywgdGFza1ZpZXcpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXcgPSBsaXN0VmlldztcbiAgICAgICAgICAgIHRoaXMudGFza1ZpZXcgPSB0YXNrVmlldztcbiAgICAgICAgICAgIHRoaXMubGlzdEFjdGl2ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy5zcGlubmVyID0gdG9kby5TcGlubmVyKCcjc3Bpbm5lcicpO1xuICAgICAgICAgICAgdGhpcy5hbGVydCA9IG5ldyB0b2RvLkFsZXJ0KCk7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyID0gbmV3IHRvZG8uU2Nyb2xsZXIoJy5qcy1zY3JvbGxlcicpO1xuICAgICAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlciA9IG5ldyB0b2RvLkRhdGVUaW1lUGlja2VyKCk7XG5cbiAgICAgICAgICAgIC8vLy9cblxuICAgICAgICAgICAgTWVkaWF0b3Iuc3Vic2NyaWJlKHRoaXMubGlzdFZpZXcucmVuZGVyLCAnbGlzdCcpO1xuICAgICAgICAgICAgTWVkaWF0b3Iuc3Vic2NyaWJlKHRoaXMudGFza1ZpZXcucmVuZGVyLCAndGFzaycpO1xuICAgICAgICAgICAgTWVkaWF0b3Iuc3Vic2NyaWJlKHRoaXMubGlzdFZpZXcubGlzdEFjdGl2ZSwgJ2xpc3RBY3RpdmUnKTtcbiAgICAgICAgICAgIE1lZGlhdG9yLnN1YnNjcmliZSh0aGlzLnNwaW5uZXIudG9nZ2xlLCAnc3Bpbm5lcicpO1xuICAgICAgICAgICAgTWVkaWF0b3Iuc3Vic2NyaWJlKHRoaXMuYWxlcnQucmVuZGVyLCAnYWxlcnQnKTtcblxuICAgICAgICAgICAgLy8vL1xuXG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyLnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5maW5kQWxsKCk7XG4gICAgICAgICAgICB0aGlzLmJpbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpbmQgKCkge1xuICAgICAgICAgICAgdGhpcy5saXN0Vmlldy4kcm9vdC5vbignY2xpY2snLCAnYScsIHRoaXMuX2JpbmRMaXN0SXRlbUNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI2FkZE5ld0xpc3RGb3JtJykub24oJ3N1Ym1pdCcsIHRoaXMuX2JpbmROZXdMaXN0U3VibWl0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI2FkZE5ld1Rhc2tGb3JtJykub24oJ3N1Ym1pdCcsIHRoaXMuX2JpbmROZXdUYXNrU3VibWl0LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI3RvZG9UYXNrcycpLm9uKCdjbGljaycsIHRoaXMuX2JpbmRUYXNrSXRlbUNsaWNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI3NlYXJjaExpc3QnKS5vbigna2V5dXAnLCB0aGlzLl9iaW5kU2VhcmNoTGlzdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyNzZWFyY2hUYXNrJykub24oJ2tleXVwJywgdGhpcy5fYmluZFNlYXJjaFRhc2suYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKCcjc29ydEJ5RG9uZScpLm9uKCdjbGljaycsIHRoaXMuX2JpbmRTb3J0QnlEb25lLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmRMaXN0SXRlbUNsaWNrIChlKSB7XG4gICAgICAgICAgICBsZXQgJGVsbSA9ICQoZS5jdXJyZW50VGFyZ2V0KSxcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJGVsbS5jbG9zZXN0KCcuanMtbGlzdC1wYXJlbnQnKSxcbiAgICAgICAgICAgICAgICBsaXN0SWQgPSAkcGFyZW50LmRhdGEoJ2xpc3RJZCcpIHx8ICcnO1xuXG4gICAgICAgICAgICBpZiAoJGVsbS5oYXNDbGFzcygnanMtc2V0JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RBY3RpdmUgPSBsaXN0SWQ7XG4gICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaCh0aGlzLm1vZGVsLmdldFRhc2tzKHBhcnNlSW50KHRoaXMubGlzdEFjdGl2ZSkpLCAndGFzaycpO1xuICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2godGhpcy5saXN0QWN0aXZlLCAnbGlzdEFjdGl2ZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkZWxtLmhhc0NsYXNzKCdqcy1lZGl0JykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZGl0TGlzdChsaXN0SWQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkZWxtLmhhc0NsYXNzKCdqcy1yZW1vdmUnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucmVtb3ZlKGxpc3RJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfZWRpdExpc3QgKGxpc3RJZCkge1xuICAgICAgICAgICAgbGV0IGVkaXRMaXN0ID0gdGhpcy5saXN0Vmlldy4kcm9vdC5maW5kKGAjZWRpdExpc3Qke2xpc3RJZH1gKTtcblxuICAgICAgICAgICAgZWRpdExpc3QuYWRkQ2xhc3MoJ29wZW5Gb3JtJyk7XG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3LnRvZ2dsZUVkaXRMaXN0KGVkaXRMaXN0KTtcblxuICAgICAgICAgICAgZWRpdExpc3Qub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlZGl0TGlzdC5vZmYoJ3N1Ym1pdCcpO1xuXG4gICAgICAgICAgICAgICAgZWRpdExpc3QucmVtb3ZlQ2xhc3MoJ29wZW5Gb3JtJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0Vmlldy50b2dnbGVFZGl0TGlzdChlZGl0TGlzdCk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVMaXN0KGxpc3RJZCwgZS50YXJnZXQuZWxlbWVudHNbMF0udmFsdWUpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVkaXRMaXN0Lm9uKCdmb2N1c291dCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGVkaXRMaXN0LnJlbW92ZUNsYXNzKCdvcGVuRm9ybScpO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXcudG9nZ2xlRWRpdExpc3QoZWRpdExpc3QpO1xuICAgICAgICAgICAgICAgIGVkaXRMaXN0Lm9mZignZm9jdXNvdXQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmROZXdMaXN0U3VibWl0IChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLmNyZWF0ZShlLnRhcmdldCk7XG4gICAgICAgICAgICAkKCcjbmV3VG9Eb0xpc3QnKS52YWwoXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBfYmluZFRhc2tJdGVtQ2xpY2sgKGUpIHtcbiAgICAgICAgICAgIGxldCAkZWxtID0gJChlLnRhcmdldCksXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICRlbG0uY2xvc2VzdCgnLmpzLXRhc2stcGFyZW50JyksXG4gICAgICAgICAgICAgICAgdGFza0lkID0gJHBhcmVudC5kYXRhKCd0YXNrSWQnKTtcblxuICAgICAgICAgICAgaWYgKCRlbG0uaGFzQ2xhc3MoJ2pzLWRhdGV0aW1lJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGVUaW1lUGlja2VyLm9wZW4oKGRhdGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVUYXNrKHRoaXMubGlzdEFjdGl2ZSwgdGFza0lkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZDogJ2RlYWRsaW5lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBtb21lbnQoZGF0ZSkudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkZWxtLmhhc0NsYXNzKCdqcy1kb25lJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnVwZGF0ZVRhc2sodGhpcy5saXN0QWN0aXZlLCB0YXNrSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICdkb25lJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICEkZWxtLmZpbmQoJ2lucHV0JykucHJvcCgnY2hlY2tlZCcpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1lZGl0JykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdFRhc2sodGFza0lkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJChlLnRhcmdldCkuY2xvc2VzdCgnLmpzLXJlbW92ZScpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwucmVtb3ZlVGFzayh0aGlzLmxpc3RBY3RpdmUsIHRhc2tJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfYmluZE5ld1Rhc2tTdWJtaXQgKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwudXBkYXRlKGUudGFyZ2V0LCB0aGlzLmxpc3RBY3RpdmUpO1xuICAgICAgICAgICAgJCgnI25ld1RvRG9UYXNrJykudmFsKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2VkaXRUYXNrICh0YXNrSWQpIHtcbiAgICAgICAgICAgIGxldCBlZGl0VGFzayA9ICQoYCNlZGl0VGFzayR7dGFza0lkfWApO1xuXG4gICAgICAgICAgICBlZGl0VGFzay5hZGRDbGFzcygnb3BlbkZvcm0nKTtcbiAgICAgICAgICAgIHRoaXMudGFza1ZpZXcudG9nZ2xlRWRpdFRhc2soZWRpdFRhc2spO1xuXG4gICAgICAgICAgICBlZGl0VGFzay5vbignc3VibWl0JywgZSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVkaXRUYXNrLm9mZignc3VibWl0Jyk7XG5cbiAgICAgICAgICAgICAgICBlZGl0VGFzay5yZW1vdmVDbGFzcygnb3BlbkZvcm0nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tWaWV3LnRvZ2dsZUVkaXRUYXNrKGVkaXRUYXNrKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnVwZGF0ZVRhc2sodGhpcy5saXN0QWN0aXZlLCB0YXNrSWQsIHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBlLnRhcmdldC5lbGVtZW50c1swXS52YWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVkaXRUYXNrLm9uKCdmb2N1c291dCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGVkaXRUYXNrLnJlbW92ZUNsYXNzKCdvcGVuRm9ybScpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFza1ZpZXcudG9nZ2xlRWRpdFRhc2soZWRpdFRhc2spO1xuICAgICAgICAgICAgICAgIGVkaXRUYXNrLm9mZignZm9jdXNvdXQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmRTZWFyY2hMaXN0IChlKSB7XG4gICAgICAgICAgICBsZXQgc2VhcmNoID0gXy50cmltKGUudGFyZ2V0LnZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICBpZiAoc2VhcmNoLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmxpc3RzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3QgPT4gbGlzdC50aXRsZS50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3QnXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaCh0aGlzLm1vZGVsLmxpc3RzLCAnbGlzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmRTZWFyY2hUYXNrIChlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0QWN0aXZlKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgc2VhcmNoID0gXy50cmltKGUudGFyZ2V0LnZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2goXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmdldFRhc2tzKHRoaXMubGlzdEFjdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXNrID0+IHRhc2suZGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICd0YXNrJ1xuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2godGhpcy5tb2RlbC5nZXRUYXNrcyh0aGlzLmxpc3RBY3RpdmUpLCAndGFzaycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF9iaW5kU29ydEJ5RG9uZSAoZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdEFjdGl2ZSkge1xuICAgICAgICAgICAgICAgIGxldCBzb3J0SWNvbiA9ICQoJyNzb3J0QnlEb25lSWNvbicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNvcnRJY29uLmlzKCc6dmlzaWJsZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRJY29uLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaCh0aGlzLm1vZGVsLmdldFRhc2tzKHRoaXMubGlzdEFjdGl2ZSksICd0YXNrJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0SWNvbi5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2goXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLmdldFRhc2tzKHRoaXMubGlzdEFjdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHRhc2sgPT4gdGFzay5kb25lID09PSBmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFzaydcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLkNvbnRyb2xsZXIgPSBDb250cm9sbGVyO1xufSkod2luZG93LCBqUXVlcnksIF8pO1xuIiwiKCh3aW5kb3csICQsIF8pID0+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGNsYXNzIExpc3RWaWV3IHtcblxuICAgICAgICBzdGF0aWMgZ2V0Um9vdCAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJChcIiN0b2RvTGlzdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIHRoaXMuJHJvb3QgPSBMaXN0Vmlldy5nZXRSb290KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0b2dnbGVFZGl0TGlzdCAobGlzdCkge1xuICAgICAgICAgICAgaWYgKGxpc3QuaGFzQ2xhc3MoJ29wZW5Gb3JtJykpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmZpbmQoJ2lucHV0JykucHJvcCgndHlwZScsICd0ZXh0JykuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBsaXN0LmZpbmQoJ3NwYW4nKS5oaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3QuZmluZCgnaW5wdXQnKS5wcm9wKCd0eXBlJywgJ2hpZGRlbicpO1xuICAgICAgICAgICAgICAgIGxpc3QuZmluZCgnc3BhbicpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlbmRlciAobGlzdFRhc2tzKSB7XG5cbiAgICAgICAgICAgIGxldCAkcm9vdCA9IExpc3RWaWV3LmdldFJvb3QoKTtcbiAgICAgICAgICAgICRyb290Lmh0bWwoJycpO1xuXG4gICAgICAgICAgICBfLmZvckVhY2gobGlzdFRhc2tzLCBsaXN0SXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgJHJvb3QuYXBwZW5kKGA8bGkgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0ganMtbGlzdC1wYXJlbnRcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgZGF0YS1saXN0LWlkPVwiJHtsaXN0SXRlbS5pZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJlZGl0TGlzdCR7bGlzdEl0ZW0uaWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PGEgY2xhc3M9XCJqcy1zZXRcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+JHtsaXN0SXRlbS50aXRsZX08L2E+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwibGlzdHNbJHtsaXN0SXRlbS5pZH1dXCIgdmFsdWU9XCIke2xpc3RJdGVtLnRpdGxlfVwiPiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJqcy1lZGl0XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxzcGFuIGNsYXNzPVwiZHJpcGljb25zLXBlbmNpbFwiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJqcy1yZW1vdmVcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PHNwYW4gY2xhc3M9XCJkcmlwaWNvbnMtY3Jvc3NcIj48L3NwYW4+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2xpPmApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0QWN0aXZlIChsaXN0SWQpIHtcbiAgICAgICAgICAgIExpc3RWaWV3LmdldFJvb3QoKS5maW5kKCdbZGF0YS1saXN0LWlkXScpLmVhY2goKGksIGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgJGxpc3RJdGVtID0gJChpdGVtKTtcbiAgICAgICAgICAgICAgICAkbGlzdEl0ZW0ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KCRsaXN0SXRlbS5kYXRhKCdsaXN0SWQnKSkgPT09IGxpc3RJZCkge1xuICAgICAgICAgICAgICAgICAgICAkbGlzdEl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvZG8gPSB3aW5kb3cudG9kbyB8fCB7fTtcbiAgICB3aW5kb3cudG9kby5MaXN0VmlldyA9IExpc3RWaWV3O1xufSkod2luZG93LCBqUXVlcnksIF8pO1xuIiwiKCh3aW5kb3csIF8pID0+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGNsYXNzIE1vZGVsIHtcbiAgICAgICAgY29uc3RydWN0b3IgKHN0b3JlKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlID0gc3RvcmU7XG4gICAgICAgICAgICB0aGlzLmxpc3RzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBmaW5kQWxsICgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZmluZCgpLnRoZW4oXG4gICAgICAgICAgICAgICAgbGlzdElkcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChsaXN0SWRzLm1hcChsaXN0SWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmUuZmluZChsaXN0SWQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXy5tZXJnZShyZXMsIHtpZDogbGlzdElkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApLnRoZW4obGlzdHMgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdHMgPSBsaXN0cztcbiAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKHRoaXMubGlzdHMsICdsaXN0Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbmRPbmUgKGxpc3RJZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5maW5kKGxpc3RJZCkudGhlbihcbiAgICAgICAgICAgICAgICByZXMgPT4gTWVkaWF0b3IucHVibGlzaChyZXMsICd0YXNrJyksXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlIChmb3JtKSB7XG4gICAgICAgICAgICBsZXQgbGlzdElkID0gRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZm9ybS5lbGVtZW50c1swXS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlZDogbmV3IERhdGUoKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0YXNrczogW11cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlLmNyZWF0ZShsaXN0SWQsIGRhdGEpLnRoZW4oXG4gICAgICAgICAgICAgICAgcmVzID0+IHJlcy5jcmVhdGVkID8gdGhpcy5maW5kQWxsKCkgOiBNZWRpYXRvci5wdWJsaXNoKHJlcy5lcnJvciwgJ2FsZXJ0JyksXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlIChmb3JtLCBsaXN0SWQgPSAwKSB7XG5cbiAgICAgICAgICAgIGxldCBsaXN0ID0gdGhpcy5nZXRMaXN0KGxpc3RJZCk7XG5cbiAgICAgICAgICAgIGxpc3QudGFza3MucHVzaCh7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGZvcm0uZWxlbWVudHNbMF0udmFsdWUsXG4gICAgICAgICAgICAgICAgZG9uZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZGVhZGxpbmU6IERhdGUubm93KClcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShsaXN0SWQsIGxpc3QpLnRoZW4oXG4gICAgICAgICAgICAgICAgcmVzID0+IHJlcy51cGRhdGVkID8gTWVkaWF0b3IucHVibGlzaChsaXN0LnRhc2tzLCAndGFzaycpIDogTWVkaWF0b3IucHVibGlzaChyZXMuZXJyb3IsICdhbGVydCcpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlbW92ZSAobGlzdElkKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLnJlbW92ZShsaXN0SWQpLnRoZW4oXG4gICAgICAgICAgICAgICAgcmVzID0+IHJlcy5kZWxldGVkID8gdGhpcy5maW5kQWxsKCkgOiBNZWRpYXRvci5wdWJsaXNoKHJlcy5lcnJvciwgJ2FsZXJ0JyksXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2V0TGlzdCAobGlzdElkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PSBsaXN0SWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlTGlzdCAobGlzdElkID0gMCwgbGlzdFRpdGxlKSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0TGlzdChsaXN0SWQpO1xuICAgICAgICAgICAgbGlzdC50aXRsZSA9IGxpc3RUaXRsZTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUobGlzdElkLCBsaXN0KS50aGVuKFxuICAgICAgICAgICAgICAgIHJlcyA9PiByZXMudXBkYXRlZCA/IHRoaXMuZmluZEFsbCgpIDogTWVkaWF0b3IucHVibGlzaChyZXMuZXJyb3IsICdhbGVydCcpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldFRhc2tzIChsaXN0SWQgPSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5saXN0cy5yZWR1Y2UoKHRhc2tzLCBsaXN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3QuaWQgPT0gbGlzdElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnRhc2tzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFza3M7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVUYXNrIChsaXN0SWQsIHRhc2tJZCwgdGFza0RhdGEpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gdGhpcy5saXN0cy5maW5kKCBsaXN0ID0+IGxpc3QuaWQgPT0gbGlzdElkKTtcbiAgICAgICAgICAgIGxpc3QudGFza3NbdGFza0lkXVt0YXNrRGF0YS5maWVsZF0gPSB0YXNrRGF0YS52YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUobGlzdElkLCBsaXN0KS50aGVuKFxuICAgICAgICAgICAgICAgIHJlcyA9PiByZXMudXBkYXRlZCA/IE1lZGlhdG9yLnB1Ymxpc2gobGlzdC50YXNrcywgJ3Rhc2snKSA6IE1lZGlhdG9yLnB1Ymxpc2gocmVzLmVycm9yLCAnYWxlcnQnKSxcbiAgICAgICAgICAgICAgICBlcnIgPT4gTWVkaWF0b3IucHVibGlzaCh7bWVzc2FnZTogZXJyfSwgJ2FsZXJ0JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVUYXNrIChsaXN0SWQsIHRhc2tJZCkge1xuICAgICAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmdldExpc3QobGlzdElkKTtcbiAgICAgICAgICAgIGxpc3QudGFza3Muc3BsaWNlKHRhc2tJZCwgMSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGxpc3RJZCwgbGlzdCkudGhlbihcbiAgICAgICAgICAgICAgICByZXMgPT4gcmVzLnVwZGF0ZWQgPyBNZWRpYXRvci5wdWJsaXNoKGxpc3QudGFza3MsICd0YXNrJykgOiBNZWRpYXRvci5wdWJsaXNoKHJlcy5lcnJvciwgJ2FsZXJ0JyksXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvZG8gPSB3aW5kb3cudG9kbyB8fCB7fTtcbiAgICB3aW5kb3cudG9kby5Nb2RlbCA9IE1vZGVsO1xufSkod2luZG93LCBfKTtcbiIsIigod2luZG93KSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBTdG9yZSB7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAgICAgdGhpcy5lbmRwb2ludCA9ICdodHRwczovL2VuaWdtYXRpYy10ZW1wbGUtNjc4MzguaGVyb2t1YXBwLmNvbS90b2RvJztcbiAgICAgICAgICAgIHRoaXMuU1RBVEVfUkVBRFkgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgZmluZCAobGlzdElkID0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VuZChsaXN0SWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY3JlYXRlIChsaXN0SWQgPSAwLCBkYXRhID0ge30pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmQobGlzdElkLCAnUE9TVCcsIHt0b2RvOiBKU09OLnN0cmluZ2lmeShkYXRhKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlIChsaXN0SWQgPSAwLCBkYXRhID0ge30pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmQobGlzdElkLCAnUFVUJywge3RvZG86IEpTT04uc3RyaW5naWZ5KGRhdGEpfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmUgKGxpc3RJZCA9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmQobGlzdElkLCAnREVMRVRFJyk7XG4gICAgICAgIH1cblxuICAgICAgICBzZW5kIChsaXN0SWQsIG1ldGhvZCA9ICdHRVQnLCBkYXRhID0ge30pIHtcblxuICAgICAgICAgICAgY29uc3QgdXJsID0gYCR7dGhpcy5lbmRwb2ludH0vJHtsaXN0SWQgPT09IDAgPyAnJyA6IGxpc3RJZH1gO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaCgnc2hvdycsICdzcGlubmVyJyk7XG5cbiAgICAgICAgICAgICAgICByZXEub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgLy8gcmVxLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04XCIpO1xuICAgICAgICAgICAgICAgIHJlcS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXEuc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChFcnJvcihyZXEuc3RhdHVzVGV4dCkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnJlYWR5U3RhdGUgPT09IHRoaXMuU1RBVEVfUkVBRFkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2goJ2hpZGUnLCAnc3Bpbm5lcicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChFcnJvcihcIk5ldHdvcmsgZXJyb3JcIikpO1xuICAgICAgICAgICAgICAgIHJlcS5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvZG8gPSB3aW5kb3cudG9kbyB8fCB7fTtcbiAgICB3aW5kb3cudG9kby5TdG9yZSA9IFN0b3JlO1xufSkod2luZG93KTtcbiIsIigod2luZG93LCAkLCBfKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBUYXNrVmlldyB7XG5cbiAgICAgICAgc3RhdGljIGdldFJvb3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuICQoXCIjdG9kb1Rhc2tzXCIpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgICAgICB0aGlzLiRyb290ID0gVGFza1ZpZXcuZ2V0Um9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlRWRpdFRhc2sgKHRhc2spIHtcbiAgICAgICAgICAgIGlmICh0YXNrLmhhc0NsYXNzKCdvcGVuRm9ybScpKSB7XG4gICAgICAgICAgICAgICAgdGFzay5maW5kKCdpbnB1dCcpLnByb3AoJ3R5cGUnLCAndGV4dCcpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgdGFzay5maW5kKCdzcGFuJykuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXNrLmZpbmQoJ2lucHV0JykucHJvcCgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0YXNrLmZpbmQoJ3NwYW4nKS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIgKHRhc2tzKSB7XG4gICAgICAgICAgICBsZXQgJHJvb3QgPSBUYXNrVmlldy5nZXRSb290KCk7XG5cbiAgICAgICAgICAgICRyb290Lmh0bWwoJycpO1xuXG4gICAgICAgICAgICBpZiAodGFza3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgJHJvb3QuYXBwZW5kKGA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cInRleHQtY2VudGVyXCIgY29sc3Bhbj1cIjNcIj5ObyBUYXNrcyE8L3RkPlxuICAgICAgICAgICAgICAgIDwvdHI+YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy5mb3JFYWNoKHRhc2tzLCAodGFzaywgdGFza0lkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICRyb290LmFwcGVuZChgPHRyIGNsYXNzPVwianMtdGFzay1wYXJlbnRcIiBkYXRhLXRhc2staWQ9XCIke3Rhc2tJZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwIGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Zm9ybSBpZD1cImVkaXRUYXNrJHt0YXNrSWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3Rhc2suZGVzY3JpcHRpb259PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJ0YXNrc1ske3Rhc2tJZH1dXCIgdmFsdWU9XCIke3Rhc2suZGVzY3JpcHRpb259XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImpzLWVkaXRcIiBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+PHNwYW4gY2xhc3M9XCJkcmlwaWNvbnMtcGVuY2lsXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwianMtcmVtb3ZlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxzcGFuIGNsYXNzPVwiZHJpcGljb25zLWNyb3NzXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzcz1cImpzLWRhdGV0aW1lXCIgZGF0YS10aW1lc3RhbXA9XCIke3Rhc2suZGVhZGxpbmV9XCI+JHt0YXNrLmRlYWRsaW5lID8gbW9tZW50KHRhc2suZGVhZGxpbmUpLmZvcm1hdCgnREQuTU0uWVlZWSBISDptbScpIDogJy0tLSd9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJqcy1kb25lIGN1c3RvbS1jb250cm9sIGN1c3RvbS1jaGVja2JveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbnB1dFwiICR7dGFzay5kb25lID8gJ2NoZWNrZWQnIDogJyd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImN1c3RvbS1jb250cm9sLWluZGljYXRvclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5gKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uVGFza1ZpZXcgPSBUYXNrVmlldztcbn0pKHdpbmRvdywgalF1ZXJ5LCBfKTtcbiIsIigoKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjb25zdCBzdG9yZSA9IG5ldyB0b2RvLlN0b3JlKCksXG4gICAgICAgIG1vZGVsID0gbmV3IHRvZG8uTW9kZWwoc3RvcmUpLFxuICAgICAgICBsaXN0VmlldyA9IG5ldyB0b2RvLkxpc3RWaWV3KCksXG4gICAgICAgIHRhc2tWaWV3ID0gbmV3IHRvZG8uVGFza1ZpZXcoKSxcbiAgICAgICAgY29udHJvbGxlciA9IG5ldyB0b2RvLkNvbnRyb2xsZXIobW9kZWwsIGxpc3RWaWV3LCB0YXNrVmlldyk7XG59KSgpO1xuIl19
