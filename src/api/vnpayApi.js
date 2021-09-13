import axiosClient from "./axiosClient";
const vnpayApi = {
  async payPrice(totalPrice) {
    const url = await axiosClient.post("/vnpay/create_payment_url", {
      orderType: "250000",
      amount: `${totalPrice}`,
      orderDescription: "Thanh toan don hang thoi gian",
      bankCode: "",
      language: "vn",
    });
    return url.data;
  },
};
export default vnpayApi;
