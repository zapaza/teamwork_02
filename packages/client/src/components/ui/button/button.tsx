import './button.pcss';
import React, { memo } from 'react';

export interface ButtonsProps extends React.ComponentPropsWithoutRef<'button'> {
	name: string;
	key?: string;
}

export const Button = memo((props: ButtonsProps) => {
	return <button className="button" {...props}/>;
});

Button.displayName = 'Button';
