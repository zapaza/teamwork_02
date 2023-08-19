import React, { ReactNode } from 'react';
import './modal.pcss';

export type ModalProps = {
	isOpen: boolean;
	toggle: () => void;
	children?: ReactNode;
};

export const Modal = (props: ModalProps) => {
	return props.isOpen ? (
		<div className="modal flex flex-ai-center flex-jc-center" onClick={props.toggle}>
			<div className="modal__container" onClick={event => event.stopPropagation()}>
				{props.children}
			</div>
		</div>
	) : null;
};
