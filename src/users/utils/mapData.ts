import { ApiCommon, ApiCreateEdit } from '../types/apiTypes';
import { Schema } from '../types/schema';

export function mapData(data: Schema): ApiCreateEdit {
	const common: ApiCommon = {
		email: data.email,
		formerEmploymentPeriod: [
			data.formerEmploymentPeriod[0].toString(),
			data.formerEmploymentPeriod[1].toString(),
		],
		name: data.name,
		gender: data.gender,
		languagesSpoken: data.languagesSpoken,
		registrationDateAndTime: data.registrationDateAndTime.toString(),
		salaryRange: [data.salaryRange[0], data.salaryRange[1]],
		skills: data.skills,
		regions: data.regions,
		isSituation: data.isSituationOption,
		situation: data.isSituationOption=== true ? data.situations : [],
		isGoal: data.isGoal,
		goal: data.isGoalOption=== true ? data.goal : [],
		isSituation: data.isSituationOption,
		situation: data.isSituationOption=== true ? data.situations : [],
	};

	switch (data.variant) {
		case 'create': {
			return { ...common, variant: data.variant };
		}
		case 'edit': {
			return { ...common, id: data.id, variant: data.variant };
		}
	}
}
