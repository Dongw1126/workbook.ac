import styles from "./Issue.module.css";

function Issue() {
    return (
        <div className={styles.issueContainer}>
            <p className={styles.title}>건의하기</p>
            <p className={styles.content}>
                새 기능이나 버그에 대한 이야기는 <a href="https://github.com/Dongw1126/workbook.ac/issues">Github</a>을 통해 이루어지며, 누구나 자유롭게 이용하실 수 있습니다.<br/>
                그 밖에 문의는 <a href="mailto:workbookac2021@gmail.com">workbookac2021@gmail.com</a> 로 메일 주시면 감사하겠습니다.<br/>
            </p>
            {/*<br/><br/><br/><br/><br/><br/>
            <p className={styles.content}>
                <span className={styles.subTitle}>
                    <b>TODO</b>
                </span>
                <br/>
                <ul style={{ listStyleType: "circle" }}>
                    <li>UI 개선</li>
                    <li>개별 프로필</li>
                    <li>검색 기능 개선</li>
                    <li>자동 완성</li>
                    <li>사용자 탈퇴 기능</li>
                </ul>
            </p>*/}
        </div>
    );
}

export default Issue;