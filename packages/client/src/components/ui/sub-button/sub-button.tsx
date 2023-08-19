import './sub-button.pcss';

type SubButtonProps = {
	label: string;
	onClick?: () => void;
};

function SubButton(props: SubButtonProps) {
	return (
		<button className="sub-button text-base-font-regular" onClick={props.onClick}>
			{props.label}
		</button>
	);
}

export default SubButton;
