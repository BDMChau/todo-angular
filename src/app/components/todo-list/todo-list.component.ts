import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    todos$: Observable<Todo[]>;

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
        this.todos$ = this.todoService.todos$
    }

    changeStatus(todo: Todo) {
        this.todoService.changeStatus(todo.id, todo.isDone);
    }

    removeTodo(todo: Todo) {
        this.todoService.removeTodo(todo);
    }

    editTodo(todo: Todo) {
        this.todoService.editTodo(todo);
    }
}
