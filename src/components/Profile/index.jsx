import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Profile.module.css";
import ticketApi from "../../api/ticketApi";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
Profile.propTypes = {};

function Profile(props) {
  const user = useSelector((state) => state.user.current);
  const [ticket, setTicket] = useState([]);
  useEffect(() => {
    const getTicket = async () => {
      const ticket = await ticketApi.getTicketByUserId({ id: user.id });
      setTicket(ticket);
    };
    getTicket();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cardinfo}>
        <div className={styles.left}>
          <div className={styles.img}>
            <img src="http://localhost:7000/public/images/dog.png" alt="" />
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.normalinfo}>
            <div className={styles.namebar}>
              <div className={styles.noneu}>ID user</div>
              <div className={styles.noneu}>{user.id}</div>
            </div>
            <div className={styles.namebar}>
              <div className={styles.noneu}>Name</div>
              <div className={styles.noneu}>{user.name}</div>
            </div>
            <div className={styles.namebar}>
              <div className={styles.noneu}>Email</div>
              <div className={styles.noneu}>{user.email}</div>
            </div>
            <div className={styles.namebar}>
              <div className={styles.noneu}>Phone number </div>
              <div className={styles.noneu}>{user.numberPhone}</div>
            </div>
          </div>
          <div className={styles.detailinfo}>
            <hr />
            <div style={{ textAlign: "center" }}>
              <h3>Các hoá đơn đã đặt</h3>
            </div>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "pink" }}>
                    <TableCell align="center">Bill ID</TableCell>
                    <TableCell align="center">Tổng tiền</TableCell>
                    <TableCell align="center">Trạng thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ticket.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row" align="center">
                        {item.id}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price)}
                      </TableCell>
                      <TableCell align="center">sucsess</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
