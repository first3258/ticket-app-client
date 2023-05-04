import axiosClient from "./axiosClient";

const ticketApi = {
    createTicket: params => axiosClient.post('ticket/create', params),
    findAllTicket: params => axiosClient.get('ticket', params),
    updateTicket: (ticketId, params) => axiosClient.post(`ticket/${ticketId}`, params)
}

export default ticketApi