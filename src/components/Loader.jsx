import React from 'react'
import styles from './Loader.module.css'
const Loader = () => {
    return (
        <div > 
            <section class={styles.dots_container}>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
            </section>
        </div>
    )
}

export default Loader

