import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Home.module.css";

function Home() {
    const parallax = useRef<IParallax>(null!);

    const handleScroll = () => {
        if (parallax.current) {
            console.log(window.innerHeight)
            console.log(parallax)
        }
    };

    useEffect(() => {
        const container = document.querySelector('#home-parallax-root');
        container?.addEventListener('scroll', handleScroll);
        return () => {
            container?.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const logoProps = useSpring({
        to: { opacity: 1, marginRight: 0 },
        from: { opacity: 0, marginRight: 500 },
        config: { mass: 2 }
    });

    return (
        <Parallax ref={parallax} pages={4} style={{ height: "90%" }} id="home-parallax-root">
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

            <ParallaxLayer
                offset={1.9}
                speed={0.5}
            >
                <div className={styles.blackBar} style={{ float: "right" }}></div>
            </ParallaxLayer>

            <ParallaxLayer
                factor={1}
                offset={1.9}
                speed={0.6}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className={styles.content}>
                    <p>
                        문제집을 써보고 싶으시다면 ⟶ <a href="#">문제집 둘러보기</a>
                    </p>
                    <p>
                        문제집을 직접 만들어보려면 ⟶ <a href="#">문제집 만들어보기</a>
                    </p>
                    <p>
                        이 프로젝트에 기여하고 싶으시다면 ⟶ <a href="#">기여하기</a>
                    </p>
                </div>
            </ParallaxLayer>

            <ParallaxLayer
                offset={2.8}
                speed={0.5}
            >
                <div style={{ textAlign: "center", fontSize: 48 }}>
                    And...
                </div>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={2} style={{ backgroundColor: '#ff6d6d' }} />
            <ParallaxLayer
                offset={3}
                speed={1}
                style={{
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: 50
                }}
            >
                <div>
                    <p>Thank you for visiting!</p>
                    <div style={{ width:"100%", textAlign: "center"}}>🎉</div>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
}

export default Home;