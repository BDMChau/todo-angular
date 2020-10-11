import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/filterring.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class TodoService {

    private static readonly TodoStorageKey = 'data';

    private todos: Todo[];
    private displayedTodos: Todo[];
    private currentFilter: Filter = Filter.All;

    private displayedTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
    private itemCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

    todos$: Observable<Todo[]> = this.displayedTodosSubject.asObservable();
    itemCount$: Observable<number> = this.itemCountSubject.asObservable();

    constructor(private LocalStorageService: LocalStorageService) { }

    ////////////
    getLocalStorage() {
        this.todos = this.LocalStorageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
        this.displayedTodos = [...this.todos];
        this.updateData();
    }

    updateLocalStorage() {
        this.LocalStorageService.setObject(TodoService.TodoStorageKey, this.todos);
        this.filterButton(this.currentFilter, false);

        // now data in todo[] changed, so need to update 
        this.updateData();
    }

    // custom button footer
    filterButton(filter: Filter, isFiltering: boolean = true) {
        this.currentFilter = filter;
        switch (filter) {
            case Filter.Active:
                this.displayedTodos = this.todos.filter(todo => !todo.isDone);
                break;

            case Filter.Completed:
                this.displayedTodos = this.todos.filter(todo => todo.isDone);
                break;

            case Filter.All:
                this.displayedTodos = [...this.todos];
                break;
        }

        if (isFiltering) {
            this.updateData();
        }
    }


    addNew(content: string) {
        const id = new Date(Date.now()).getTime();
        const newTodo = new Todo(id, content, false);

        this.todos.unshift(newTodo)
        this.updateLocalStorage();
    }


    changeStatus(id: number, isDone: boolean) {
        const i = this.todos.findIndex(todo => todo.id === id)
        const curTodo = this.todos[i];
        curTodo.isDone = isDone;

        this.updateLocalStorage();
    }

    removeTodo(item: Todo) {
        const i = this.todos.findIndex(todo => todo.id === item.id);
        this.todos.splice(i, 1);

        this.updateLocalStorage();
    }

    editTodo(item: Todo) {
        const i = this.todos.findIndex(todo => todo.id === item.id);
        const curTodo = this.todos[i];

        if (!item.content.trim()) {
            return false;
        }
        curTodo.content = item.content;
        this.updateLocalStorage();
    }

    checkAllTodo() {
        this.todos = this.todos.map(todo => (
            {
                ...todo,
                isDone: !this.todos.every(e => e.isDone)
            }
        ));

        this.updateLocalStorage();
    }

    removeCompleted() {
        this.todos = this.todos.filter(todo => todo.isDone === false);

        this.updateLocalStorage();
    }
    
    /////////////////
    private updateData() {
        this.displayedTodosSubject.next(this.displayedTodos);
        this.itemCountSubject.next(this.todos.length);
    }
}
