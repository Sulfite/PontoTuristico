import React from 'react';

import './styles.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
}

export function Button({ title, ...props }: ButtonProps) {
    return(
        <button 
            className="containerButton"
            {...props}
        >
            {title}
        </button>
    );
}