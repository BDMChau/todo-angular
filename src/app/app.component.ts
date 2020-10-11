import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  hasTodo$: Observable<boolean>
 
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getLocalStorage();
    this.hasTodo$ = this.todoService.itemCount$.pipe(map(quantity => quantity > 0)) //boolean = true if quantity>0
  }
}
