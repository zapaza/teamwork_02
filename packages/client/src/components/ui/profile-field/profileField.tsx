import './profile-field.pcss';

type ProfileFieldProps = {
	label: string;
	value?: string;
};

export const ProfileField = (props: ProfileFieldProps) => {
	return (
		<div className="profile-field flex flex-jc-sb flex-ai-center">
			<label className="profile-field__label">{props.label}</label>
			<p className="profile-fields__value">{props.value}</p>
		</div>
	);
};
