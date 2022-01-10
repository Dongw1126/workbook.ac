import React from 'react';
import styles from "./Issue.module.css";

function Issue() {

    return (
        <div className={styles.issueContainer}>
            <p className={styles.title}>건의하기</p>
            <p className={styles.content}>
                새 기능이나 버그에 대한 제보는 <a href="https://github.com/Dongw1126/workbook.ac-issues">Github Issue</a>를 통해 이루어지며, 누구나 자유롭게 제보할 수 있습니다.<br/>
                그 밖에 문의는 <a href="mailto:workbookac2021@gmail.com">workbookac2021@gmail.com</a> 로 메일 주시면 감사하겠습니다.<br/>
            </p>
        </div>
    );
}

export default Issue;