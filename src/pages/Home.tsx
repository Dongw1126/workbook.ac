import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Home.module.css";

function Home() {
    const alignCenter = { display: 'flex', alignItems: 'center' }
    const parallax = useRef<IParallax>(null!);

    const logoProps = useSpring({
        to: { opacity: 1, marginRight: 0 },
        from: { opacity: 0, marginRight: 500 },
        config: { mass: 2 }
    });

    return (
        <Parallax ref={parallax} pages={6} style={{ height: "90%" }}>
            <ParallaxLayer
                offset={0}
                speed={0.1}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => parallax.current.scrollTo(1)}>
                <animated.div style={logoProps}>
                    <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
                </animated.div>
            </ParallaxLayer>

            <ParallaxLayer
                offset={1}
                speed={0.5}
            >
                <div className={styles.blackBar}></div>
            </ParallaxLayer>

            <ParallaxLayer
                factor={0.8}
                offset={1}
                speed={0.6}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.content}>
                    <p>
                        WORKBOOK.AC는 <a href="#">solved.ac</a>를 기반으로 만들어진 문제집 제작, 공유 플랫폼입니다.
                    </p>
                    원하는 문제를 골라 문제집을 만들어보고 <br />
                    사람들과 함께 공유해보세요. <br />
                    좋은 문제집을 발견했다면 좋아요도 눌러보세요.<br />
                </div>
            </ParallaxLayer>

            <ParallaxLayer sticky={{ start: 2, end: 4 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
                <div className={styles.sticky}>
                    <div className={styles.circle}></div>
                    <div className={styles.subTitle}>사용법</div>
                </div>
            </ParallaxLayer>


            <ParallaxLayer offset={2.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    asdasdasdasd
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={3.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    asdadasdads
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={4.5} speed={1.5} style={{ ...alignCenter, justifyContent: 'flex-end' }}>
                <div className={`${styles.usage} ${styles.content}`}>
                    asdadasdads
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={5} speed={2} style={{ backgroundColor: '#ff6d6d' }} />
            <ParallaxLayer
                offset={5}
                speed={0.5}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                }}>
                <p>Scroll up</p>
            </ParallaxLayer>
        </Parallax>
    );
}

export default Home;