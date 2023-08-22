import './sub-button.pcss';

type SubButtonProps = {
	label: string;
	onClick?: () => void;
};

export const SubButton = (props: SubButtonProps) => {
	return (
		<button className="sub-button text-base-font-regular" onClick={props.onClick}>
			{props.label}
		</button>
	);
};
