import React from 'react';

export const CommonWrapper: React.FC = (props) => {
    return (
        <div>
            {props.children}
        </div>
    );
};
