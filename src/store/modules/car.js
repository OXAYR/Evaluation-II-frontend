import axios from "axios";
import user from "./user.js";
export default {
  namespaced: true,
  state: {
    car: {
      cars: [],
    },
    filteredCar: {
      cars: [],
    },
  },
  getters: {
    getCars(state) {
      console.log("in the movie getter list----> ", state.car.cars);
      return state.car.cars;
    },
    getSelectedCar(state) {
      console.log("in the selected car getter---->", state.filteredCar.cars);
      return state.filteredCar.cars;
    },
  },
  mutations: {
    SET_CAR_LIST(state, payload) {
      console.log("in the car setter--->", payload);
      state.car.cars = payload;
    },
    SET_FILTERED_CAR(state, data) {
      console.log("in the filteredd car setter--->", data);

      state.filteredCar.cars = data;
      console.log("in the filteredd car setter--->", state.filteredCar.cars);
    },
    ADD_CAR(state, data) {
      console.log("in the add car setter now--->", data);
      const { userRole } = JSON.parse(localStorage.getItem("user"));
      console.log(userRole);
      if (userRole.toLowerCase() === "manager")
        state.filteredCar.cars = [...state.filteredCar.cars, data];
      else if (userRole.toLowerCase() === "owner")
        state.car.cars = [...state.car.cars, data];

      console.log(
        "in the add car setter after adding--->",
        state.filteredCar.cars
      );
    },

    REMOVE_CAR(state, id) {
      console.log("in the mutation of remove car---------------->", id);
      state.filteredCar.cars = state.filteredCar.cars.filter(
        (car) => car._id !== id
      );
    },
    UPDATE_CAR(state, id, data) {
      const finded = state.car.cars.find(id);
      console.log(finded);
      state.car.cars.splice(id, 1, data);
    },
  },
  actions: {
    async addCar({ commit }, payload) {
      try {
        const { _id } = JSON.parse(localStorage.getItem("user"));
        console.log("token---->");
        const newPayload = { managerId: _id, ...payload };
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/cars", newPayload, config);
        console.log("car created:", data);
        commit("ADD_CAR", data.data);
      } catch (error) {
        console.error("Error creating movie:", error);
        // alert(error.response.data.message);
      }
    },

    async fetchCarById({ commit }, id) {
      try {
        const token = user.state.user.token;
        console.log("id in the fetch----> ", id.carId);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/cars/${id}`, config);
        console.log(data);
        commit("SET_FILTERED_CAR", data.data.car);
      } catch (error) {
        console.error("Error fetching cars:", error);
        // alert(error.response.data.message);
      }
    },

    async deleteCar({ commit }, id) {
      try {
        console.log(id);
        commit("REMOVE_CAR", id);
        const token = user.state.user.token;
        console.log("token in the fetch----> ", token);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        await axios.delete(`/cars/${id}`, config);
      } catch (error) {
        console.error("Error deleting car:", error);
        // alert(error.response.data.message);
      }
    },

    async updateCar(_, { indx, updateCar }) {
      try {
        console.log("in the update car----> ", indx);
        const token = user.state.user.token;
        console.log("token in the update----> ", token);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        console.log("indx----->", indx, updateCar);
        await axios.put(`/cars/${indx}`, updateCar, config);
      } catch (error) {
        console.error("Error updating car:", error);
        alert(error.response.data.message);
      }
    },
    async updateCarStatus(_, id) {
      try {
        console.log("in the update car----> ", id);
        const token = user.state.user.token;
        console.log("token in the update----> ", token);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };

        console.log("indx----->", id, config);
        await axios.put(`/cars/status/${id}`, _, config);
      } catch (error) {
        console.error("Error updating car:", error);
        // alert(error.response.data.message);
      }
    },

    async fetchCarsByManagerId({ commit }, id) {
      try {
        console.log("id in the fetch----> ", id);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/cars/manager/${id}`, config);
        console.log(data.data.cars);
        if (data) commit("SET_FILTERED_CAR", data.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        // alert(error.response.data.message);
      }
    },

    async fetchCars({ commit }) {
      try {
        const token = JSON.parse(localStorage.getItem("userAuth"));
        console.log("token in the fetch----> ", token);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get("/cars", config);
        console.log(data);
        commit("SET_CAR_LIST", data.data.cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        // alert(error.response.data.message);
      }
    },
  },
};
