import axiosClient from "./axiosClient";
const ticketApi = {
  async createTicket(data) {
    const ticket = await axiosClient.post("/ticket", data);
    return ticket;
  },
  async getTicketByUserId(data) {
    const ticket = await axiosClient.post("/ticket/userId", data);
    return ticket;
  },
};
export default ticketApi;
