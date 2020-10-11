import { Component, OnInit, Output } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { fadeItem } from 'src/app/animation/fadeItem';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    animations: [
        fadeItem
    ]

})
export class HeaderComponent implements OnInit {


    constructor(private todoService: TodoService) { }

    ngOnInit(): void {
    }

    checkAll() {
        this.todoService.checkAllTodo();
    }
}
