import { z } from 'zod';

import { patterns } from '../../constants';
const minChar=50;
const maxChar=250;
export const schema = z
	.intersection(
		z.object({
			name: z.string().min(1, { message: 'Required' }),
			email: z
				.string()
				.min(1, { message: 'Email is required' })
				.refine((text) => patterns.email.test(text), {
					message: 'Email not valid',
				}),
			content: z.string()
					.min(0,{message: ''})
					.max(500,{message: ''}),
			regions: z.array(z.string()).min(1).max(4),
			languagesSpoken: z.array(z.string()),
			gender: z.string().min(1),
			skills: z.array(z.string()).max(2),
			registrationDateAndTime: z.date(),
			formerEmploymentPeriod: z.array(z.date()).min(2).max(2),
			salaryRange: z.array(z.number()).max(2),
		}),

		z.discriminatedUnion('variant', [
			z.object({ variant: z.literal('create') }),
			z.object({ variant: z.literal('edit'), id: z.string().min(1) }),
		])
	)
	.and(
		z.union([
			z.object({ isSituationOption: z.literal(false) }),
			z.object({
				isSituationOption: z.literal(true),

				situations: z.array(
					z.object({
						name: z.string().min(4),
					})
				),
			}),
		])
	).and(
		z.union([
			z.object({ isGoalOption: z.literal(false) }),
			z.object({
				isGoalOption: z.literal(true),

				goals: z.array(
					z.object({
						name: z.string().min(minChar).max(maxChar),
					})
				),
			}),
		])).and(
			z.union([
				z.object({ isActionOption: z.literal(false) }),
				z.object({
					isActionOption: z.literal(true),
	
					actions: z.array(
						z.object({
							name: z.string().min(4),
						})
					),
				}),
			])).and(
				z.union([
					z.object({ isResultOption: z.literal(false) }),
					z.object({
						isResultOption: z.literal(true),
		
						results: z.array(
							z.object({
								name: z.string().min(4),
							})
						),
					}),
				]));

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
	variant: 'create',
	email: 'joseph.keays@sky.uk',
	name: 'demo_account',
	content:'',
	regions: [],
	languagesSpoken: [],
	gender: '',
	skills: [],
	registrationDateAndTime: new Date(),
	formerEmploymentPeriod: [new Date(), new Date()],
	salaryRange: [0, 2000],
	isSituationOption: true,
	isGoalOption: true,
	isActionOption: true,
	isResultOption: true,
};
