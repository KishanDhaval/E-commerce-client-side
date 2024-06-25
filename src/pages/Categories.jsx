import React from 'react'
import Layout from '../components/Layouts/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'
import styles from '../../public/styles/Categories.module.css'

const Categories = () => {
    const {categories} = useCategory()

    return (
        <Layout title={'All Categories'}>
            <div className={styles.container}>
                <div className={styles.row}>
                    {categories?.map((c) => (
                        <div className={styles.categoryCard} key={c._id}>
                            <Link to={`/category/${c.slug}`} className={styles.categoryTitle} value={c._id}>
                                {c.name}
                            </Link>
                            {c.children?.length > 0 && (
                                <div className={styles.subcategoryList}>
                                    {c.children.map((sub) => (
                                        <Link to={`/category/${sub.slug}`} className={styles.subcategoryItem} key={sub._id} value={sub._id}>
                                            -- {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories
