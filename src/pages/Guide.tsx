import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Guide.module.css";

const scrollSpeed = 1;

const siteGuide = {
    start: 2,
    end: 3
};

const creating = {
    start: 4,
    end: 5
};

const editing = {
    start: 6,
    end: 11
};

function Guide() {
    const alignCenter = { display: 'flex', alignItems: 'center' }
    const parallax = useRef<IParallax>(null!);
    
    return (
        <Parallax ref={parallax} pages={12} style={{ height: "90%" }}>
            <ParallaxLayer offset={0} speed={0.1} style={{ ...alignCenter, justifyContent: 'center'}}>
                <p className={styles.title}>
                    WORKBOOK.AC 사용 가이드
                </p>
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} speed={0.4} style={{ textAlign: 'center', justifyContent: 'center'}}>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} 
                    onClick={() => parallax.current.scrollTo(siteGuide.start)}>
                    &gt;&nbsp;&nbsp;사이트 이용
                </p>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} 
                    onClick={() => parallax.current.scrollTo(creating.start)}>
                    &gt;&nbsp;&nbsp;문제집 제작
                </p>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`}
                    onClick={() => parallax.current.scrollTo(editing.start)}>
                    &gt;&nbsp;&nbsp;문제집 편집
                </p>
            </ParallaxLayer>



            <ParallaxLayer sticky={siteGuide} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>사용법</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        둘러보기 탭
                    </h4>
                    <p>
                        둘러보기 탭에서는 문제집을 둘러보고 검색할 수 있습니다.<br/>
                        검색어가 없는 경우 좋아요 순, 최근 생성 된 순이 표시됩니다.<br/>
                        검색 결과의 경우 최근 생성된 순으로 표시됩니다.<br/>
                        문제집을 표지나 제목을 클릭하여 열람 가능합니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        나의 문제집 탭
                    </h4>
                    <p>
                        나의 문제집 탭에서는 내 문제집을 생성하고, 편집할 수 있습니다.<br/>
                        나의 문제집과 좋아요 한 문제집 목록을 확인할 수 있습니다.<br/>
                        두 목록 모두 사전순으로 정렬됩니다.
                    </p>
                </div>
            </ParallaxLayer>


            <ParallaxLayer sticky={creating} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>제작</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        문제집 생성
                    </h4>
                    <p>
                        문제집 생성은 나의 문제집 탭에서 가능합니다.<br/>
                        + 버튼으로 문제집을 생성할 수 있으며 문제집 제목은 25자까지 가능합니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={5} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        생성 후
                    </h4>
                    <p>
                        처음 문제집이 생성되면 기본 표지 사진과 함께 빈 문제집 상태입니다.<br/>
                        문제집 편집을 통하여 문제를 추가하고 표지 사진이나 제목을 수정할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>



            <ParallaxLayer sticky={editing} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>편집</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={6} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        편집 시작하기
                    </h4>
                    <p>
                        나의 문제집에서 좋아요 버튼 좌측의 편집 버튼으로 문제집 수정 메뉴를 열 수 있습니다.<br/>
                        메뉴에서 문제집 편집을 클락하여 편집 페이지로 이동할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={7} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        문제집 편집 페이지 구조
                    </h4>
                    <p>
                        문제집 편집 페이지로 들어오면,<br/>
                        우측에는 문제집 트리가 있고 좌측에는 문제 검색 탭이 있습니다.<br/>
                        상단에는 저장 버튼과 취소 버튼이 있으며, <br/>
                        저장 버튼을 눌러야 편집한 문제집이 서버에 저장됩니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={8} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        노드 선택하기
                    </h4>
                    <p>
                        문제집 트리에서 폴더나 문제에 대해 좌클릭, 우클릭을 하면 노드가 선택됩니다.<br/>
                        이때, 문제집 트리의 빈 곳에서 우클릭을 하면 선택된 커서를 해제할 수 있습니다.
                    </p>
                    <br/>
                    <h4>
                        문제 추가하기
                    </h4>
                    <p>
                        문제 검색 후 + 버튼을 눌러 문제를 추가할 수 있습니다.<br/>
                        이 때, 문제가 추가되는 위치는<br/>
                        선택된 노드가 폴더라면 폴더안에 문제가 추가되고, <br/>
                        선택된 노드가 문제라면 그 문제의 형제 노드로 추가됩니다.<br/>
                        문제는 최대 150개까지 추가할 수 있습니다.<br/>
                    </p>
                    <br/>
                    <h4>
                        문제 삭제하기
                    </h4>
                    <p>
                        문제집 트리에서 문제에 대해 우클릭을 하면 문제를 삭제할 수 있습니다.<br/>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={9} speed={scrollSpeed} style={{ ...alignCenter }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    <h4>
                        폴더 추가하기
                    </h4>
                    <p>
                        빈 공간에 대해 우클릭을 하면 폴더를 생성할 수 있습니다.
                        폴더에 대해 우클릭을 하면 해당 폴더 하위에 새 폴더를 생성할 수 있습니다.<br/>
                        폴더는 최대 50개까지 생성할 수 있으며<br/>
                        폴더 이름은 20자까지 가능합니다.
                    </p>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default Guide;