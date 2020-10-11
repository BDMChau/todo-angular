import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilterButton, Filter } from 'src/app/models/filterring.model';
import { Observable, Subject } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { takeUntil, map } from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
    buttons: FilterButton[] = [
        { type: Filter.All, label: 'All', isActive: true },
        { type: Filter.Active, label: 'Active', isActive: false },
        { type: Filter.Completed, label: 'Completed', isActive: false }
    ];

    itemsCount: number = 0;
    completed$: Observable<boolean>;
    destroy$: Subject<null> = new Subject<null>();

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.completed$ = this.todoService.todos$.pipe(
            map(todos => todos.some(todo => todo.isDone)),
            takeUntil(this.destroy$)
        );

        this.todoService.itemCount$
            .pipe(takeUntil(this.destroy$))
            .subscribe(length => this.itemsCount = length)
    }


    filter(type: Filter) {
        // this.setActiveBtn(type);
        this.todoService.filterButton(type);
    }


    removeCompleted() {
        this.todoService.removeCompleted();
    }

    // private setActiveBtn(type: Filter) {
    //     this.buttons.forEach(btn => {
    //         btn.type === type;
    //     })
    // }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
