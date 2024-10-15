import { Fragment, useEffect } from 'react';
import {
	SubmitHandler,
	useFieldArray,
	useFormContext,
	useWatch,
} from 'react-hook-form';

import {
	Button,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListSubheader,
	Stack,
	Typography,
} from '@mui/material';

import { RHFAutocomplete } from '../../components/RHFAutocomplete';
import { RHFCheckbox } from '../../components/RHFCheckbox';
import { RHFDateRangePicker } from '../../components/RHFDateRangePicker';
import { RHFDateTimePicker } from '../../components/RHFDateTimePicker';
import { RHFRadioGroup } from '../../components/RHFRadioGroup';
import { RHFSlider } from '../../components/RHFSlider';
import { RHFSwitch } from '../../components/RHFSwitch';

import { RHFTextField } from '../../components/RHFTextField';
import { RHFToggleButtonGroup } from '../../components/RHFToggleButtonGroup';
import { useCreateUser, useEditUser } from '../services/mutations';
import { 
	useGenders,
	useLanguages,
	useSkills,
	useRegions,
	useUser,
	useUsers,
} from '../services/queries';
import { defaultValues, Schema } from '../types/schema';

export function Users() {
	const regionsQuery = useRegions();
	const languagesQuery = useLanguages();
	const gendersQuery = useGenders();
	const skillsQuery = useSkills();
	const usersQuery = useUsers();

	const { watch, control, unregister, reset, setValue, handleSubmit } =
		useFormContext<Schema>();

	const id = useWatch({ control, name: 'id' });
	const variant = useWatch({ control, name: 'variant' });

	const userQuery = useUser(id);

	useEffect(() => {
		const sub = watch((value) => {
			console.log(value);
		});

		return () => sub.unsubscribe();
	}, [watch]);

	const isSituationOption = useWatch({ control, name: 'isSituationOption' });
	const isGoalOption = useWatch({ control, name: 'isGoalOption' });
	const isActionOption = useWatch({ control, name: 'isActionOption' });
	const isResultOption = useWatch({ control, name: 'isResultOption' });

	const { append, fields, remove, replace } = useFieldArray({
		control,
		name: 'situations'	});

	
	const handleUserClick = (id: string) => {
		setValue('id', id);
	};

	useEffect(() => {
		if (!isSituationOption) {
			replace([]);
			unregister('situations');
		}
	}, [isSituationOption, replace, unregister]);

	useEffect(() => {
		if (!isGoalOption) {
			replace([]);
			unregister('goal');
		}
	}, [isGoalOption, replace, unregister]);

	useEffect(() => {
		if (!isActionOption) {
			replace([]);
			unregister('action');
		}
	}, [isActionOption, replace, unregister]);

	useEffect(() => {
		if (!isResultOption) {
			replace([]);
			unregister('result');
		}
	}, [isResultOption, replace, unregister]);

	useEffect(() => {
		if (userQuery.data) {
			reset(userQuery.data);
		}
	}, [reset, userQuery.data]);

	const handleReset = () => {

		reset(defaultValues);
	};

	const createUserMutation = useCreateUser();
	const editUserMutation = useEditUser();

	const onSubmit: SubmitHandler<Schema> = (data) => {
		if (variant === 'create') {
			createUserMutation.mutate(data);
		} else {
			editUserMutation.mutate(data);
		}
	};
	return (
		<Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
			<Stack sx={{ flexDirection: 'row', gap: 2 }}>
			<List subheader={<ListSubheader>Menu</ListSubheader>}>
					
						<ListItem>1. Back</ListItem>
						
						
				</List>
				<List subheader={<ListSubheader>Submissions</ListSubheader>}>
					{usersQuery.data?.map((user) => (
						<ListItem disablePadding key={user.id}>
							<ListItemButton
								onClick={() => handleUserClick(user.id)}
								selected={id === user.id}
							>
								<ListItemText primary={user.label} />
							</ListItemButton>
						</ListItem>
					))}
				</List>

				<Stack sx={{ gap: 2 }}>
					
				<RHFDateTimePicker<Schema>
						name="registrationDateAndTime"
						label="Date"
						
					/>
					
					<RHFTextField<Schema> name="name" label="Name" />
					<RHFTextField<Schema> name="email" label="Email" />
						<div className='submissionContent'>
					<Typography>Content for Submission:</Typography>
					<RHFSwitch<Schema> name="isSituationOption" label="Situation/Context" />

					

{fields.map((field, index) => (
	<Fragment key={field.id}>
		<RHFTextField<Schema> multiline rows={5}
			name={`situations.${index}.name`}
			label="Situation"
		/>
		<Button
			color="error"
			onClick={() => {
				remove(index);
			}}
			type="button"
		>
			Remove Situation/Context
		</Button>
	</Fragment>
))}
{isSituationOption && (
	
	<Button onClick={() => append({ name: 'situationClick' })} type="button">
		Add Situation/Context
	</Button>
		
)}

<RHFSwitch<Schema> name="isGoalOption" label="Goal/Context" />

					

{fields.map((field, index) => (
	<Fragment key={field.id}>
		<RHFTextField<Schema> multiline rows={5}
			name={`goals.${index}.name`}
			label="Goal"
		/>
		<Button
			color="error"
			onClick={() => {
				remove(index);
			}}
			type="button"
		>
			Remove Goal/Objective
		</Button>
	</Fragment>
))}
{isGoalOption && (
	
	<Button onClick={() => append({ name: '' })} type="button">
		Add Goal/Objective
	</Button>
		
)}

<RHFSwitch<Schema> name="isActionOption" label="Action Taken" />

					

{fields.map((field, index) => (
	<Fragment key={field.id}>
		<RHFTextField<Schema> multiline rows={5}
			name={`actions.${index}.name`}
			label="Action"
		/>
		<Button
			color="error"
			onClick={() => {
				remove(index);
			}}
			type="button"
		>
			Remove Action
		</Button>
	</Fragment>
))}
{isActionOption && (
	
	<Button onClick={() => append({ name: '' })} type="button">
		Add Action
	</Button>
		
)}



<RHFSwitch<Schema> name="isResultOption" label="Result" />

					

{fields.map((field, index) => (
	<Fragment key={field.id}>
		<RHFTextField<Schema> multiline rows={5}
			name={`results.${index}.name`}
			label="Results"
		/>
		<Button
			color="error"
			onClick={() => {
				remove(index);
			}}
			type="button"
		>
			Remove Result
		</Button>
	</Fragment>
))}
{isResultOption && (
	
	<Button onClick={() => append({ name: '' })} type="button">
		Add Result
	</Button>
		
)}




</div>



					
					<RHFAutocomplete<Schema>
						name="regions"
						label="Region(s)"
						options={regionsQuery.data}
					/>
					<RHFToggleButtonGroup<Schema>
						name="languagesSpoken"
						options={languagesQuery.data}
					/>
					<RHFRadioGroup<Schema>
						name="gender"
						options={gendersQuery.data}
						label="Privacy"
					/>
					<Typography>*Admins may have to access when necessary</Typography>
					<RHFCheckbox<Schema>
						name="skills"
						options={skillsQuery.data}
						label="Type"
					/>
					<RHFTextField<Schema> name="content" multiline rows={2} label="Notes" />
					

					
					
					
					

					<Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
						<Button variant="contained" type="submit">
							{variant === 'create' ? 'Submit' : 'Edit/Update'}
						</Button>
						<Button onClick={handleReset}>Clear</Button>
					</Stack>
				
				</Stack>
				

			</Stack>
		</Container>
	);
}
