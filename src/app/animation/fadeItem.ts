import { trigger, state, style, transition, animate } from '@angular/animations';

export const fadeItem = trigger('fadeItem', [
    state('unComplete', style({
        opacity: 1
    })),
    state('complete', style({
        opacity: 0.5,
        textDecoration: 'line-through'
    })),

    transition('unComplete <=> complete', [animate(200)])
]);