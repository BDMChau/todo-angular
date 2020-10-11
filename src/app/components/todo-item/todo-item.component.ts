import { Component, OnInit, Input, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { EventEmitter } from '@angular/core';
import { fadeItem } from 'src/app/animation/fadeItem';

////////
@Component({
    selector: 'app-todo-item',
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css'],
    animations: [
        fadeItem
    ]
})
export class TodoItemComponent implements OnInit {
    @Input() todo: Todo;
    @Output() changeStatus: EventEmitter<Todo> = new EventEmitter();
    @Output() removeTodo: EventEmitter<Todo> = new EventEmitter();
    @Output() editTodo: EventEmitter<Todo> = new EventEmitter();

    isEdit: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    
    changeStt() {
        this.changeStatus.emit({ ...this.todo, isDone: !this.todo.isDone })
    }

    remove() {
        this.removeTodo.emit(this.todo);
    }

    edit(event: KeyboardEvent) {
        const {keyCode} = event;
        event. preventDefault();

        if(keyCode === 13){
            this.editTodo.emit(this.todo);
            this.isEdit = false;
        }
    }
}
