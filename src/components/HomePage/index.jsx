import React from "react";
import PropTypes from "prop-types";
import styles from "./HomePage.module.css";
HomePage.propTypes = {};

function HomePage(props) {
  return (
    <div className={styles.box}>
      <div className="container">
        <h2 className="text-warning text-center item">Di chuyển an toàn</h2>
        <h2 className="text-light text-center item2">
          Vexere đồng hành cùng bạn
        </h2>
        <h2 className="text-center text-secondary">
          VeXeRe - Cam kết hoàn 150% nếu nhà xe không giữ vé
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
