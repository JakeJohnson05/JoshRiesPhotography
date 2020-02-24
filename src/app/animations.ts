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

/** Page transition animation */
export const slideInAnimation = trigger('routeAnimations', [
	transition('Home => *, Portfolio => Contact', [
		style({ position: 'fixed' }),
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
		style({ position: 'fixed' }),
		generalBothQuery,
		query(':enter', [style({ left: '-100%' })]),
		group([
			query(':leave', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: '100%' }))]),
			query(':enter', [animate(`${pageTime.slide} ${pageSlideTransition}`, style({ left: 0 }))])
		]),
		query(':enter', animateChild({delay: 500})),
	])
]);

/** General animation data for the slideEnter animations */
const generalStyleInfo = {
  stylePre: style({ overflow: 'hidden', height: '0px', 'min-height': '0px', display: '*', 'padding-top': '0px', 'padding-bottom': '0px', opacity: 1 }),
  stylePost: style({ height: '*', 'min-height': '0px', display: '*', 'padding-top': '*', 'padding-bottom': '*', opacity: 1 })
}

/** Transition for all things on the contact page */
export const contactPageTransitions = [
	trigger('slideEnterQuickDelay', [
	transition(':enter', [generalStyleInfo.stylePre, animate('.5s ease-in-out', generalStyleInfo.stylePost)])
]),
trigger('slideEnterLongDelay', [
	transition(':enter', [generalStyleInfo.stylePre, animate('.5s .5s ease-in-out', generalStyleInfo.stylePost)]),
	transition(':leave', [generalStyleInfo.stylePost, animate('.5s ease-in-out', generalStyleInfo.stylePre)])
]),
trigger('toggleCookiePolicy', [
	transition(':enter', [generalStyleInfo.stylePre, animate('.5s ease-in-out', generalStyleInfo.stylePost)]),
	transition(':leave', [generalStyleInfo.stylePost, animate('.5s ease-in-out', generalStyleInfo.stylePre)])
])
]
