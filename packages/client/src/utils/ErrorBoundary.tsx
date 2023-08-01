import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    state: {
        hasError: boolean
    }
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return <h5 className='text-xl-font-regular'>Что-то пошло не так. Пожалуйста, обновите страницу.</h5>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
