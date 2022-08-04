import React from 'react';
import styles from './index.module.less';

export const CommonWrapper: React.FC = (props) => {
    return (
        <div className={styles.commonWrapper}>
            <div className={styles.canvasWrapper}>
                {props.children}
            </div>
        </div>
    );
};
