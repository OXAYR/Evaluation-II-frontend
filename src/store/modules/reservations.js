import axios from "axios";
import user from "./user.js";
export default {
  namespaced: true,
  state: {
    reservation: {
      bookings: [],
    },
  },
  getters: {
    getReservation(state) {
      console.log("IN the getter of reservation-----> ", state);
      return state.reservation.bookings;
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
        console.log("token---->", token, _id);
        console.log("payload---->", payload, payload.released_on);
        //const {id, released_on} = payload
        const newPayload = { userId, ...payload };
        console.log("In the reservation new payload------> ", newPayload);
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.post("/reservation", newPayload, config);
        console.log("reservation created:", data);
        alert(data.message);
      } catch (error) {
        //console.error("Error creating reservation:", error.response.data.message);
        alert(error.response.data.message);
      }
    },

    async updateTicket({ commit }, payload) {
      try {
        console.log("payload in the update Tickets---->", payload);
        const { movieId, ticketCount } = payload;
        const { _id } = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const newPayload = { userId: _id, tickets: ticketCount };
        console.log(
          "In the update ticket reservation new payload------> ",
          newPayload
        );

        const { data } = await axios.put(
          `/reservation/updatetickets/${movieId}`,
          newPayload,
          config
        );
        console.log(
          "in the get reservation----> ",
          data.data.reservation.items
        );
        commit("SET_reservation", data.data.reservation.items);
      } catch (error) {
        //console.log(error)
      }
    },

    async getTheReservation({ commit }) {
      try {
        const { _id } = JSON.parse(localStorage.getItem("user"));
        const config = {
          headers: {
            "x-access-token": JSON.parse(localStorage.getItem("userAuth")),
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.get(`/reservation/${_id}`, config);
        console.log(
          "in the get reservation----> ",
          data.data.reservation.items
        );
        commit("SET_reservation", data.data.reservation.items);
      } catch (error) {
        //console.error("Error fetching reservation:", error);
        //alert(error.response.data.message);
      }
    },

    async deleteReservationEl({ commit }, id) {
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
        const { data } = await axios.delete(`/reservation/${id}`, config, _id);
        console.log(
          "RESPONSE RECIEVED From remove reservation",
          data.data.reservation.items
        );
        commit("SET_reservation", data.data.reservation.items);
      } catch (error) {
        console.error("Error deleting item from reservation:", error);
        //alert(error.response.data.message);
      }
    },
  },
};
