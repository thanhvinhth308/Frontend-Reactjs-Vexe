import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>Vé xe rẻ</h4>
            <ui className="list-unstyled">
              <li>Lê Thành Vinh-18521648</li>
              <li>Võ Hữu Trí-</li>
              <li>Nguyễn Lâm Trường</li>
              <li>Mai Tuấn Vũ</li>
            </ui>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Giáo viên hướng dẫn</h4>
            <ui className="list-unstyled">
              <li>Võ Ngọc Tân</li>
              <li>Phạm Thế Sơn</li>
            </ui>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Liên hệ</h4>
            <ui className="list-unstyled">
              <li>CNTT-2018</li>
              <li>Email:thanhvinhth308@gmail.com</li>
              <li>SDT:9999999999</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} THICC MEMES | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
