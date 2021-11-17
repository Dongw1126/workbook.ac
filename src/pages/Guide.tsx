import React, { useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import styles from "./Guide.module.css";

function Guide() {
    const alignCenter = { display: 'flex', alignItems: 'center' }
    const parallax = useRef<IParallax>(null!);
    
    return (
        <Parallax ref={parallax} pages={4} style={{ height: "90%" }}>
            <ParallaxLayer sticky={{ start: 0, end: 4 }} style={{ ...alignCenter, justifyContent: 'flex-start' }}>
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

export default Guide;