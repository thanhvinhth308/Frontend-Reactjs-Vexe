import axiosClient from "./axiosClient";
const emailApi = {
  async sendEmail(data) {
    const email = await axiosClient.post("/email", data);
    return email;
  },
};
export default emailApi;
