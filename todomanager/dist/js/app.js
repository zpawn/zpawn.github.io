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
                req.withCredentials = true;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFsZXJ0LmpzIiwiRGF0ZVRpbWVQaWNrZXIuanMiLCJNZWRpYXRvci5qcyIsIlNjcm9sbGVyLmpzIiwiU3Bpbm5lci5qcyIsIkNvbnRyb2xsZXIuY2xhc3MuanMiLCJMaXN0Vmlldy5jbGFzcy5qcyIsIk1vZGVsLmNsYXNzLmpzIiwiU3RvcmUuY2xhc3MuanMiLCJUYXNrVmlldy5jbGFzcy5qcyIsImFwcC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCIkIiwiQWxlcnQiLCJyZW5kZXIiLCJkYXRhIiwiYWxlcnQiLCJ0eXBlIiwibmFtZSIsIm1lc3NhZ2UiLCJhcHBlbmQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwidG9kbyIsImpRdWVyeSIsIkRhdGVUaW1lUGlja2VyIiwiY29uc3RydWN0b3IiLCJwaWNrZXIiLCIkcm9vdCIsImNhbGxiYWNrIiwiQW55UGlja2VyIiwib25Jbml0IiwibW9kZSIsInRoZW1lIiwicm93c05hdmlnYXRpb24iLCJvblNldE91dHB1dCIsInNPdXRwdXQiLCJvQXJyU2VsZWN0ZWRWYWx1ZXMiLCJkYXRlIiwib3BlbiIsInNob3dPckhpZGVQaWNrZXIiLCJNZWRpYXRvciIsInN1YnNjcmliZXJzIiwiYW55Iiwic3Vic2NyaWJlIiwiZm4iLCJwdXNoIiwidW5zdWJzY3JpYmUiLCJ2aXNpdFN1YnNjcmliZXJzIiwicHVibGlzaCIsInB1YmxpY2F0aW9uIiwiYWN0aW9uIiwiYXJnIiwiaSIsImxlbmd0aCIsInNwbGljZSIsIlNjcm9sbGVyIiwic2VsZWN0b3IiLCJzY3JvbGxlckNvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJzY3JvbGwiLCJwcyIsIlBlcmZlY3RTY3JvbGxiYXIiLCJTcGlubmVyIiwic2hvdyIsInRvZ2dsZSIsImhpZGUiLCJfIiwiQ29udHJvbGxlciIsIm1vZGVsIiwibGlzdFZpZXciLCJ0YXNrVmlldyIsImxpc3RBY3RpdmUiLCJzcGlubmVyIiwic2Nyb2xsZXIiLCJkYXRlVGltZVBpY2tlciIsImZpbmRBbGwiLCJiaW5kIiwib24iLCJfYmluZExpc3RJdGVtQ2xpY2siLCJfYmluZE5ld0xpc3RTdWJtaXQiLCJfYmluZE5ld1Rhc2tTdWJtaXQiLCJfYmluZFRhc2tJdGVtQ2xpY2siLCJfYmluZFNlYXJjaExpc3QiLCJfYmluZFNlYXJjaFRhc2siLCJfYmluZFNvcnRCeURvbmUiLCJlIiwiJGVsbSIsImN1cnJlbnRUYXJnZXQiLCIkcGFyZW50IiwiY2xvc2VzdCIsImxpc3RJZCIsImhhc0NsYXNzIiwiZ2V0VGFza3MiLCJwYXJzZUludCIsIl9lZGl0TGlzdCIsImVkaXRMaXN0IiwiZmluZCIsImFkZENsYXNzIiwidG9nZ2xlRWRpdExpc3QiLCJwcmV2ZW50RGVmYXVsdCIsIm9mZiIsInJlbW92ZUNsYXNzIiwidXBkYXRlTGlzdCIsInRhcmdldCIsImVsZW1lbnRzIiwidmFsdWUiLCJjcmVhdGUiLCJ2YWwiLCJ0YXNrSWQiLCJ1cGRhdGVUYXNrIiwiZmllbGQiLCJtb21lbnQiLCJ2YWx1ZU9mIiwicHJvcCIsIl9lZGl0VGFzayIsInJlbW92ZVRhc2siLCJ1cGRhdGUiLCJlZGl0VGFzayIsInRvZ2dsZUVkaXRUYXNrIiwic2VhcmNoIiwidHJpbSIsInRvTG93ZXJDYXNlIiwibGlzdHMiLCJmaWx0ZXIiLCJsaXN0IiwidGl0bGUiLCJpbmRleE9mIiwidGFzayIsImRlc2NyaXB0aW9uIiwic29ydEljb24iLCJpcyIsImRvbmUiLCJMaXN0VmlldyIsImdldFJvb3QiLCJmb2N1cyIsImxpc3RUYXNrcyIsImh0bWwiLCJsaXN0SXRlbSIsImlkIiwiZWFjaCIsIml0ZW0iLCIkbGlzdEl0ZW0iLCJNb2RlbCIsInN0b3JlIiwidGhlbiIsImxpc3RJZHMiLCJQcm9taXNlIiwiYWxsIiwibWFwIiwicmVzIiwibWVyZ2UiLCJlcnIiLCJmaW5kT25lIiwiZm9ybSIsIkRhdGUiLCJub3ciLCJjcmVhdGVkIiwidG9TdHJpbmciLCJ0YXNrcyIsImVycm9yIiwiZ2V0TGlzdCIsImRlYWRsaW5lIiwidXBkYXRlZCIsImRlbGV0ZWQiLCJsaXN0VGl0bGUiLCJyZWR1Y2UiLCJ0YXNrRGF0YSIsIlN0b3JlIiwiZW5kcG9pbnQiLCJTVEFURV9SRUFEWSIsInNlbmQiLCJKU09OIiwic3RyaW5naWZ5IiwibWV0aG9kIiwidXJsIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcSIsIlhNTEh0dHBSZXF1ZXN0Iiwid2l0aENyZWRlbnRpYWxzIiwic2V0UmVxdWVzdEhlYWRlciIsIm9ubG9hZCIsInN0YXR1cyIsInBhcnNlIiwicmVzcG9uc2UiLCJFcnJvciIsInN0YXR1c1RleHQiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwib25lcnJvciIsIlRhc2tWaWV3IiwiZm9ybWF0IiwiY29udHJvbGxlciJdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQyxDQUFDQSxNQUFELEVBQVNDLENBQVQsS0FBZTtBQUNaOztBQUVBLFVBQU1DLEtBQU4sQ0FBWTtBQUNSQyxlQUFRQyxJQUFSLEVBQWM7QUFDVixnQkFBSUMsUUFBUUosRUFBRywyQkFBMEJHLEtBQUtFLElBQUwsR0FBWUYsS0FBS0UsSUFBakIsR0FBd0IsUUFBUzs7OzswQkFJNURGLEtBQUtHLElBQUwsR0FBWUgsS0FBS0csSUFBTCxHQUFZLEdBQXhCLEdBQThCLEVBQUc7a0JBQ3pDSCxLQUFLSSxPQUFRO21CQUxQLENBQVo7O0FBUUFQLGNBQUUsU0FBRixFQUFhUSxNQUFiLENBQW9CSixLQUFwQjs7QUFFQUssdUJBQVcsTUFBTUwsTUFBTU0sTUFBTixFQUFqQixFQUFpQyxJQUFqQztBQUNIO0FBYk87O0FBZ0JaWCxXQUFPWSxJQUFQLEdBQWNaLE9BQU9ZLElBQVAsSUFBZSxFQUE3QjtBQUNBWixXQUFPWSxJQUFQLENBQVlWLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0gsQ0FyQkQsRUFxQkdGLE1BckJILEVBcUJXYSxNQXJCWDtBQ0FBLENBQUViLE1BQUQsSUFBWTtBQUNUOztBQUVBLFVBQU1jLGNBQU4sQ0FBcUI7O0FBRWpCQyxzQkFBZTtBQUNYLGlCQUFLQyxNQUFMLEdBQWM7QUFDVkMsdUJBQU8sSUFERztBQUVWQywwQkFBVTtBQUZBLGFBQWQ7O0FBS0EsZ0JBQUlGLFNBQVMsS0FBS0EsTUFBbEI7O0FBRUFmLGNBQUUsaUJBQUYsRUFBcUJrQixTQUFyQixDQUErQjtBQUMzQkMsd0JBQVEsWUFBWTtBQUNoQkosMkJBQU9DLEtBQVAsR0FBZSxJQUFmO0FBQ0gsaUJBSDBCO0FBSTNCSSxzQkFBTSxVQUpxQjtBQUszQkMsdUJBQU8sS0FMb0I7QUFNM0JDLGdDQUFnQixVQU5XO0FBTzNCQyw2QkFBYSxVQUFVQyxPQUFWLEVBQW1CQyxrQkFBbkIsRUFBdUM7QUFDaERWLDJCQUFPRSxRQUFQLENBQWdCUSxtQkFBbUJDLElBQW5DO0FBQ0g7QUFUMEIsYUFBL0I7QUFXSDs7QUFFREMsYUFBTVYsUUFBTixFQUFnQjtBQUNaLGlCQUFLRixNQUFMLENBQVlDLEtBQVosQ0FBa0JZLGdCQUFsQjtBQUNBLGlCQUFLYixNQUFMLENBQVlFLFFBQVosR0FBdUJBLFFBQXZCO0FBQ0g7QUExQmdCOztBQTZCckJsQixXQUFPWSxJQUFQLEdBQWNaLE9BQU9ZLElBQVAsSUFBZSxFQUE3QjtBQUNBWixXQUFPWSxJQUFQLENBQVlFLGNBQVosR0FBNkJBLGNBQTdCO0FBQ0gsQ0FsQ0QsRUFrQ0dkLE1BbENIO0FDQUEsTUFBTThCLFdBQVcsQ0FBQyxNQUFNO0FBQ3BCOztBQUVBLFdBQU87QUFDSEMscUJBQWE7QUFDVEMsaUJBQUssRUFESSxDQUNEO0FBREMsU0FEVjs7QUFLSEMsa0JBQVdDLEVBQVgsRUFBZTVCLE9BQU8sS0FBdEIsRUFBNkI7QUFDekIsZ0JBQUksT0FBTyxLQUFLeUIsV0FBTCxDQUFpQnpCLElBQWpCLENBQVAsS0FBa0MsV0FBdEMsRUFBbUQ7QUFDL0MscUJBQUt5QixXQUFMLENBQWlCekIsSUFBakIsSUFBeUIsRUFBekI7QUFDSDtBQUNELGlCQUFLeUIsV0FBTCxDQUFpQnpCLElBQWpCLEVBQXVCNkIsSUFBdkIsQ0FBNEJELEVBQTVCO0FBQ0gsU0FWRTtBQVdIRSxvQkFBYUYsRUFBYixFQUFpQjVCLElBQWpCLEVBQXVCO0FBQ25CLGlCQUFLK0IsZ0JBQUwsQ0FBc0IsYUFBdEIsRUFBcUNILEVBQXJDLEVBQXlDNUIsSUFBekM7QUFDSCxTQWJFO0FBY0hnQyxnQkFBU0MsV0FBVCxFQUFzQmpDLElBQXRCLEVBQTRCO0FBQ3hCLGlCQUFLK0IsZ0JBQUwsQ0FBc0IsU0FBdEIsRUFBaUNFLFdBQWpDLEVBQThDakMsSUFBOUM7QUFDSCxTQWhCRTtBQWlCSCtCLHlCQUFrQkcsTUFBbEIsRUFBMEJDLEdBQTFCLEVBQStCbkMsT0FBTyxLQUF0QyxFQUE2QztBQUN6QyxnQkFBSXlCLGNBQWMsS0FBS0EsV0FBTCxDQUFpQnpCLElBQWpCLENBQWxCOztBQUVBLGlCQUFLLElBQUlvQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlYLFlBQVlZLE1BQWhDLEVBQXdDRCxLQUFLLENBQTdDLEVBQWdEO0FBQzVDLG9CQUFJRixXQUFXLFNBQWYsRUFBMEI7QUFDdEJULGdDQUFZVyxDQUFaLEVBQWVELEdBQWY7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQUlWLFlBQVlXLENBQVosTUFBbUJELEdBQXZCLEVBQTRCO0FBQ3hCVixvQ0FBWWEsTUFBWixDQUFtQkYsQ0FBbkIsRUFBc0IsQ0FBdEI7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQTdCRSxLQUFQO0FBK0JILENBbENnQixHQUFqQjtBQ0FBLENBQUUxQyxNQUFELElBQVk7QUFDVDs7QUFFQSxVQUFNNkMsUUFBTixDQUFlOztBQUVYOUIsb0JBQWErQixRQUFiLEVBQXVCO0FBQ25CLGlCQUFLQyxpQkFBTCxHQUF5QkMsU0FBU0MsZ0JBQVQsQ0FBMEJILFFBQTFCLENBQXpCO0FBQ0g7O0FBRUQzQyxpQkFBVTtBQUNOLGlCQUFLNEMsaUJBQUwsQ0FBdUJHLE9BQXZCLENBQStCQyxVQUFVO0FBQ3JDLG9CQUFJQyxLQUFLLElBQUlDLGdCQUFKLENBQXFCRixNQUFyQixDQUFUO0FBQ0gsYUFGRDtBQUdIO0FBVlU7O0FBYWZuRCxXQUFPWSxJQUFQLEdBQWNaLE9BQU9ZLElBQVAsSUFBZSxFQUE3QjtBQUNBWixXQUFPWSxJQUFQLENBQVlpQyxRQUFaLEdBQXVCQSxRQUF2QjtBQUNILENBbEJELEVBa0JHN0MsTUFsQkg7QUNBQSxDQUFDLENBQUNBLE1BQUQsRUFBU0MsQ0FBVCxLQUFlO0FBQ1o7O0FBRUEsUUFBSXFELFVBQVVSLFlBQVk7QUFDdEIsY0FBTTdCLFFBQVFoQixFQUFFNkMsUUFBRixDQUFkO0FBQ0EsWUFBSVMsT0FBTyxLQUFYOztBQUVBLGVBQU87QUFDSEMsbUJBQVFsRCxJQUFSLEVBQWM7QUFDVEEseUJBQVMsTUFBVixHQUFvQlcsTUFBTXNDLElBQU4sRUFBcEIsR0FBbUN0QyxNQUFNd0MsSUFBTixFQUFuQztBQUNIO0FBSEUsU0FBUDtBQUtILEtBVEQ7O0FBV0F6RCxXQUFPWSxJQUFQLEdBQWNaLE9BQU9ZLElBQVAsSUFBZSxFQUE3QjtBQUNBWixXQUFPWSxJQUFQLENBQVkwQyxPQUFaLEdBQXNCQSxPQUF0QjtBQUNILENBaEJELEVBZ0JHdEQsTUFoQkgsRUFnQldhLE1BaEJYO0FDQUEsQ0FBQyxDQUFDYixNQUFELEVBQVNDLENBQVQsRUFBWXlELENBQVosS0FBa0I7QUFDZjs7QUFFQSxVQUFNQyxVQUFOLENBQWlCOztBQUViNUMsb0JBQWE2QyxLQUFiLEVBQW9CQyxRQUFwQixFQUE4QkMsUUFBOUIsRUFBd0M7QUFDcEMsaUJBQUtGLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGlCQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsaUJBQUtDLE9BQUwsR0FBZXBELEtBQUswQyxPQUFMLENBQWEsVUFBYixDQUFmO0FBQ0EsaUJBQUtqRCxLQUFMLEdBQWEsSUFBSU8sS0FBS1YsS0FBVCxFQUFiO0FBQ0EsaUJBQUsrRCxRQUFMLEdBQWdCLElBQUlyRCxLQUFLaUMsUUFBVCxDQUFrQixjQUFsQixDQUFoQjtBQUNBLGlCQUFLcUIsY0FBTCxHQUFzQixJQUFJdEQsS0FBS0UsY0FBVCxFQUF0Qjs7QUFFQTs7QUFFQWdCLHFCQUFTRyxTQUFULENBQW1CLEtBQUs0QixRQUFMLENBQWMxRCxNQUFqQyxFQUF5QyxNQUF6QztBQUNBMkIscUJBQVNHLFNBQVQsQ0FBbUIsS0FBSzZCLFFBQUwsQ0FBYzNELE1BQWpDLEVBQXlDLE1BQXpDO0FBQ0EyQixxQkFBU0csU0FBVCxDQUFtQixLQUFLNEIsUUFBTCxDQUFjRSxVQUFqQyxFQUE2QyxZQUE3QztBQUNBakMscUJBQVNHLFNBQVQsQ0FBbUIsS0FBSytCLE9BQUwsQ0FBYVIsTUFBaEMsRUFBd0MsU0FBeEM7QUFDQTFCLHFCQUFTRyxTQUFULENBQW1CLEtBQUs1QixLQUFMLENBQVdGLE1BQTlCLEVBQXNDLE9BQXRDOztBQUVBOztBQUVBLGlCQUFLOEQsUUFBTCxDQUFjOUQsTUFBZDtBQUNBLGlCQUFLeUQsS0FBTCxDQUFXTyxPQUFYO0FBQ0EsaUJBQUtDLElBQUw7QUFDSDs7QUFFREEsZUFBUTtBQUNKLGlCQUFLUCxRQUFMLENBQWM1QyxLQUFkLENBQW9Cb0QsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsR0FBaEMsRUFBcUMsS0FBS0Msa0JBQUwsQ0FBd0JGLElBQXhCLENBQTZCLElBQTdCLENBQXJDO0FBQ0FuRSxjQUFFLGlCQUFGLEVBQXFCb0UsRUFBckIsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0Usa0JBQUwsQ0FBd0JILElBQXhCLENBQTZCLElBQTdCLENBQWxDO0FBQ0FuRSxjQUFFLGlCQUFGLEVBQXFCb0UsRUFBckIsQ0FBd0IsUUFBeEIsRUFBa0MsS0FBS0csa0JBQUwsQ0FBd0JKLElBQXhCLENBQTZCLElBQTdCLENBQWxDO0FBQ0FuRSxjQUFFLFlBQUYsRUFBZ0JvRSxFQUFoQixDQUFtQixPQUFuQixFQUE0QixLQUFLSSxrQkFBTCxDQUF3QkwsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBNUI7QUFDQW5FLGNBQUUsYUFBRixFQUFpQm9FLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLEtBQUtLLGVBQUwsQ0FBcUJOLElBQXJCLENBQTBCLElBQTFCLENBQTdCO0FBQ0FuRSxjQUFFLGFBQUYsRUFBaUJvRSxFQUFqQixDQUFvQixPQUFwQixFQUE2QixLQUFLTSxlQUFMLENBQXFCUCxJQUFyQixDQUEwQixJQUExQixDQUE3QjtBQUNBbkUsY0FBRSxhQUFGLEVBQWlCb0UsRUFBakIsQ0FBb0IsT0FBcEIsRUFBNkIsS0FBS08sZUFBTCxDQUFxQlIsSUFBckIsQ0FBMEIsSUFBMUIsQ0FBN0I7QUFDSDs7QUFFREUsMkJBQW9CTyxDQUFwQixFQUF1QjtBQUNuQixnQkFBSUMsT0FBTzdFLEVBQUU0RSxFQUFFRSxhQUFKLENBQVg7QUFBQSxnQkFDSUMsVUFBVUYsS0FBS0csT0FBTCxDQUFhLGlCQUFiLENBRGQ7QUFBQSxnQkFFSUMsU0FBU0YsUUFBUTVFLElBQVIsQ0FBYSxRQUFiLEtBQTBCLEVBRnZDOztBQUlBLGdCQUFJMEUsS0FBS0ssUUFBTCxDQUFjLFFBQWQsQ0FBSixFQUE2QjtBQUN6QixxQkFBS3BCLFVBQUwsR0FBa0JtQixNQUFsQjtBQUNBcEQseUJBQVNRLE9BQVQsQ0FBaUIsS0FBS3NCLEtBQUwsQ0FBV3dCLFFBQVgsQ0FBb0JDLFNBQVMsS0FBS3RCLFVBQWQsQ0FBcEIsQ0FBakIsRUFBaUUsTUFBakU7QUFDQWpDLHlCQUFTUSxPQUFULENBQWlCLEtBQUt5QixVQUF0QixFQUFrQyxZQUFsQztBQUNILGFBSkQsTUFJTyxJQUFJZSxLQUFLSyxRQUFMLENBQWMsU0FBZCxDQUFKLEVBQThCO0FBQ2pDLHFCQUFLRyxTQUFMLENBQWVKLE1BQWY7QUFDSCxhQUZNLE1BRUEsSUFBSUosS0FBS0ssUUFBTCxDQUFjLFdBQWQsQ0FBSixFQUFnQztBQUNuQyxxQkFBS3ZCLEtBQUwsQ0FBV2pELE1BQVgsQ0FBa0J1RSxNQUFsQjtBQUNIO0FBQ0o7O0FBRURJLGtCQUFXSixNQUFYLEVBQW1CO0FBQ2YsZ0JBQUlLLFdBQVcsS0FBSzFCLFFBQUwsQ0FBYzVDLEtBQWQsQ0FBb0J1RSxJQUFwQixDQUEwQixZQUFXTixNQUFPLEVBQTVDLENBQWY7O0FBRUFLLHFCQUFTRSxRQUFULENBQWtCLFVBQWxCO0FBQ0EsaUJBQUs1QixRQUFMLENBQWM2QixjQUFkLENBQTZCSCxRQUE3Qjs7QUFFQUEscUJBQVNsQixFQUFULENBQVksUUFBWixFQUFzQlEsS0FBSztBQUN2QkEsa0JBQUVjLGNBQUY7QUFDQUoseUJBQVNLLEdBQVQsQ0FBYSxRQUFiOztBQUVBTCx5QkFBU00sV0FBVCxDQUFxQixVQUFyQjtBQUNBLHFCQUFLaEMsUUFBTCxDQUFjNkIsY0FBZCxDQUE2QkgsUUFBN0I7QUFDQSxxQkFBSzNCLEtBQUwsQ0FBV2tDLFVBQVgsQ0FBc0JaLE1BQXRCLEVBQThCTCxFQUFFa0IsTUFBRixDQUFTQyxRQUFULENBQWtCLENBQWxCLEVBQXFCQyxLQUFuRDtBQUNILGFBUEQ7O0FBU0FWLHFCQUFTbEIsRUFBVCxDQUFZLFVBQVosRUFBd0JRLEtBQUs7QUFDekJVLHlCQUFTTSxXQUFULENBQXFCLFVBQXJCO0FBQ0EscUJBQUtoQyxRQUFMLENBQWM2QixjQUFkLENBQTZCSCxRQUE3QjtBQUNBQSx5QkFBU0ssR0FBVCxDQUFhLFVBQWI7QUFDSCxhQUpEO0FBS0g7O0FBRURyQiwyQkFBb0JNLENBQXBCLEVBQXVCO0FBQ25CQSxjQUFFYyxjQUFGO0FBQ0EsaUJBQUsvQixLQUFMLENBQVdzQyxNQUFYLENBQWtCckIsRUFBRWtCLE1BQXBCO0FBQ0E5RixjQUFFLGNBQUYsRUFBa0JrRyxHQUFsQixDQUFzQixFQUF0QjtBQUNIOztBQUVEMUIsMkJBQW9CSSxDQUFwQixFQUF1QjtBQUNuQixnQkFBSUMsT0FBTzdFLEVBQUU0RSxFQUFFa0IsTUFBSixDQUFYO0FBQUEsZ0JBQ0lmLFVBQVVGLEtBQUtHLE9BQUwsQ0FBYSxpQkFBYixDQURkO0FBQUEsZ0JBRUltQixTQUFTcEIsUUFBUTVFLElBQVIsQ0FBYSxRQUFiLENBRmI7O0FBSUEsZ0JBQUkwRSxLQUFLSyxRQUFMLENBQWMsYUFBZCxDQUFKLEVBQWtDO0FBQzlCLHFCQUFLakIsY0FBTCxDQUFvQnRDLElBQXBCLENBQTBCRCxJQUFELElBQVU7QUFDL0IseUJBQUtpQyxLQUFMLENBQVd5QyxVQUFYLENBQXNCLEtBQUt0QyxVQUEzQixFQUF1Q3FDLE1BQXZDLEVBQStDO0FBQzNDRSwrQkFBTyxVQURvQztBQUUzQ0wsK0JBQU9NLE9BQU81RSxJQUFQLEVBQWE2RSxPQUFiO0FBRm9DLHFCQUEvQztBQUlILGlCQUxEO0FBTUgsYUFQRCxNQU9PLElBQUkxQixLQUFLSyxRQUFMLENBQWMsU0FBZCxDQUFKLEVBQThCO0FBQ2pDLHFCQUFLdkIsS0FBTCxDQUFXeUMsVUFBWCxDQUFzQixLQUFLdEMsVUFBM0IsRUFBdUNxQyxNQUF2QyxFQUErQztBQUMzQ0UsMkJBQU8sTUFEb0M7QUFFM0NMLDJCQUFPLENBQUNuQixLQUFLVSxJQUFMLENBQVUsT0FBVixFQUFtQmlCLElBQW5CLENBQXdCLFNBQXhCO0FBRm1DLGlCQUEvQztBQUlILGFBTE0sTUFLQSxJQUFJeEcsRUFBRTRFLEVBQUVrQixNQUFKLEVBQVlkLE9BQVosQ0FBb0IsVUFBcEIsRUFBZ0N0QyxNQUFwQyxFQUE0QztBQUMvQyxxQkFBSytELFNBQUwsQ0FBZU4sTUFBZjtBQUNILGFBRk0sTUFFQSxJQUFJbkcsRUFBRTRFLEVBQUVrQixNQUFKLEVBQVlkLE9BQVosQ0FBb0IsWUFBcEIsRUFBa0N0QyxNQUF0QyxFQUE4QztBQUNqRCxxQkFBS2lCLEtBQUwsQ0FBVytDLFVBQVgsQ0FBc0IsS0FBSzVDLFVBQTNCLEVBQXVDcUMsTUFBdkM7QUFDSDtBQUNKOztBQUVENUIsMkJBQW9CSyxDQUFwQixFQUF1QjtBQUNuQkEsY0FBRWMsY0FBRjtBQUNBLGlCQUFLL0IsS0FBTCxDQUFXZ0QsTUFBWCxDQUFrQi9CLEVBQUVrQixNQUFwQixFQUE0QixLQUFLaEMsVUFBakM7QUFDQTlELGNBQUUsY0FBRixFQUFrQmtHLEdBQWxCLENBQXNCLEVBQXRCO0FBQ0g7O0FBRURPLGtCQUFXTixNQUFYLEVBQW1CO0FBQ2YsZ0JBQUlTLFdBQVc1RyxFQUFHLFlBQVdtRyxNQUFPLEVBQXJCLENBQWY7O0FBRUFTLHFCQUFTcEIsUUFBVCxDQUFrQixVQUFsQjtBQUNBLGlCQUFLM0IsUUFBTCxDQUFjZ0QsY0FBZCxDQUE2QkQsUUFBN0I7O0FBRUFBLHFCQUFTeEMsRUFBVCxDQUFZLFFBQVosRUFBc0JRLEtBQUs7QUFDdkJBLGtCQUFFYyxjQUFGO0FBQ0FrQix5QkFBU2pCLEdBQVQsQ0FBYSxRQUFiOztBQUVBaUIseUJBQVNoQixXQUFULENBQXFCLFVBQXJCO0FBQ0EscUJBQUsvQixRQUFMLENBQWNnRCxjQUFkLENBQTZCRCxRQUE3QjtBQUNBLHFCQUFLakQsS0FBTCxDQUFXeUMsVUFBWCxDQUFzQixLQUFLdEMsVUFBM0IsRUFBdUNxQyxNQUF2QyxFQUErQztBQUMzQ0UsMkJBQU8sYUFEb0M7QUFFM0NMLDJCQUFPcEIsRUFBRWtCLE1BQUYsQ0FBU0MsUUFBVCxDQUFrQixDQUFsQixFQUFxQkM7QUFGZSxpQkFBL0M7QUFJSCxhQVZEOztBQVlBWSxxQkFBU3hDLEVBQVQsQ0FBWSxVQUFaLEVBQXdCUSxLQUFLO0FBQ3pCZ0MseUJBQVNoQixXQUFULENBQXFCLFVBQXJCO0FBQ0EscUJBQUsvQixRQUFMLENBQWNnRCxjQUFkLENBQTZCRCxRQUE3QjtBQUNBQSx5QkFBU2pCLEdBQVQsQ0FBYSxVQUFiO0FBQ0gsYUFKRDtBQUtIOztBQUVEbEIsd0JBQWlCRyxDQUFqQixFQUFvQjtBQUNoQixnQkFBSWtDLFNBQVNyRCxFQUFFc0QsSUFBRixDQUFPbkMsRUFBRWtCLE1BQUYsQ0FBU0UsS0FBaEIsRUFBdUJnQixXQUF2QixFQUFiOztBQUVBLGdCQUFJRixPQUFPcEUsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNuQmIseUJBQVNRLE9BQVQsQ0FDSSxLQUFLc0IsS0FBTCxDQUFXc0QsS0FBWCxDQUFpQkMsTUFBakIsQ0FDSUMsUUFBUUEsS0FBS0MsS0FBTCxDQUFXSixXQUFYLEdBQXlCSyxPQUF6QixDQUFpQ1AsTUFBakMsTUFBNkMsQ0FBQyxDQUQxRCxDQURKLEVBSUksTUFKSjtBQU1ILGFBUEQsTUFPTztBQUNIakYseUJBQVNRLE9BQVQsQ0FBaUIsS0FBS3NCLEtBQUwsQ0FBV3NELEtBQTVCLEVBQW1DLE1BQW5DO0FBQ0g7QUFDSjs7QUFFRHZDLHdCQUFpQkUsQ0FBakIsRUFBb0I7QUFDaEIsZ0JBQUksS0FBS2QsVUFBVCxFQUFxQjs7QUFFakIsb0JBQUlnRCxTQUFTckQsRUFBRXNELElBQUYsQ0FBT25DLEVBQUVrQixNQUFGLENBQVNFLEtBQWhCLEVBQXVCZ0IsV0FBdkIsRUFBYjs7QUFFQSxvQkFBSUYsT0FBT3BFLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkJiLDZCQUFTUSxPQUFULENBQ0ksS0FBS3NCLEtBQUwsQ0FBV3dCLFFBQVgsQ0FBb0IsS0FBS3JCLFVBQXpCLEVBQ0tvRCxNQURMLENBRVFJLFFBQVFBLEtBQUtDLFdBQUwsQ0FBaUJQLFdBQWpCLEdBQStCSyxPQUEvQixDQUF1Q1AsTUFBdkMsTUFBbUQsQ0FBQyxDQUZwRSxDQURKLEVBS0ksTUFMSjtBQU9ILGlCQVJELE1BUU87QUFDSGpGLDZCQUFTUSxPQUFULENBQWlCLEtBQUtzQixLQUFMLENBQVd3QixRQUFYLENBQW9CLEtBQUtyQixVQUF6QixDQUFqQixFQUF1RCxNQUF2RDtBQUNIO0FBQ0o7QUFDSjs7QUFFRGEsd0JBQWlCQyxDQUFqQixFQUFvQjtBQUNoQixnQkFBSSxLQUFLZCxVQUFULEVBQXFCO0FBQ2pCLG9CQUFJMEQsV0FBV3hILEVBQUUsaUJBQUYsQ0FBZjs7QUFFQSxvQkFBSXdILFNBQVNDLEVBQVQsQ0FBWSxVQUFaLENBQUosRUFBNkI7QUFDekJELDZCQUFTaEUsSUFBVDtBQUNBM0IsNkJBQVNRLE9BQVQsQ0FBaUIsS0FBS3NCLEtBQUwsQ0FBV3dCLFFBQVgsQ0FBb0IsS0FBS3JCLFVBQXpCLENBQWpCLEVBQXVELE1BQXZEO0FBQ0gsaUJBSEQsTUFHTztBQUNIMEQsNkJBQVNsRSxJQUFUO0FBQ0F6Qiw2QkFBU1EsT0FBVCxDQUNJLEtBQUtzQixLQUFMLENBQVd3QixRQUFYLENBQW9CLEtBQUtyQixVQUF6QixFQUNLb0QsTUFETCxDQUNZSSxRQUFRQSxLQUFLSSxJQUFMLEtBQWMsS0FEbEMsQ0FESixFQUdJLE1BSEo7QUFLSDtBQUNKO0FBQ0o7QUExTFk7O0FBNkxqQjNILFdBQU9ZLElBQVAsR0FBY1osT0FBT1ksSUFBUCxJQUFlLEVBQTdCO0FBQ0FaLFdBQU9ZLElBQVAsQ0FBWStDLFVBQVosR0FBeUJBLFVBQXpCO0FBQ0gsQ0FsTUQsRUFrTUczRCxNQWxNSCxFQWtNV2EsTUFsTVgsRUFrTW1CNkMsQ0FsTW5CO0FDQUEsQ0FBQyxDQUFDMUQsTUFBRCxFQUFTQyxDQUFULEVBQVl5RCxDQUFaLEtBQWtCO0FBQ2Y7O0FBRUEsVUFBTWtFLFFBQU4sQ0FBZTs7QUFFWCxlQUFPQyxPQUFQLEdBQWtCO0FBQ2QsbUJBQU81SCxFQUFFLFdBQUYsQ0FBUDtBQUNIOztBQUVEYyxzQkFBZTtBQUNYLGlCQUFLRSxLQUFMLEdBQWEyRyxTQUFTQyxPQUFULEVBQWI7QUFDSDs7QUFFRG5DLHVCQUFnQjBCLElBQWhCLEVBQXNCO0FBQ2xCLGdCQUFJQSxLQUFLakMsUUFBTCxDQUFjLFVBQWQsQ0FBSixFQUErQjtBQUMzQmlDLHFCQUFLNUIsSUFBTCxDQUFVLE9BQVYsRUFBbUJpQixJQUFuQixDQUF3QixNQUF4QixFQUFnQyxNQUFoQyxFQUF3Q3FCLEtBQXhDO0FBQ0FWLHFCQUFLNUIsSUFBTCxDQUFVLE1BQVYsRUFBa0IvQixJQUFsQjtBQUNILGFBSEQsTUFHTztBQUNIMkQscUJBQUs1QixJQUFMLENBQVUsT0FBVixFQUFtQmlCLElBQW5CLENBQXdCLE1BQXhCLEVBQWdDLFFBQWhDO0FBQ0FXLHFCQUFLNUIsSUFBTCxDQUFVLE1BQVYsRUFBa0JqQyxJQUFsQjtBQUNIO0FBQ0o7O0FBRURwRCxlQUFRNEgsU0FBUixFQUFtQjs7QUFFZixnQkFBSTlHLFFBQVEyRyxTQUFTQyxPQUFULEVBQVo7QUFDQTVHLGtCQUFNK0csSUFBTixDQUFXLEVBQVg7O0FBRUF0RSxjQUFFUixPQUFGLENBQVU2RSxTQUFWLEVBQXFCRSxZQUFZO0FBQzdCaEgsc0JBQU1SLE1BQU4sQ0FBYyxzRkFBcUZ3SCxTQUFTQyxFQUFHOzs0Q0FFbkZELFNBQVNDLEVBQUc7Z0ZBQ3dCRCxTQUFTWixLQUFNO29GQUNYWSxTQUFTQyxFQUFHLGFBQVlELFNBQVNaLEtBQU07Ozs7Ozs7c0JBSjNHO0FBWUgsYUFiRDtBQWNIOztBQUVEdEQsbUJBQVltQixNQUFaLEVBQW9CO0FBQ2hCMEMscUJBQVNDLE9BQVQsR0FBbUJyQyxJQUFuQixDQUF3QixnQkFBeEIsRUFBMEMyQyxJQUExQyxDQUErQyxDQUFDekYsQ0FBRCxFQUFJMEYsSUFBSixLQUFhO0FBQ3hELG9CQUFJQyxZQUFZcEksRUFBRW1JLElBQUYsQ0FBaEI7QUFDQUMsMEJBQVV4QyxXQUFWLENBQXNCLFFBQXRCOztBQUVBLG9CQUFJUixTQUFTZ0QsVUFBVWpJLElBQVYsQ0FBZSxRQUFmLENBQVQsTUFBdUM4RSxNQUEzQyxFQUFtRDtBQUMvQ21ELDhCQUFVNUMsUUFBVixDQUFtQixRQUFuQjtBQUNIO0FBQ0osYUFQRDtBQVFIO0FBbERVOztBQXFEZnpGLFdBQU9ZLElBQVAsR0FBY1osT0FBT1ksSUFBUCxJQUFlLEVBQTdCO0FBQ0FaLFdBQU9ZLElBQVAsQ0FBWWdILFFBQVosR0FBdUJBLFFBQXZCO0FBQ0gsQ0ExREQsRUEwREc1SCxNQTFESCxFQTBEV2EsTUExRFgsRUEwRG1CNkMsQ0ExRG5CO0FDQUEsQ0FBQyxDQUFDMUQsTUFBRCxFQUFTMEQsQ0FBVCxLQUFlO0FBQ1o7O0FBRUEsVUFBTTRFLEtBQU4sQ0FBWTtBQUNSdkgsb0JBQWF3SCxLQUFiLEVBQW9CO0FBQ2hCLGlCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQSxpQkFBS3JCLEtBQUwsR0FBYSxFQUFiO0FBQ0g7O0FBRUQvQyxrQkFBVztBQUNQLGlCQUFLb0UsS0FBTCxDQUFXL0MsSUFBWCxHQUFrQmdELElBQWxCLENBQ0lDLFdBQVc7QUFDUCx1QkFBT0MsUUFBUUMsR0FBUixDQUFZRixRQUFRRyxHQUFSLENBQVkxRCxVQUFVO0FBQ3JDLDJCQUFPLEtBQUtxRCxLQUFMLENBQVcvQyxJQUFYLENBQWdCTixNQUFoQixFQUF3QnNELElBQXhCLENBQTZCSyxPQUFPO0FBQ3ZDLCtCQUFPbkYsRUFBRW9GLEtBQUYsQ0FBUUQsR0FBUixFQUFhLEVBQUNYLElBQUloRCxNQUFMLEVBQWIsQ0FBUDtBQUNILHFCQUZNLENBQVA7QUFHSCxpQkFKa0IsQ0FBWixDQUFQO0FBS0gsYUFQTCxFQVFJNkQsT0FBT2pILFNBQVNRLE9BQVQsQ0FBaUIsRUFBQzlCLFNBQVN1SSxHQUFWLEVBQWpCLEVBQWlDLE9BQWpDLENBUlgsRUFTRVAsSUFURixDQVNPdEIsU0FBUztBQUNaLHFCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDQXBGLHlCQUFTUSxPQUFULENBQWlCLEtBQUs0RSxLQUF0QixFQUE2QixNQUE3QjtBQUNILGFBWkQ7QUFhSDs7QUFFRDhCLGdCQUFTOUQsTUFBVCxFQUFpQjtBQUNiLGlCQUFLcUQsS0FBTCxDQUFXL0MsSUFBWCxDQUFnQk4sTUFBaEIsRUFBd0JzRCxJQUF4QixDQUNJSyxPQUFPL0csU0FBU1EsT0FBVCxDQUFpQnVHLEdBQWpCLEVBQXNCLE1BQXRCLENBRFgsRUFFSUUsT0FBT2pILFNBQVNRLE9BQVQsQ0FBaUIsRUFBQzlCLFNBQVN1SSxHQUFWLEVBQWpCLEVBQWlDLE9BQWpDLENBRlg7QUFJSDs7QUFFRDdDLGVBQVErQyxJQUFSLEVBQWM7QUFDVixnQkFBSS9ELFNBQVNnRSxLQUFLQyxHQUFMLEVBQWI7QUFBQSxnQkFDSS9JLE9BQU87QUFDSGlILHVCQUFPNEIsS0FBS2pELFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQURyQjtBQUVIbUQseUJBQVMsSUFBSUYsSUFBSixHQUFXRyxRQUFYLEVBRk47QUFHSEMsdUJBQU87QUFISixhQURYOztBQU9BLGlCQUFLZixLQUFMLENBQVdyQyxNQUFYLENBQWtCaEIsTUFBbEIsRUFBMEI5RSxJQUExQixFQUFnQ29JLElBQWhDLENBQ0lLLE9BQU9BLElBQUlPLE9BQUosR0FBYyxLQUFLakYsT0FBTCxFQUFkLEdBQStCckMsU0FBU1EsT0FBVCxDQUFpQnVHLElBQUlVLEtBQXJCLEVBQTRCLE9BQTVCLENBRDFDLEVBRUlSLE9BQU9qSCxTQUFTUSxPQUFULENBQWlCLEVBQUM5QixTQUFTdUksR0FBVixFQUFqQixFQUFpQyxPQUFqQyxDQUZYO0FBSUg7O0FBRURuQyxlQUFRcUMsSUFBUixFQUFjL0QsU0FBUyxDQUF2QixFQUEwQjs7QUFFdEIsZ0JBQUlrQyxPQUFPLEtBQUtvQyxPQUFMLENBQWF0RSxNQUFiLENBQVg7O0FBRUFrQyxpQkFBS2tDLEtBQUwsQ0FBV25ILElBQVgsQ0FBZ0I7QUFDWnFGLDZCQUFheUIsS0FBS2pELFFBQUwsQ0FBYyxDQUFkLEVBQWlCQyxLQURsQjtBQUVaMEIsc0JBQU0sS0FGTTtBQUdaOEIsMEJBQVVQLEtBQUtDLEdBQUw7QUFIRSxhQUFoQjs7QUFNQSxpQkFBS1osS0FBTCxDQUFXM0IsTUFBWCxDQUFrQjFCLE1BQWxCLEVBQTBCa0MsSUFBMUIsRUFBZ0NvQixJQUFoQyxDQUNJSyxPQUFPQSxJQUFJYSxPQUFKLEdBQWM1SCxTQUFTUSxPQUFULENBQWlCOEUsS0FBS2tDLEtBQXRCLEVBQTZCLE1BQTdCLENBQWQsR0FBcUR4SCxTQUFTUSxPQUFULENBQWlCdUcsSUFBSVUsS0FBckIsRUFBNEIsT0FBNUIsQ0FEaEUsRUFFSVIsT0FBT2pILFNBQVNRLE9BQVQsQ0FBaUIsRUFBQzlCLFNBQVN1SSxHQUFWLEVBQWpCLEVBQWlDLE9BQWpDLENBRlg7QUFJSDs7QUFFRHBJLGVBQVF1RSxNQUFSLEVBQWdCO0FBQ1osaUJBQUtxRCxLQUFMLENBQVc1SCxNQUFYLENBQWtCdUUsTUFBbEIsRUFBMEJzRCxJQUExQixDQUNJSyxPQUFPQSxJQUFJYyxPQUFKLEdBQWMsS0FBS3hGLE9BQUwsRUFBZCxHQUErQnJDLFNBQVNRLE9BQVQsQ0FBaUJ1RyxJQUFJVSxLQUFyQixFQUE0QixPQUE1QixDQUQxQyxFQUVJUixPQUFPakgsU0FBU1EsT0FBVCxDQUFpQixFQUFDOUIsU0FBU3VJLEdBQVYsRUFBakIsRUFBaUMsT0FBakMsQ0FGWDtBQUlIOztBQUVEUyxnQkFBU3RFLE1BQVQsRUFBaUI7QUFDYixtQkFBTyxLQUFLZ0MsS0FBTCxDQUFXMUIsSUFBWCxDQUFnQjRCLFFBQVFBLEtBQUtjLEVBQUwsSUFBV2hELE1BQW5DLENBQVA7QUFDSDs7QUFFRFksbUJBQVlaLFNBQVMsQ0FBckIsRUFBd0IwRSxTQUF4QixFQUFtQztBQUMvQixnQkFBSXhDLE9BQU8sS0FBS29DLE9BQUwsQ0FBYXRFLE1BQWIsQ0FBWDtBQUNBa0MsaUJBQUtDLEtBQUwsR0FBYXVDLFNBQWI7O0FBRUEsaUJBQUtyQixLQUFMLENBQVczQixNQUFYLENBQWtCMUIsTUFBbEIsRUFBMEJrQyxJQUExQixFQUFnQ29CLElBQWhDLENBQ0lLLE9BQU9BLElBQUlhLE9BQUosR0FBYyxLQUFLdkYsT0FBTCxFQUFkLEdBQStCckMsU0FBU1EsT0FBVCxDQUFpQnVHLElBQUlVLEtBQXJCLEVBQTRCLE9BQTVCLENBRDFDLEVBRUlSLE9BQU9qSCxTQUFTUSxPQUFULENBQWlCLEVBQUM5QixTQUFTdUksR0FBVixFQUFqQixFQUFpQyxPQUFqQyxDQUZYO0FBSUg7O0FBRUQzRCxpQkFBVUYsU0FBUyxDQUFuQixFQUFzQjtBQUNsQixtQkFBTyxLQUFLZ0MsS0FBTCxDQUFXMkMsTUFBWCxDQUFrQixDQUFDUCxLQUFELEVBQVFsQyxJQUFSLEtBQWlCO0FBQ3RDLG9CQUFJQSxLQUFLYyxFQUFMLElBQVdoRCxNQUFmLEVBQXVCO0FBQ25CLDJCQUFPa0MsS0FBS2tDLEtBQVo7QUFDSDtBQUNELHVCQUFPQSxLQUFQO0FBQ0gsYUFMTSxFQUtKLEVBTEksQ0FBUDtBQU1IOztBQUVEakQsbUJBQVluQixNQUFaLEVBQW9Ca0IsTUFBcEIsRUFBNEIwRCxRQUE1QixFQUFzQztBQUNsQyxnQkFBSTFDLE9BQU8sS0FBS0YsS0FBTCxDQUFXMUIsSUFBWCxDQUFpQjRCLFFBQVFBLEtBQUtjLEVBQUwsSUFBV2hELE1BQXBDLENBQVg7QUFDQWtDLGlCQUFLa0MsS0FBTCxDQUFXbEQsTUFBWCxFQUFtQjBELFNBQVN4RCxLQUE1QixJQUFxQ3dELFNBQVM3RCxLQUE5Qzs7QUFFQSxpQkFBS3NDLEtBQUwsQ0FBVzNCLE1BQVgsQ0FBa0IxQixNQUFsQixFQUEwQmtDLElBQTFCLEVBQWdDb0IsSUFBaEMsQ0FDSUssT0FBT0EsSUFBSWEsT0FBSixHQUFjNUgsU0FBU1EsT0FBVCxDQUFpQjhFLEtBQUtrQyxLQUF0QixFQUE2QixNQUE3QixDQUFkLEdBQXFEeEgsU0FBU1EsT0FBVCxDQUFpQnVHLElBQUlVLEtBQXJCLEVBQTRCLE9BQTVCLENBRGhFLEVBRUlSLE9BQU9qSCxTQUFTUSxPQUFULENBQWlCLEVBQUM5QixTQUFTdUksR0FBVixFQUFqQixFQUFpQyxPQUFqQyxDQUZYO0FBSUg7O0FBRURwQyxtQkFBWXpCLE1BQVosRUFBb0JrQixNQUFwQixFQUE0QjtBQUN4QixnQkFBSWdCLE9BQU8sS0FBS29DLE9BQUwsQ0FBYXRFLE1BQWIsQ0FBWDtBQUNBa0MsaUJBQUtrQyxLQUFMLENBQVcxRyxNQUFYLENBQWtCd0QsTUFBbEIsRUFBMEIsQ0FBMUI7O0FBRUEsaUJBQUttQyxLQUFMLENBQVczQixNQUFYLENBQWtCMUIsTUFBbEIsRUFBMEJrQyxJQUExQixFQUFnQ29CLElBQWhDLENBQ0lLLE9BQU9BLElBQUlhLE9BQUosR0FBYzVILFNBQVNRLE9BQVQsQ0FBaUI4RSxLQUFLa0MsS0FBdEIsRUFBNkIsTUFBN0IsQ0FBZCxHQUFxRHhILFNBQVNRLE9BQVQsQ0FBaUJ1RyxJQUFJVSxLQUFyQixFQUE0QixPQUE1QixDQURoRSxFQUVJUixPQUFPakgsU0FBU1EsT0FBVCxDQUFpQixFQUFDOUIsU0FBU3VJLEdBQVYsRUFBakIsRUFBaUMsT0FBakMsQ0FGWDtBQUlIO0FBM0dPOztBQThHWi9JLFdBQU9ZLElBQVAsR0FBY1osT0FBT1ksSUFBUCxJQUFlLEVBQTdCO0FBQ0FaLFdBQU9ZLElBQVAsQ0FBWTBILEtBQVosR0FBb0JBLEtBQXBCO0FBQ0gsQ0FuSEQsRUFtSEd0SSxNQW5ISCxFQW1IVzBELENBbkhYO0FDQUEsQ0FBRTFELE1BQUQsSUFBWTtBQUNUOztBQUVBLFVBQU0rSixLQUFOLENBQVk7O0FBRVJoSixzQkFBZTtBQUNYLGlCQUFLaUosUUFBTCxHQUFnQixtREFBaEI7QUFDQSxpQkFBS0MsV0FBTCxHQUFtQixDQUFuQjtBQUNIOztBQUVEekUsYUFBTU4sU0FBUyxDQUFmLEVBQWtCO0FBQ2QsbUJBQU8sS0FBS2dGLElBQUwsQ0FBVWhGLE1BQVYsQ0FBUDtBQUNIOztBQUVEZ0IsZUFBUWhCLFNBQVMsQ0FBakIsRUFBb0I5RSxPQUFPLEVBQTNCLEVBQStCO0FBQzNCLG1CQUFPLEtBQUs4SixJQUFMLENBQVVoRixNQUFWLEVBQWtCLE1BQWxCLEVBQTBCLEVBQUN0RSxNQUFNdUosS0FBS0MsU0FBTCxDQUFlaEssSUFBZixDQUFQLEVBQTFCLENBQVA7QUFDSDs7QUFFRHdHLGVBQVExQixTQUFTLENBQWpCLEVBQW9COUUsT0FBTyxFQUEzQixFQUErQjtBQUMzQixtQkFBTyxLQUFLOEosSUFBTCxDQUFVaEYsTUFBVixFQUFrQixLQUFsQixFQUF5QixFQUFDdEUsTUFBTXVKLEtBQUtDLFNBQUwsQ0FBZWhLLElBQWYsQ0FBUCxFQUF6QixDQUFQO0FBQ0g7O0FBRURPLGVBQVF1RSxTQUFTLENBQWpCLEVBQW9CO0FBQ2hCLG1CQUFPLEtBQUtnRixJQUFMLENBQVVoRixNQUFWLEVBQWtCLFFBQWxCLENBQVA7QUFDSDs7QUFFRGdGLGFBQU1oRixNQUFOLEVBQWNtRixTQUFTLEtBQXZCLEVBQThCakssT0FBTyxFQUFyQyxFQUF5Qzs7QUFFckMsa0JBQU1rSyxNQUFPLEdBQUUsS0FBS04sUUFBUyxJQUFHOUUsV0FBVyxDQUFYLEdBQWUsRUFBZixHQUFvQkEsTUFBTyxFQUEzRDs7QUFFQSxtQkFBTyxJQUFJd0QsT0FBSixDQUFZLENBQUM2QixPQUFELEVBQVVDLE1BQVYsS0FBcUI7QUFDcEMsc0JBQU1DLE1BQU0sSUFBSUMsY0FBSixFQUFaOztBQUVBNUkseUJBQVNRLE9BQVQsQ0FBaUIsTUFBakIsRUFBeUIsU0FBekI7O0FBRUFtSSxvQkFBSTdJLElBQUosQ0FBU3lJLE1BQVQsRUFBaUJDLEdBQWpCLEVBQXNCLElBQXRCO0FBQ0FHLG9CQUFJRSxlQUFKLEdBQXNCLElBQXRCO0FBQ0FGLG9CQUFJRyxnQkFBSixDQUFxQixjQUFyQixFQUFxQyxpQ0FBckM7QUFDQUgsb0JBQUlJLE1BQUosR0FBYSxNQUFNO0FBQ2Ysd0JBQUlKLElBQUlLLE1BQUosS0FBZSxHQUFuQixFQUF3QjtBQUNwQlAsZ0NBQVFKLEtBQUtZLEtBQUwsQ0FBV04sSUFBSU8sUUFBZixDQUFSO0FBQ0gscUJBRkQsTUFFTztBQUNIUiwrQkFBT1MsTUFBTVIsSUFBSVMsVUFBVixDQUFQO0FBQ0g7QUFDSixpQkFORDtBQU9BVCxvQkFBSVUsa0JBQUosR0FBeUIsTUFBTTtBQUMzQix3QkFBSVYsSUFBSVcsVUFBSixLQUFtQixLQUFLbkIsV0FBNUIsRUFBeUM7QUFDckNuSSxpQ0FBU1EsT0FBVCxDQUFpQixNQUFqQixFQUF5QixTQUF6QjtBQUNIO0FBQ0osaUJBSkQ7QUFLQW1JLG9CQUFJWSxPQUFKLEdBQWMsTUFBTWIsT0FBT1MsTUFBTSxlQUFOLENBQVAsQ0FBcEI7QUFDQVIsb0JBQUlQLElBQUosQ0FBU0MsS0FBS0MsU0FBTCxDQUFlaEssSUFBZixDQUFUO0FBQ0gsYUF0Qk0sQ0FBUDtBQXVCSDtBQWxETzs7QUFxRFpKLFdBQU9ZLElBQVAsR0FBY1osT0FBT1ksSUFBUCxJQUFlLEVBQTdCO0FBQ0FaLFdBQU9ZLElBQVAsQ0FBWW1KLEtBQVosR0FBb0JBLEtBQXBCO0FBQ0gsQ0ExREQsRUEwREcvSixNQTFESDtBQ0FBLENBQUMsQ0FBQ0EsTUFBRCxFQUFTQyxDQUFULEVBQVl5RCxDQUFaLEtBQWtCO0FBQ2Y7O0FBRUEsVUFBTTRILFFBQU4sQ0FBZTs7QUFFWCxlQUFPekQsT0FBUCxHQUFrQjtBQUNkLG1CQUFPNUgsRUFBRSxZQUFGLENBQVA7QUFDSDs7QUFFRGMsc0JBQWU7QUFDWCxpQkFBS0UsS0FBTCxHQUFhcUssU0FBU3pELE9BQVQsRUFBYjtBQUNIOztBQUVEZix1QkFBZ0JTLElBQWhCLEVBQXNCO0FBQ2xCLGdCQUFJQSxLQUFLcEMsUUFBTCxDQUFjLFVBQWQsQ0FBSixFQUErQjtBQUMzQm9DLHFCQUFLL0IsSUFBTCxDQUFVLE9BQVYsRUFBbUJpQixJQUFuQixDQUF3QixNQUF4QixFQUFnQyxNQUFoQyxFQUF3Q3FCLEtBQXhDO0FBQ0FQLHFCQUFLL0IsSUFBTCxDQUFVLE1BQVYsRUFBa0IvQixJQUFsQjtBQUNILGFBSEQsTUFHTztBQUNIOEQscUJBQUsvQixJQUFMLENBQVUsT0FBVixFQUFtQmlCLElBQW5CLENBQXdCLE1BQXhCLEVBQWdDLFFBQWhDO0FBQ0FjLHFCQUFLL0IsSUFBTCxDQUFVLE1BQVYsRUFBa0JqQyxJQUFsQjtBQUNIO0FBQ0o7O0FBRURwRCxlQUFRbUosS0FBUixFQUFlO0FBQ1gsZ0JBQUlySSxRQUFRcUssU0FBU3pELE9BQVQsRUFBWjs7QUFFQTVHLGtCQUFNK0csSUFBTixDQUFXLEVBQVg7O0FBRUEsZ0JBQUlzQixNQUFNM0csTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUNwQjFCLHNCQUFNUixNQUFOLENBQWM7O3NCQUFkO0FBR0gsYUFKRCxNQUlPOztBQUVIaUQsa0JBQUVSLE9BQUYsQ0FBVW9HLEtBQVYsRUFBaUIsQ0FBQy9CLElBQUQsRUFBT25CLE1BQVAsS0FBa0I7QUFDL0JuRiwwQkFBTVIsTUFBTixDQUFjLDRDQUEyQzJGLE1BQU87OztvREFHaENBLE1BQU87NENBQ2ZtQixLQUFLQyxXQUFZOzRGQUMrQnBCLE1BQU8sYUFBWW1CLEtBQUtDLFdBQVk7Ozs7Ozs7O2tFQVE5REQsS0FBS2tDLFFBQVMsS0FBSWxDLEtBQUtrQyxRQUFMLEdBQWdCbEQsT0FBT2dCLEtBQUtrQyxRQUFaLEVBQXNCOEIsTUFBdEIsQ0FBNkIsa0JBQTdCLENBQWhCLEdBQW1FLEtBQU07OztzRkFHdkVoRSxLQUFLSSxJQUFMLEdBQVksU0FBWixHQUF3QixFQUFHOzs7OzBCQWhCN0Y7QUFxQkgsaUJBdEJEO0FBdUJIO0FBQ0o7QUF2RFU7O0FBMERmM0gsV0FBT1ksSUFBUCxHQUFjWixPQUFPWSxJQUFQLElBQWUsRUFBN0I7QUFDQVosV0FBT1ksSUFBUCxDQUFZMEssUUFBWixHQUF1QkEsUUFBdkI7QUFDSCxDQS9ERCxFQStER3RMLE1BL0RILEVBK0RXYSxNQS9EWCxFQStEbUI2QyxDQS9EbkI7QUNBQSxDQUFDLE1BQU07QUFDSDs7QUFFQSxVQUFNNkUsUUFBUSxJQUFJM0gsS0FBS21KLEtBQVQsRUFBZDtBQUFBLFVBQ0luRyxRQUFRLElBQUloRCxLQUFLMEgsS0FBVCxDQUFlQyxLQUFmLENBRFo7QUFBQSxVQUVJMUUsV0FBVyxJQUFJakQsS0FBS2dILFFBQVQsRUFGZjtBQUFBLFVBR0k5RCxXQUFXLElBQUlsRCxLQUFLMEssUUFBVCxFQUhmO0FBQUEsVUFJSUUsYUFBYSxJQUFJNUssS0FBSytDLFVBQVQsQ0FBb0JDLEtBQXBCLEVBQTJCQyxRQUEzQixFQUFxQ0MsUUFBckMsQ0FKakI7QUFLSCxDQVJEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIigod2luZG93LCAkKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBBbGVydCB7XG4gICAgICAgIHJlbmRlciAoZGF0YSkge1xuICAgICAgICAgICAgbGV0IGFsZXJ0ID0gJChgPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LSR7ZGF0YS50eXBlID8gZGF0YS50eXBlIDogJ2Rhbmdlcid9IGFsZXJ0LWRpc21pc3NpYmxlIGZhZGUgc2hvd1wiIHJvbGU9XCJhbGVydFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxzdHJvbmc+JHtkYXRhLm5hbWUgPyBkYXRhLm5hbWUgKyAnOicgOiAnJ308L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAke2RhdGEubWVzc2FnZX1cbiAgICAgICAgICAgIDwvZGl2PmApO1xuXG4gICAgICAgICAgICAkKCcjYWxlcnRzJykuYXBwZW5kKGFsZXJ0KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhbGVydC5yZW1vdmUoKSwgMzAwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLkFsZXJ0ID0gQWxlcnQ7XG59KSh3aW5kb3csIGpRdWVyeSk7XG4iLCIoKHdpbmRvdykgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY2xhc3MgRGF0ZVRpbWVQaWNrZXIge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyID0ge1xuICAgICAgICAgICAgICAgICRyb290OiB0aGlzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB7fVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHBpY2tlciA9IHRoaXMucGlja2VyO1xuXG4gICAgICAgICAgICAkKFwiI2RhdGVUaW1lUGlja2VyXCIpLkFueVBpY2tlcih7XG4gICAgICAgICAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBpY2tlci4kcm9vdCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtb2RlOiBcImRhdGV0aW1lXCIsXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwiaU9TXCIsXG4gICAgICAgICAgICAgICAgcm93c05hdmlnYXRpb246IFwic2Nyb2xsZXJcIixcbiAgICAgICAgICAgICAgICBvblNldE91dHB1dDogZnVuY3Rpb24gKHNPdXRwdXQsIG9BcnJTZWxlY3RlZFZhbHVlcykge1xuICAgICAgICAgICAgICAgICAgICBwaWNrZXIuY2FsbGJhY2sob0FyclNlbGVjdGVkVmFsdWVzLmRhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgb3BlbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMucGlja2VyLiRyb290LnNob3dPckhpZGVQaWNrZXIoKTtcbiAgICAgICAgICAgIHRoaXMucGlja2VyLmNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLkRhdGVUaW1lUGlja2VyID0gRGF0ZVRpbWVQaWNrZXI7XG59KSh3aW5kb3cpO1xuIiwiY29uc3QgTWVkaWF0b3IgPSAoKCkgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlcnM6IHtcbiAgICAgICAgICAgIGFueTogW10gLy8gZXZlbnQgdHlwZTogc3Vic2NyaWJlcnNcbiAgICAgICAgfSxcblxuICAgICAgICBzdWJzY3JpYmUgKGZuLCB0eXBlID0gJ2FueScpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5zdWJzY3JpYmVyc1t0eXBlXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbdHlwZV0gPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaWJlcnNbdHlwZV0ucHVzaChmbik7XG4gICAgICAgIH0sXG4gICAgICAgIHVuc3Vic2NyaWJlIChmbiwgdHlwZSkge1xuICAgICAgICAgICAgdGhpcy52aXNpdFN1YnNjcmliZXJzKCd1bnN1YnNjcmliZScsIGZuLCB0eXBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgcHVibGlzaCAocHVibGljYXRpb24sIHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMudmlzaXRTdWJzY3JpYmVycygncHVibGlzaCcsIHB1YmxpY2F0aW9uLCB0eXBlKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmlzaXRTdWJzY3JpYmVycyAoYWN0aW9uLCBhcmcsIHR5cGUgPSAnYW55Jykge1xuICAgICAgICAgICAgbGV0IHN1YnNjcmliZXJzID0gdGhpcy5zdWJzY3JpYmVyc1t0eXBlXTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwdWJsaXNoJykge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyc1tpXShhcmcpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpYmVyc1tpXSA9PT0gYXJnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcbiIsIigod2luZG93KSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBTY3JvbGxlciB7XG5cbiAgICAgICAgY29uc3RydWN0b3IgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIgKCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlckNvbnRhaW5lci5mb3JFYWNoKHNjcm9sbCA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBzID0gbmV3IFBlcmZlY3RTY3JvbGxiYXIoc2Nyb2xsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvZG8gPSB3aW5kb3cudG9kbyB8fCB7fTtcbiAgICB3aW5kb3cudG9kby5TY3JvbGxlciA9IFNjcm9sbGVyO1xufSkod2luZG93KTsiLCIoKHdpbmRvdywgJCkgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgbGV0IFNwaW5uZXIgPSBzZWxlY3RvciA9PiB7XG4gICAgICAgIGNvbnN0ICRyb290ID0gJChzZWxlY3Rvcik7XG4gICAgICAgIGxldCBzaG93ID0gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvZ2dsZSAodHlwZSkge1xuICAgICAgICAgICAgICAgICh0eXBlID09PSAnc2hvdycpID8gJHJvb3Quc2hvdygpIDogJHJvb3QuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLlNwaW5uZXIgPSBTcGlubmVyO1xufSkod2luZG93LCBqUXVlcnkpO1xuIiwiKCh3aW5kb3csICQsIF8pID0+IHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGNsYXNzIENvbnRyb2xsZXIge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yIChtb2RlbCwgbGlzdFZpZXcsIHRhc2tWaWV3KSB7XG4gICAgICAgICAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgICAgICAgICB0aGlzLmxpc3RWaWV3ID0gbGlzdFZpZXc7XG4gICAgICAgICAgICB0aGlzLnRhc2tWaWV3ID0gdGFza1ZpZXc7XG4gICAgICAgICAgICB0aGlzLmxpc3RBY3RpdmUgPSAnJztcbiAgICAgICAgICAgIHRoaXMuc3Bpbm5lciA9IHRvZG8uU3Bpbm5lcignI3NwaW5uZXInKTtcbiAgICAgICAgICAgIHRoaXMuYWxlcnQgPSBuZXcgdG9kby5BbGVydCgpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlciA9IG5ldyB0b2RvLlNjcm9sbGVyKCcuanMtc2Nyb2xsZXInKTtcbiAgICAgICAgICAgIHRoaXMuZGF0ZVRpbWVQaWNrZXIgPSBuZXcgdG9kby5EYXRlVGltZVBpY2tlcigpO1xuXG4gICAgICAgICAgICAvLy8vXG5cbiAgICAgICAgICAgIE1lZGlhdG9yLnN1YnNjcmliZSh0aGlzLmxpc3RWaWV3LnJlbmRlciwgJ2xpc3QnKTtcbiAgICAgICAgICAgIE1lZGlhdG9yLnN1YnNjcmliZSh0aGlzLnRhc2tWaWV3LnJlbmRlciwgJ3Rhc2snKTtcbiAgICAgICAgICAgIE1lZGlhdG9yLnN1YnNjcmliZSh0aGlzLmxpc3RWaWV3Lmxpc3RBY3RpdmUsICdsaXN0QWN0aXZlJyk7XG4gICAgICAgICAgICBNZWRpYXRvci5zdWJzY3JpYmUodGhpcy5zcGlubmVyLnRvZ2dsZSwgJ3NwaW5uZXInKTtcbiAgICAgICAgICAgIE1lZGlhdG9yLnN1YnNjcmliZSh0aGlzLmFsZXJ0LnJlbmRlciwgJ2FsZXJ0Jyk7XG5cbiAgICAgICAgICAgIC8vLy9cblxuICAgICAgICAgICAgdGhpcy5zY3JvbGxlci5yZW5kZXIoKTtcbiAgICAgICAgICAgIHRoaXMubW9kZWwuZmluZEFsbCgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICAgIH1cblxuICAgICAgICBiaW5kICgpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdFZpZXcuJHJvb3Qub24oJ2NsaWNrJywgJ2EnLCB0aGlzLl9iaW5kTGlzdEl0ZW1DbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyNhZGROZXdMaXN0Rm9ybScpLm9uKCdzdWJtaXQnLCB0aGlzLl9iaW5kTmV3TGlzdFN1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyNhZGROZXdUYXNrRm9ybScpLm9uKCdzdWJtaXQnLCB0aGlzLl9iaW5kTmV3VGFza1N1Ym1pdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyN0b2RvVGFza3MnKS5vbignY2xpY2snLCB0aGlzLl9iaW5kVGFza0l0ZW1DbGljay5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICQoJyNzZWFyY2hMaXN0Jykub24oJ2tleXVwJywgdGhpcy5fYmluZFNlYXJjaExpc3QuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAkKCcjc2VhcmNoVGFzaycpLm9uKCdrZXl1cCcsIHRoaXMuX2JpbmRTZWFyY2hUYXNrLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgJCgnI3NvcnRCeURvbmUnKS5vbignY2xpY2snLCB0aGlzLl9iaW5kU29ydEJ5RG9uZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9iaW5kTGlzdEl0ZW1DbGljayAoZSkge1xuICAgICAgICAgICAgbGV0ICRlbG0gPSAkKGUuY3VycmVudFRhcmdldCksXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICRlbG0uY2xvc2VzdCgnLmpzLWxpc3QtcGFyZW50JyksXG4gICAgICAgICAgICAgICAgbGlzdElkID0gJHBhcmVudC5kYXRhKCdsaXN0SWQnKSB8fCAnJztcblxuICAgICAgICAgICAgaWYgKCRlbG0uaGFzQ2xhc3MoJ2pzLXNldCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0QWN0aXZlID0gbGlzdElkO1xuICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2godGhpcy5tb2RlbC5nZXRUYXNrcyhwYXJzZUludCh0aGlzLmxpc3RBY3RpdmUpKSwgJ3Rhc2snKTtcbiAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKHRoaXMubGlzdEFjdGl2ZSwgJ2xpc3RBY3RpdmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGVsbS5oYXNDbGFzcygnanMtZWRpdCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZWRpdExpc3QobGlzdElkKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGVsbS5oYXNDbGFzcygnanMtcmVtb3ZlJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJlbW92ZShsaXN0SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2VkaXRMaXN0IChsaXN0SWQpIHtcbiAgICAgICAgICAgIGxldCBlZGl0TGlzdCA9IHRoaXMubGlzdFZpZXcuJHJvb3QuZmluZChgI2VkaXRMaXN0JHtsaXN0SWR9YCk7XG5cbiAgICAgICAgICAgIGVkaXRMaXN0LmFkZENsYXNzKCdvcGVuRm9ybScpO1xuICAgICAgICAgICAgdGhpcy5saXN0Vmlldy50b2dnbGVFZGl0TGlzdChlZGl0TGlzdCk7XG5cbiAgICAgICAgICAgIGVkaXRMaXN0Lm9uKCdzdWJtaXQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZWRpdExpc3Qub2ZmKCdzdWJtaXQnKTtcblxuICAgICAgICAgICAgICAgIGVkaXRMaXN0LnJlbW92ZUNsYXNzKCdvcGVuRm9ybScpO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFZpZXcudG9nZ2xlRWRpdExpc3QoZWRpdExpc3QpO1xuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudXBkYXRlTGlzdChsaXN0SWQsIGUudGFyZ2V0LmVsZW1lbnRzWzBdLnZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlZGl0TGlzdC5vbignZm9jdXNvdXQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0TGlzdC5yZW1vdmVDbGFzcygnb3BlbkZvcm0nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RWaWV3LnRvZ2dsZUVkaXRMaXN0KGVkaXRMaXN0KTtcbiAgICAgICAgICAgICAgICBlZGl0TGlzdC5vZmYoJ2ZvY3Vzb3V0Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9iaW5kTmV3TGlzdFN1Ym1pdCAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5jcmVhdGUoZS50YXJnZXQpO1xuICAgICAgICAgICAgJCgnI25ld1RvRG9MaXN0JykudmFsKFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmRUYXNrSXRlbUNsaWNrIChlKSB7XG4gICAgICAgICAgICBsZXQgJGVsbSA9ICQoZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkZWxtLmNsb3Nlc3QoJy5qcy10YXNrLXBhcmVudCcpLFxuICAgICAgICAgICAgICAgIHRhc2tJZCA9ICRwYXJlbnQuZGF0YSgndGFza0lkJyk7XG5cbiAgICAgICAgICAgIGlmICgkZWxtLmhhc0NsYXNzKCdqcy1kYXRldGltZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRlVGltZVBpY2tlci5vcGVuKChkYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudXBkYXRlVGFzayh0aGlzLmxpc3RBY3RpdmUsIHRhc2tJZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICdkZWFkbGluZScsXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogbW9tZW50KGRhdGUpLnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJGVsbS5oYXNDbGFzcygnanMtZG9uZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVUYXNrKHRoaXMubGlzdEFjdGl2ZSwgdGFza0lkLCB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZG9uZScsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAhJGVsbS5maW5kKCdpbnB1dCcpLnByb3AoJ2NoZWNrZWQnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgkKGUudGFyZ2V0KS5jbG9zZXN0KCcuanMtZWRpdCcpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VkaXRUYXNrKHRhc2tJZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCQoZS50YXJnZXQpLmNsb3Nlc3QoJy5qcy1yZW1vdmUnKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnJlbW92ZVRhc2sodGhpcy5saXN0QWN0aXZlLCB0YXNrSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX2JpbmROZXdUYXNrU3VibWl0IChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLm1vZGVsLnVwZGF0ZShlLnRhcmdldCwgdGhpcy5saXN0QWN0aXZlKTtcbiAgICAgICAgICAgICQoJyNuZXdUb0RvVGFzaycpLnZhbChcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9lZGl0VGFzayAodGFza0lkKSB7XG4gICAgICAgICAgICBsZXQgZWRpdFRhc2sgPSAkKGAjZWRpdFRhc2ske3Rhc2tJZH1gKTtcblxuICAgICAgICAgICAgZWRpdFRhc2suYWRkQ2xhc3MoJ29wZW5Gb3JtJyk7XG4gICAgICAgICAgICB0aGlzLnRhc2tWaWV3LnRvZ2dsZUVkaXRUYXNrKGVkaXRUYXNrKTtcblxuICAgICAgICAgICAgZWRpdFRhc2sub24oJ3N1Ym1pdCcsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlZGl0VGFzay5vZmYoJ3N1Ym1pdCcpO1xuXG4gICAgICAgICAgICAgICAgZWRpdFRhc2sucmVtb3ZlQ2xhc3MoJ29wZW5Gb3JtJyk7XG4gICAgICAgICAgICAgICAgdGhpcy50YXNrVmlldy50b2dnbGVFZGl0VGFzayhlZGl0VGFzayk7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVUYXNrKHRoaXMubGlzdEFjdGl2ZSwgdGFza0lkLCB7XG4gICAgICAgICAgICAgICAgICAgIGZpZWxkOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZS50YXJnZXQuZWxlbWVudHNbMF0udmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBlZGl0VGFzay5vbignZm9jdXNvdXQnLCBlID0+IHtcbiAgICAgICAgICAgICAgICBlZGl0VGFzay5yZW1vdmVDbGFzcygnb3BlbkZvcm0nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRhc2tWaWV3LnRvZ2dsZUVkaXRUYXNrKGVkaXRUYXNrKTtcbiAgICAgICAgICAgICAgICBlZGl0VGFzay5vZmYoJ2ZvY3Vzb3V0Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIF9iaW5kU2VhcmNoTGlzdCAoZSkge1xuICAgICAgICAgICAgbGV0IHNlYXJjaCA9IF8udHJpbShlLnRhcmdldC52YWx1ZSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKHNlYXJjaC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5saXN0cy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBsaXN0ID0+IGxpc3QudGl0bGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICdsaXN0J1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2godGhpcy5tb2RlbC5saXN0cywgJ2xpc3QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF9iaW5kU2VhcmNoVGFzayAoZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdEFjdGl2ZSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaCA9IF8udHJpbShlLnRhcmdldC52YWx1ZSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5nZXRUYXNrcyh0aGlzLmxpc3RBY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzayA9PiB0YXNrLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpICE9PSAtMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAndGFzaydcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKHRoaXMubW9kZWwuZ2V0VGFza3ModGhpcy5saXN0QWN0aXZlKSwgJ3Rhc2snKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfYmluZFNvcnRCeURvbmUgKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3RBY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBsZXQgc29ydEljb24gPSAkKCcjc29ydEJ5RG9uZUljb24nKTtcblxuICAgICAgICAgICAgICAgIGlmIChzb3J0SWNvbi5pcygnOnZpc2libGUnKSkge1xuICAgICAgICAgICAgICAgICAgICBzb3J0SWNvbi5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2godGhpcy5tb2RlbC5nZXRUYXNrcyh0aGlzLmxpc3RBY3RpdmUpLCAndGFzaycpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydEljb24uc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlbC5nZXRUYXNrcyh0aGlzLmxpc3RBY3RpdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcih0YXNrID0+IHRhc2suZG9uZSA9PT0gZmFsc2UpLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3Rhc2snXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2luZG93LnRvZG8gPSB3aW5kb3cudG9kbyB8fCB7fTtcbiAgICB3aW5kb3cudG9kby5Db250cm9sbGVyID0gQ29udHJvbGxlcjtcbn0pKHdpbmRvdywgalF1ZXJ5LCBfKTtcbiIsIigod2luZG93LCAkLCBfKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBMaXN0VmlldyB7XG5cbiAgICAgICAgc3RhdGljIGdldFJvb3QgKCkge1xuICAgICAgICAgICAgcmV0dXJuICQoXCIjdG9kb0xpc3RcIik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgICAgICB0aGlzLiRyb290ID0gTGlzdFZpZXcuZ2V0Um9vdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlRWRpdExpc3QgKGxpc3QpIHtcbiAgICAgICAgICAgIGlmIChsaXN0Lmhhc0NsYXNzKCdvcGVuRm9ybScpKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5maW5kKCdpbnB1dCcpLnByb3AoJ3R5cGUnLCAndGV4dCcpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgbGlzdC5maW5kKCdzcGFuJykuaGlkZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0LmZpbmQoJ2lucHV0JykucHJvcCgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBsaXN0LmZpbmQoJ3NwYW4nKS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZW5kZXIgKGxpc3RUYXNrcykge1xuXG4gICAgICAgICAgICBsZXQgJHJvb3QgPSBMaXN0Vmlldy5nZXRSb290KCk7XG4gICAgICAgICAgICAkcm9vdC5odG1sKCcnKTtcblxuICAgICAgICAgICAgXy5mb3JFYWNoKGxpc3RUYXNrcywgbGlzdEl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICRyb290LmFwcGVuZChgPGxpIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGpzLWxpc3QtcGFyZW50XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGRhdGEtbGlzdC1pZD1cIiR7bGlzdEl0ZW0uaWR9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggdy0xMDAganVzdGlmeS1jb250ZW50LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxmb3JtIGlkPVwiZWRpdExpc3Qke2xpc3RJdGVtLmlkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxhIGNsYXNzPVwianMtc2V0XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPiR7bGlzdEl0ZW0udGl0bGV9PC9hPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cImxpc3RzWyR7bGlzdEl0ZW0uaWR9XVwiIHZhbHVlPVwiJHtsaXN0SXRlbS50aXRsZX1cIj4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwianMtZWRpdFwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48c3BhbiBjbGFzcz1cImRyaXBpY29ucy1wZW5jaWxcIj48L3NwYW4+PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwianMtcmVtb3ZlXCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxzcGFuIGNsYXNzPVwiZHJpcGljb25zLWNyb3NzXCI+PC9zcGFuPjwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9saT5gKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlzdEFjdGl2ZSAobGlzdElkKSB7XG4gICAgICAgICAgICBMaXN0Vmlldy5nZXRSb290KCkuZmluZCgnW2RhdGEtbGlzdC1pZF0nKS5lYWNoKChpLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0ICRsaXN0SXRlbSA9ICQoaXRlbSk7XG4gICAgICAgICAgICAgICAgJGxpc3RJdGVtLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICAgICAgICAgIGlmIChwYXJzZUludCgkbGlzdEl0ZW0uZGF0YSgnbGlzdElkJykpID09PSBsaXN0SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxpc3RJdGVtLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uTGlzdFZpZXcgPSBMaXN0Vmlldztcbn0pKHdpbmRvdywgalF1ZXJ5LCBfKTtcbiIsIigod2luZG93LCBfKSA9PiB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjbGFzcyBNb2RlbCB7XG4gICAgICAgIGNvbnN0cnVjdG9yIChzdG9yZSkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZSA9IHN0b3JlO1xuICAgICAgICAgICAgdGhpcy5saXN0cyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgZmluZEFsbCAoKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmZpbmQoKS50aGVuKFxuICAgICAgICAgICAgICAgIGxpc3RJZHMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwobGlzdElkcy5tYXAobGlzdElkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JlLmZpbmQobGlzdElkKS50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF8ubWVyZ2UocmVzLCB7aWQ6IGxpc3RJZH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKS50aGVuKGxpc3RzID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RzID0gbGlzdHM7XG4gICAgICAgICAgICAgICAgTWVkaWF0b3IucHVibGlzaCh0aGlzLmxpc3RzLCAnbGlzdCcpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmaW5kT25lIChsaXN0SWQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcmUuZmluZChsaXN0SWQpLnRoZW4oXG4gICAgICAgICAgICAgICAgcmVzID0+IE1lZGlhdG9yLnB1Ymxpc2gocmVzLCAndGFzaycpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZSAoZm9ybSkge1xuICAgICAgICAgICAgbGV0IGxpc3RJZCA9IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGZvcm0uZWxlbWVudHNbMF0udmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZWQ6IG5ldyBEYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGFza3M6IFtdXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZS5jcmVhdGUobGlzdElkLCBkYXRhKS50aGVuKFxuICAgICAgICAgICAgICAgIHJlcyA9PiByZXMuY3JlYXRlZCA/IHRoaXMuZmluZEFsbCgpIDogTWVkaWF0b3IucHVibGlzaChyZXMuZXJyb3IsICdhbGVydCcpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZSAoZm9ybSwgbGlzdElkID0gMCkge1xuXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZ2V0TGlzdChsaXN0SWQpO1xuXG4gICAgICAgICAgICBsaXN0LnRhc2tzLnB1c2goe1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBmb3JtLmVsZW1lbnRzWzBdLnZhbHVlLFxuICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGRlYWRsaW5lOiBEYXRlLm5vdygpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5zdG9yZS51cGRhdGUobGlzdElkLCBsaXN0KS50aGVuKFxuICAgICAgICAgICAgICAgIHJlcyA9PiByZXMudXBkYXRlZCA/IE1lZGlhdG9yLnB1Ymxpc2gobGlzdC50YXNrcywgJ3Rhc2snKSA6IE1lZGlhdG9yLnB1Ymxpc2gocmVzLmVycm9yLCAnYWxlcnQnKSxcbiAgICAgICAgICAgICAgICBlcnIgPT4gTWVkaWF0b3IucHVibGlzaCh7bWVzc2FnZTogZXJyfSwgJ2FsZXJ0JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmUgKGxpc3RJZCkge1xuICAgICAgICAgICAgdGhpcy5zdG9yZS5yZW1vdmUobGlzdElkKS50aGVuKFxuICAgICAgICAgICAgICAgIHJlcyA9PiByZXMuZGVsZXRlZCA/IHRoaXMuZmluZEFsbCgpIDogTWVkaWF0b3IucHVibGlzaChyZXMuZXJyb3IsICdhbGVydCcpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdldExpc3QgKGxpc3RJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdHMuZmluZChsaXN0ID0+IGxpc3QuaWQgPT0gbGlzdElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUxpc3QgKGxpc3RJZCA9IDAsIGxpc3RUaXRsZSkge1xuICAgICAgICAgICAgbGV0IGxpc3QgPSB0aGlzLmdldExpc3QobGlzdElkKTtcbiAgICAgICAgICAgIGxpc3QudGl0bGUgPSBsaXN0VGl0bGU7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGxpc3RJZCwgbGlzdCkudGhlbihcbiAgICAgICAgICAgICAgICByZXMgPT4gcmVzLnVwZGF0ZWQgPyB0aGlzLmZpbmRBbGwoKSA6IE1lZGlhdG9yLnB1Ymxpc2gocmVzLmVycm9yLCAnYWxlcnQnKSxcbiAgICAgICAgICAgICAgICBlcnIgPT4gTWVkaWF0b3IucHVibGlzaCh7bWVzc2FnZTogZXJyfSwgJ2FsZXJ0JylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBnZXRUYXNrcyAobGlzdElkID0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdHMucmVkdWNlKCh0YXNrcywgbGlzdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0LmlkID09IGxpc3RJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC50YXNrcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhc2tzO1xuICAgICAgICAgICAgfSwgW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgdXBkYXRlVGFzayAobGlzdElkLCB0YXNrSWQsIHRhc2tEYXRhKSB7XG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMubGlzdHMuZmluZCggbGlzdCA9PiBsaXN0LmlkID09IGxpc3RJZCk7XG4gICAgICAgICAgICBsaXN0LnRhc2tzW3Rhc2tJZF1bdGFza0RhdGEuZmllbGRdID0gdGFza0RhdGEudmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuc3RvcmUudXBkYXRlKGxpc3RJZCwgbGlzdCkudGhlbihcbiAgICAgICAgICAgICAgICByZXMgPT4gcmVzLnVwZGF0ZWQgPyBNZWRpYXRvci5wdWJsaXNoKGxpc3QudGFza3MsICd0YXNrJykgOiBNZWRpYXRvci5wdWJsaXNoKHJlcy5lcnJvciwgJ2FsZXJ0JyksXG4gICAgICAgICAgICAgICAgZXJyID0+IE1lZGlhdG9yLnB1Ymxpc2goe21lc3NhZ2U6IGVycn0sICdhbGVydCcpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlVGFzayAobGlzdElkLCB0YXNrSWQpIHtcbiAgICAgICAgICAgIGxldCBsaXN0ID0gdGhpcy5nZXRMaXN0KGxpc3RJZCk7XG4gICAgICAgICAgICBsaXN0LnRhc2tzLnNwbGljZSh0YXNrSWQsIDEpO1xuXG4gICAgICAgICAgICB0aGlzLnN0b3JlLnVwZGF0ZShsaXN0SWQsIGxpc3QpLnRoZW4oXG4gICAgICAgICAgICAgICAgcmVzID0+IHJlcy51cGRhdGVkID8gTWVkaWF0b3IucHVibGlzaChsaXN0LnRhc2tzLCAndGFzaycpIDogTWVkaWF0b3IucHVibGlzaChyZXMuZXJyb3IsICdhbGVydCcpLFxuICAgICAgICAgICAgICAgIGVyciA9PiBNZWRpYXRvci5wdWJsaXNoKHttZXNzYWdlOiBlcnJ9LCAnYWxlcnQnKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uTW9kZWwgPSBNb2RlbDtcbn0pKHdpbmRvdywgXyk7XG4iLCIoKHdpbmRvdykgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY2xhc3MgU3RvcmUge1xuXG4gICAgICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kcG9pbnQgPSAnaHR0cHM6Ly9lbmlnbWF0aWMtdGVtcGxlLTY3ODM4Lmhlcm9rdWFwcC5jb20vdG9kbyc7XG4gICAgICAgICAgICB0aGlzLlNUQVRFX1JFQURZID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZpbmQgKGxpc3RJZCA9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmQobGlzdElkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNyZWF0ZSAobGlzdElkID0gMCwgZGF0YSA9IHt9KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kKGxpc3RJZCwgJ1BPU1QnLCB7dG9kbzogSlNPTi5zdHJpbmdpZnkoZGF0YSl9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZSAobGlzdElkID0gMCwgZGF0YSA9IHt9KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kKGxpc3RJZCwgJ1BVVCcsIHt0b2RvOiBKU09OLnN0cmluZ2lmeShkYXRhKX0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3ZlIChsaXN0SWQgPSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kKGxpc3RJZCwgJ0RFTEVURScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VuZCAobGlzdElkLCBtZXRob2QgPSAnR0VUJywgZGF0YSA9IHt9KSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IGAke3RoaXMuZW5kcG9pbnR9LyR7bGlzdElkID09PSAwID8gJycgOiBsaXN0SWR9YDtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgICAgIE1lZGlhdG9yLnB1Ymxpc2goJ3Nob3cnLCAnc3Bpbm5lcicpO1xuXG4gICAgICAgICAgICAgICAgcmVxLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJlcS53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOFwiKTtcbiAgICAgICAgICAgICAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVxLnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKEpTT04ucGFyc2UocmVxLnJlc3BvbnNlKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoRXJyb3IocmVxLnN0YXR1c1RleHQpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcS5yZWFkeVN0YXRlID09PSB0aGlzLlNUQVRFX1JFQURZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBNZWRpYXRvci5wdWJsaXNoKCdoaWRlJywgJ3NwaW5uZXInKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZWplY3QoRXJyb3IoXCJOZXR3b3JrIGVycm9yXCIpKTtcbiAgICAgICAgICAgICAgICByZXEuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy50b2RvID0gd2luZG93LnRvZG8gfHwge307XG4gICAgd2luZG93LnRvZG8uU3RvcmUgPSBTdG9yZTtcbn0pKHdpbmRvdyk7XG4iLCIoKHdpbmRvdywgJCwgXykgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY2xhc3MgVGFza1ZpZXcge1xuXG4gICAgICAgIHN0YXRpYyBnZXRSb290ICgpIHtcbiAgICAgICAgICAgIHJldHVybiAkKFwiI3RvZG9UYXNrc1wiKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICAgICAgdGhpcy4kcm9vdCA9IFRhc2tWaWV3LmdldFJvb3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZ2dsZUVkaXRUYXNrICh0YXNrKSB7XG4gICAgICAgICAgICBpZiAodGFzay5oYXNDbGFzcygnb3BlbkZvcm0nKSkge1xuICAgICAgICAgICAgICAgIHRhc2suZmluZCgnaW5wdXQnKS5wcm9wKCd0eXBlJywgJ3RleHQnKS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIHRhc2suZmluZCgnc3BhbicpLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFzay5maW5kKCdpbnB1dCcpLnByb3AoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGFzay5maW5kKCdzcGFuJykuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmVuZGVyICh0YXNrcykge1xuICAgICAgICAgICAgbGV0ICRyb290ID0gVGFza1ZpZXcuZ2V0Um9vdCgpO1xuXG4gICAgICAgICAgICAkcm9vdC5odG1sKCcnKTtcblxuICAgICAgICAgICAgaWYgKHRhc2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICRyb290LmFwcGVuZChgPHRyPlxuICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiIGNvbHNwYW49XCIzXCI+Tm8gVGFza3MhPC90ZD5cbiAgICAgICAgICAgICAgICA8L3RyPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uZm9yRWFjaCh0YXNrcywgKHRhc2ssIHRhc2tJZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAkcm9vdC5hcHBlbmQoYDx0ciBjbGFzcz1cImpzLXRhc2stcGFyZW50XCIgZGF0YS10YXNrLWlkPVwiJHt0YXNrSWR9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGZvcm0gaWQ9XCJlZGl0VGFzayR7dGFza0lkfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHt0YXNrLmRlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwidGFza3NbJHt0YXNrSWR9XVwiIHZhbHVlPVwiJHt0YXNrLmRlc2NyaXB0aW9ufVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJqcy1lZGl0XCIgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxzcGFuIGNsYXNzPVwiZHJpcGljb25zLXBlbmNpbFwiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImpzLXJlbW92ZVwiIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj48c3BhbiBjbGFzcz1cImRyaXBpY29ucy1jcm9zc1wiPjwvc3Bhbj48L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJqcy1kYXRldGltZVwiIGRhdGEtdGltZXN0YW1wPVwiJHt0YXNrLmRlYWRsaW5lfVwiPiR7dGFzay5kZWFkbGluZSA/IG1vbWVudCh0YXNrLmRlYWRsaW5lKS5mb3JtYXQoJ0RELk1NLllZWVkgSEg6bW0nKSA6ICctLS0nfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwianMtZG9uZSBjdXN0b20tY29udHJvbCBjdXN0b20tY2hlY2tib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY3VzdG9tLWNvbnRyb2wtaW5wdXRcIiAke3Rhc2suZG9uZSA/ICdjaGVja2VkJyA6ICcnfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjdXN0b20tY29udHJvbC1pbmRpY2F0b3JcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+YCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB3aW5kb3cudG9kbyA9IHdpbmRvdy50b2RvIHx8IHt9O1xuICAgIHdpbmRvdy50b2RvLlRhc2tWaWV3ID0gVGFza1ZpZXc7XG59KSh3aW5kb3csIGpRdWVyeSwgXyk7XG4iLCIoKCkgPT4ge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgY29uc3Qgc3RvcmUgPSBuZXcgdG9kby5TdG9yZSgpLFxuICAgICAgICBtb2RlbCA9IG5ldyB0b2RvLk1vZGVsKHN0b3JlKSxcbiAgICAgICAgbGlzdFZpZXcgPSBuZXcgdG9kby5MaXN0VmlldygpLFxuICAgICAgICB0YXNrVmlldyA9IG5ldyB0b2RvLlRhc2tWaWV3KCksXG4gICAgICAgIGNvbnRyb2xsZXIgPSBuZXcgdG9kby5Db250cm9sbGVyKG1vZGVsLCBsaXN0VmlldywgdGFza1ZpZXcpO1xufSkoKTtcbiJdfQ==
