import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Home.module.css";

function Home() {
    const parallax = useRef<IParallax>(null!);

    const logoProps = useSpring({
        to: { opacity: 1, marginRight: 0 },
        from: { opacity: 0, marginRight: 500 },
        config: { mass: 2 }
    });

    const arrowProps = useSpring({
        to: { opacity: 1, marginBottom: 0 },
        from: { opacity: 0.3, marginBottom: 50 },
    });

    return (
        <Parallax ref={parallax} pages={3} >
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
                speed={0.4}
                >
                    <div className={styles.blackBar}></div>
            </ParallaxLayer>

            <ParallaxLayer
                factor={0.5}
                offset={1}
                speed={0.5}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.content}>
                    WORKBOOK.AC는 <a href="#">solved.ac</a>를 기반으로 만들어진 문제집 제작, 공유 플랫폼입니다.<br/>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br/>
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br/>
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <br/>
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br/>
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={2} style={{ backgroundColor: '#ff6d6d' }} />

            <ParallaxLayer
                offset={2}
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

/*
        <div style={{ textAlign: "center" }}>
            <animated.div style={logoProps}>
                <img src={process.env.PUBLIC_URL + '/logo.svg'} alt="" />
            </animated.div>
            <div className={styles.content}>
                WORKBOOK.AC는 <a href="#">solved.ac</a>를 기반으로 만들어진 문제집 제작, 공유 플랫폼입니다.
            </div>
        </div>
*/