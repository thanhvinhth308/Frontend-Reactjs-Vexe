import axiosClient from "./axiosClient";
const seatApi = {
  async getAll(params) {
    const newParams = { ...params };
    const productList = await axiosClient.get("/seats", { params: newParams });
    return productList;
  },
  async getById(id) {
    const productList = await axiosClient.get(`/seats/${id}`);
    return productList;
  },
  async getByTripId(id) {
    const productList = await axiosClient.get(`/seats/trip/${id}`);
    return productList;
  },
  async getByUserId(id) {
    const productList = await axiosClient.get(`/seats/user/${id}`);
    return productList;
  },
  async updateSeat(data) {
    const productList = await axiosClient.put(`/seats/${data.id}`, data);
    return productList;
  },
  async createSeats(data) {
    const newSeats = await axiosClient.post(`/seats`, {
      tripId: data.tripId,
      quantity: data.quantity,
      price: data.price,
    });
    return newSeats;
  },
};
export default seatApi;
