type Create = {
	variant: 'create';
};

type Edit = {
	variant: 'edit';
	id: number;
};

export type ApiCommon = {
	email: string;
	name: string;
	content: string;
	regions: string[];
	gender: string;
	languagesSpoken: string[];
	skills: string[];
	registrationDateAndTime: string;
	formerEmploymentPeriod: [string, string];
	salaryRange: [number, number];
	isSituation: boolean;
	situations: {
		name: string;
	isGoal: boolean;
	goals: {
		name: string;
	}[];
};

export type ApiCreateEdit = ApiCommon & (Create | Edit);
export type ApiGet = Edit & ApiCommon;
