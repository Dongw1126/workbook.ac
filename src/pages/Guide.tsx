import { useRef } from 'react';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Guide.module.css";

const scrollSpeed = 0;
const totalPage = 14;

const pages = Array.from({length: totalPage}, (v, i) => i);
const getStarted = pages.slice(2, 5);
const creating = pages.slice(5, 7);
const editing = pages.slice(7, 14);

const getStartedSticky = {
    start: getStarted[0],
    end: getStarted[getStarted.length - 1]
};

const creatingSticky = {
    start: creating[0],
    end: creating[creating.length - 1]
};

const editingSticky = {
    start: editing[0],
    end: editing[editing.length - 1]
};

function Guide() {
    const alignCenter = { 
        display: 'flex', 
        alignItems: 'center',
    };

    const parallax = useRef<IParallax>(null!);
    
    return (
        <Parallax ref={parallax} pages={totalPage} style={{ height: "90%" }}>
            <ParallaxLayer offset={0} speed={0.1} style={{ ...alignCenter, justifyContent: 'center'}}>
                <p className={styles.title}>
                    WORKBOOK.AC 사용 가이드
                </p>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.4} style={{ textAlign: 'center', justifyContent: 'center'}}>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} 
                    onClick={() => parallax.current.scrollTo(getStartedSticky.start)}
                >
                    &gt;&nbsp;&nbsp;사이트 이용
                </p>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} 
                    onClick={() => parallax.current.scrollTo(creatingSticky.start)}
                >
                    &gt;&nbsp;&nbsp;문제집 제작
                </p>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`}
                    onClick={() => parallax.current.scrollTo(editingSticky.start)}
                >
                    &gt;&nbsp;&nbsp;문제집 편집
                </p>
            </ParallaxLayer>



            <ParallaxLayer sticky={getStartedSticky} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>사용법</div>
                </div>
            </ParallaxLayer>

        <ParallaxLayer offset={getStarted[0]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        둘러보기 탭
                    </h3>
                    <p>
                        둘러보기 탭에서는 문제집을 둘러보고 검색할 수 있습니다.<br/>
                        검색어가 없는 경우 좋아요 순, 최근 생성 된 순이 표시됩니다.<br/>
                        검색 결과의 경우 사전순으로 표시됩니다.<br/>
                        문제집을 표지나 제목을 클릭하여 열람 가능합니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={getStarted[1]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        나의 문제집 탭
                    </h3>
                    <p>
                        나의 문제집 탭에서는 내 문제집을 생성하고, 편집할 수 있습니다.<br/>
                        문제집 편집, 이름 바꾸기, 표지 바꾸기, 문제집 삭제 기능을 수행할 수 있습니다.<br/>
                        나의 문제집 목록은 사전순으로 정렬됩니다.<br/><br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={getStarted[2]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        좋아요 목록
                    </h3>
                    <p>
                        좋아요 목록 탭에서는 좋아요를 누른 문제집을 확인할 수 있습니다.<br/>
                        좋아요 목록도 동일하게 사전순으로 정렬됩니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer sticky={creatingSticky} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>제작</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={creating[0]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        문제집 생성
                    </h3>
                    <p>
                        문제집 생성은 나의 문제집 탭에서 가능합니다.<br/>
                        + 버튼으로 문제집을 생성할 수 있으며 문제집 제목은 25자까지 가능합니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={creating[1]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        생성 후
                    </h3>
                    <p>
                        처음 문제집이 생성되면 기본 표지 사진과 함께 빈 문제집 상태입니다.<br/>
                        문제집 편집을 통하여 문제를 추가하고 표지 사진이나 제목을 수정할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer sticky={editingSticky} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>편집</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[0]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        편집 시작하기
                    </h3>
                    <p>
                        나의 문제집에서 좋아요 버튼 좌측의 편집 버튼으로 문제집 수정 메뉴를 열 수 있습니다.<br/>
                        메뉴에서 문제집 편집을 클락하여 편집 페이지로 이동할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[1]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        문제집 편집 페이지 구조
                    </h3>
                    <p>
                        문제집 편집 페이지로 들어오면,<br/>
                        우측에는 문제집 트리가 있고 좌측에는 문제 검색 탭이 있습니다.<br/>
                        드래그 앤 드롭으로 문제와 폴더들을 정렬할 수 있습니다.<br/>
                        상단에는 저장 버튼과 취소 버튼이 있으며, <br/>
                        저장 버튼을 눌러야 편집한 문제집이 서버에 저장됩니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[2]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        노드 선택하기
                    </h3>
                    <p>
                        문제집 트리에서 폴더나 문제에 대해 좌클릭, 우클릭을 하면 노드가 선택됩니다.<br/>
                        이때, 문제집 트리의 빈 곳에서 우클릭을 하면 선택된 커서를 해제할 수 있습니다.
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[3]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        문제 추가하기
                    </h3>
                    <p>
                        문제 검색 후 + 버튼을 눌러 문제를 추가할 수 있습니다.<br/>
                        이 때, 문제가 추가되는 위치는<br/>
                        선택된 노드가 폴더라면 폴더안에 문제가 추가되고, <br/>
                        선택된 노드가 문제라면 그 문제의 형제 노드로 추가됩니다.<br/>
                        문제는 최대 150개까지 추가할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[4]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        문제 삭제하기
                    </h3>
                    <p>
                        문제집 트리에서 문제에 대해 우클릭을 하면 문제를 삭제할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>            

            <ParallaxLayer offset={editing[5]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        폴더 추가하기
                    </h3>
                    <p>
                        빈 공간에 대해 우클릭을 하면 폴더를 생성할 수 있습니다.<br/>
                        폴더에 대해 우클릭을 하면 해당 폴더 하위에 새 폴더를 생성할 수 있습니다.<br/>
                        폴더는 최대 50개까지 생성할 수 있으며<br/>
                        폴더 이름은 20자까지 가능합니다.
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={editing[6]} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h3>
                        폴더 삭제하기
                    </h3>
                    <p>
                        폴더를 우클릭하면 폴더를 삭제할 수 있습니다.<br/>
                        폴더 삭제 시 폴더 하위에 있는 것들이 함께 삭제됩니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default Guide;