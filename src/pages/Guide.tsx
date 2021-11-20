import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Guide.module.css";

function Guide() {
    const alignCenter = { display: 'flex', alignItems: 'center' }
    const parallax = useRef<IParallax>(null!);
    
    return (
        <Parallax ref={parallax} pages={6} style={{ height: "90%" }}>
            <ParallaxLayer offset={0} speed={0.1} style={{ ...alignCenter, justifyContent: 'center'}}>
                <p className={styles.title}>
                    WORKBOOK.AC 사용해보기
                </p>
            </ParallaxLayer>

            <ParallaxLayer offset={1.2} speed={0.4} style={{ textAlign: 'center', justifyContent: 'center'}}>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} 
                    onClick={() => parallax.current.scrollTo(2)}>
                    사용법
                </p>
                <p 
                    className={`${styles.contentsTable} ${styles.subTitle}`} >
                    건의하기
                </p>
            </ParallaxLayer>

            <ParallaxLayer sticky={{ start: 2, end: 5 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>사용법</div>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    내용1
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    내용2
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    내용3
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default Guide;