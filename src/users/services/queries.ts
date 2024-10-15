import axios from 'axios';

import { useQuery } from '@tanstack/react-query';

import { Option } from '../../types/option';
import { ApiGet } from '../types/apiTypes';
import { Schema } from '../types/schema';

export function useRegions() {
	return useQuery({
		queryKey: ['regions'],
		queryFn: () =>
			axios
				.get<Option[]>('http://localhost:8080/regions')
				.then((res) => res.data),
	});
}

export function useLanguages() {
	return useQuery({
		queryKey: ['languages'],
		queryFn: () =>
			axios
				.get<Option[]>('http://localhost:8080/languages')
				.then((res) => res.data),
	});
}

export function useGenders() {
	return useQuery({
		queryKey: ['genders'],
		queryFn: () =>
			axios
				.get<Option[]>('http://localhost:8080/genders')
				.then((res) => res.data),
	});
}

export function useSkills() {
	return useQuery({
		queryKey: ['skills'],
		queryFn: () =>
			axios
				.get<Option[]>('http://localhost:8080/skills')
				.then((res) => res.data),
	});
}

export function useUsers() {
	return useQuery({
		queryKey: ['users'],
		queryFn: (): Promise<Option[]> =>
			axios.get<ApiGet[]>('http://localhost:8080/users').then((response) =>
				response.data.map((user) => ({
					id: user.id.toString(),
					label: user.registrationDateAndTime,
				}))
			),
	});
}

export function useUser(id: string) {
	return useQuery({
		queryKey: ['user', { id }],
		queryFn: async (): Promise<Schema> => {
			const { data } = await axios.get<ApiGet>(
				`http://localhost:8080/users/${id}`
			);

			return {
				variant: 'edit',
				id: data.id.toString(),
				
				name: data.name,
				email: data.email,
				content: data.content,
				formerEmploymentPeriod: [
					new Date(data.formerEmploymentPeriod[0]),
					new Date(data.formerEmploymentPeriod[1]),
				],
				gender: data.gender,
				languagesSpoken: data.languagesSpoken,
				registrationDateAndTime: new Date(data.registrationDateAndTime),
				salaryRange: [data.salaryRange[0], data.salaryRange[1]],
				skills: data.skills,
				regions: data.regions,
				situations: data.situation,
				isSituationOption: data.isSituation,
				goals: data.goal,
				isGoalOption: data.isGoal,
			};
		},
		enabled: !!id,
	});
}
