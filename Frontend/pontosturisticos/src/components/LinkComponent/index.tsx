import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface LinkProp  {
    title: string,
    caminho: string,
}

export function LinkComponent({ title, caminho }: LinkProp) {
    return (
        <Link 
            to={caminho}
        >
            <span>
                {title}
            </span>
        </Link>
    )
}