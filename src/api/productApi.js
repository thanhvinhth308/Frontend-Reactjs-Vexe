import axiosClient from "./axiosClient";
const productApi = {
  async getAll(params) {
    const newParams = { ...params };
    const productList = await axiosClient.get("/trips", { params: newParams });
    return productList;
  },
  async getTripBySearch(data) {
    const productList = await axiosClient.post("/trips/search", data);
    return productList;
  },
  async createTrip(data) {
    const formData = new FormData();
    formData.append("anh", data.anh);
    formData.append("tripData", JSON.stringify(data));
    const newTrip = await axiosClient.post("/trips", formData);
    return newTrip;
  },
  async updateTrip(data) {
    const newTrip = await axiosClient.put(`/trips/${data.tripId}`, data);
    return newTrip;
  },
  async deleteTrip(data) {
    const newTrip = await axiosClient.delete(`/trips/${data.tripId}`);
    return newTrip;
  },
};
export default productApi;
