import { FC, ReactNode } from 'react';
import './wrapper.pcss';

type OwnProps = {
	children?: ReactNode;
	className?: string;
};

type WrapperProps = FC<OwnProps>;

export const Wrapper: WrapperProps = (props: OwnProps) => {
	return (
		<div className={`wrapper flex flex-column gap-16 ${props.className}`}>{props.children}</div>
	);
};
