import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string,
}

export function Button({ title, ...props }: ButtonProps) {
    return(
        <button>
            {title}
        </button>
    );
}