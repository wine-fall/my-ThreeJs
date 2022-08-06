import React from 'react';
import styles from './index.module.less';

export const CommonWrapper: React.FC = (props) => {
    return (
        <div className={styles.commonWrapper}>
            {props.children}
        </div>
    );
};
