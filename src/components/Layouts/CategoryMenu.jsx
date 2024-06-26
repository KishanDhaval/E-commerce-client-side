import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'

const CategoryMenu = ({ categories }) => {
  

  return (
    <li className={styles.has_dropdown}>
      <Link to="#">Category <i className="fas fa-angle-down"></i></Link>
      <ul className={styles.sub_menu}>
        <li><Link to="/categories">All Categories</Link></li>
        {categories?.map((c) => (
          <li key={c._id} className={styles.has_dropdown2}>
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
            {c?.children?.length > 0 && (
              <ul className={styles.sub_menu2}>
                {c?.children?.map((sub) => (
                  <li key={sub._id}>
                    <Link to={`/category/${sub.slug}`}>{sub.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </li>
  );
};

export default CategoryMenu;
