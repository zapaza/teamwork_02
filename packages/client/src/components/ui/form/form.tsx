import Input, { InputsProps } from '../input/input';
import { Controller, useForm, UseFormProps } from 'react-hook-form';
import React from 'react';
import './form.pcss';
import { Button, ButtonsProps } from '@/components/ui//button/button';
import { yupResolver } from '@hookform/resolvers/yup';

export type FormProps = {
	name: string;
	title?: string;
	inputs: Array<InputsProps>;
	buttons?: Array<ButtonsProps>;
	validationSchema?: any;
	type: 'json' | 'formData';
	callback: (data: unknown) => Promise<void>;
};
export const Form = (props: FormProps) => {
	const validatorSettings: UseFormProps = {
		resolver: yupResolver(props.validationSchema),
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resetOptions: {
			keepDirtyValues: true,
			keepErrors: true,
		},
	};
	const {
		handleSubmit,
		getValues,
		control,
		formState: { errors },
	} = useForm(props.validationSchema ? validatorSettings : {});
	const getCallbackProps = (event: Event) => {
		return props.type == 'json'
			? (getValues() as unknown)
			: new FormData(event.target as HTMLFormElement);
	};
	const onSubmit = (data: unknown, event: Event) => {
		props.callback(getCallbackProps(event));
	};

	return (
		<div className={'form__container flex flex-column flex-jc-center flex-ai-center'}>
			{props.title && <h1 className={'form__header'}>{props.title}</h1>}
			<form
				className={'form__item flex flex-column flex-jc-center flex-ai-center'}
				//ts меня тут решил помучить, есть идеи как красиво это убрать оишбку?
				//@ts-ignore
				onSubmit={handleSubmit(onSubmit)}>
				{props.inputs.map((input, index) => (
					<Controller
						//ts меня тут решил помучить, есть идеи как красиво это убрать оишбку?
						name={input.name}
						control={control}
						defaultValue={input.value || ''}
						render={({ field }) => (
							<Input
								{...input}
								//ts меня тут решил помучить, есть идеи как красиво это убрать оишбку?
								error={errors[input.name]?.message as string}
								key={index.toString()}
								{...field}
							/>
						)}
						key={index.toString()}></Controller>
				))}
				<div className={'form__button-wrapper'}>
					{props.buttons?.map((button, index) => (
						<Button {...button} key={index.toString()}/>
					))}
				</div>
			</form>
		</div>
	);
};
