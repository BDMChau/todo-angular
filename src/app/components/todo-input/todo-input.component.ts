import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
    selector: 'app-todo-input',
    templateUrl: './todo-input.component.html',
    styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

    content: string

    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
    }

    onSubmit(){
        if(!this.content.trim()){
            return false;
        }
        this.todoService.addNew(this.content)
        this.content = '';
    }
}
