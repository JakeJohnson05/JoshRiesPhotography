import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';
/** The data for all page transitions */
const pageTime = {
	slide: '500ms',
	opacity: '500ms'
}
/** What type of animation for page slides */
const pageSlideTransition: string = 'ease-in-out';
const generalBothQuery = query(':enter, :leave', [style({
	position: 'fixed',
	top: '*',
	left: 0,
	width: '100%'
})]);

export const slideInAnimation = trigger('routeAnimations', [
	transition('Home => *, Portfolio => Contact', [
		// style({ position: 'relative' }),
		generalBothQuery,
		query(':enter', [style({ left: '100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: '-100%' }))]),
			query(':enter', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: 0 }))])
		]),
		query(':enter', animateChild()),
	]),
	transition('Portfolio => Home, Contact => *', [
		// style({ position: 'relative' }),
		generalBothQuery,
		query(':enter', [style({ left: '-100%' })]),
		group([
			query(':leave', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: '100%' }))]),
			query(':enter', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: 0 }))])
		]),
		query(':enter', animateChild({delay: 500})),
	])
])
