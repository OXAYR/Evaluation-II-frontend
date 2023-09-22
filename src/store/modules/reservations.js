import axios from "axios";
import user from "./user.js";
export default {
  namespaced: true,
  state: {
    reservation: {
      bookings: [],
    },
    allReservations: {
      bookings: [],
    },
  },
  getters: {
    getReservation(state) {
      console.log(
        "IN the getter of reservation-----> ",
        state.reservation.bookings
      );
      return state.reservation.bookings;
    },
    getAllReservations(state) {
      console.log(
        "IN the getter of reservation-----> ",
        state.allReservations.bookings
      );
      return state.allReservations.bookings;
    },
    getReservationLength(state) {
      return state.reservation.bookings.length;
    },
  },
  mutations: {
    SET_RESERVATION(state, reservation) {
      console.log("reservation in the setter ", reservation);
      state.reservation.bookings = reservation;
    },
    SET_ALL_RESERVATION(state, reservation) {
      console.log("reservation in the setter ", reservation);
      state.allReservations.bookings = reservation;
    },
    DELETE_RESERVATION_EL(state, reservation) {
      state.reservation = reservation;
    },
  },
  actions: {
    async makeAReservation(_, payload) {
      try {
        const { _id } = JSON.parse(localStorage.getItem("user"));
        const token = user.state.user.token;
        console.log(
          "root state user in the reservation------>",
          user.state.user.token
        );
        const newPayload = { userId: _id, ...payload };
        console.log("In the reservation new payload------> ", newPayload);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/reservations", newPayload, config);
        console.log("reservation created:", data);
        alert(data.message);
      } catch (error) {
        //console.error("Error creating reservation:", error.response.data.message);
        alert(error.response.data.message);
      }
    },

    async updateReservation({ commit }, { carId, reservation, rent }) {
      try {
        const { _id } = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const newPayload = {
          userId: _id,
          reservation: reservation,
          rent: rent,
        };
        console.log(
          "In the update ticket reservation new payload------> ",
          newPayload
        );

        const { data } = await axios.put(
          `/reservations/updatetickets/${carId}`,
          newPayload,
          config
        );
        console.log(
          "in the get reservation----> ",
          data.data.reservation.bookings
        );
        commit("SET_RESERVATION", data.data.reservation.bookings);
      } catch (error) {
        //console.log(error)
      }
    },

    async getTheReservation({ commit }, id) {
      try {
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/reservations/${id}`, config);
        console.log("in the get reservation action----> ", data);
        commit("SET_RESERVATION", data.data.reservations.bookings);
      } catch (error) {
        //console.error("Error fetching reservation:", error);
        alert("No reservation found");
      }
    },

    async getAllReservation({ commit }) {
      try {
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/reservations`, config);
        console.log(
          "in the get reservation action----> ",
          data.data.reservations
        );
        commit("SET_ALL_RESERVATION", data.data.reservations);
      } catch (error) {
        //console.error("Error fetching reservation:", error);
        alert("No reservation found");
      }
    },

    async deleteReservation({ commit }, id) {
      try {
        console.log("payload in action removeToreservation", id);
        const { _id } = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        // console.log('config ',config)
        const { data } = await axios.delete(`/reservations/${id}`, config, _id);
        // console.log(
        //   "RESPONSE RECIEVED From remove reservation",
        //   data.data.reservations.bookings
        // );
        commit("SET_RESERVATION", data.data.reservations.bookings);
      } catch (error) {
        console.error("Error deleting item from reservation:", error);
        //alert(error.response.data.message);
      }
    },
  },
};
