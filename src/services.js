import axios from 'axios';

const baseUrl = 'http://localhost:8000'; // Change this to your API base URL

export const getVersion = async () => {
    try {
        const response = await axios.get(`${baseUrl}/version`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createGame = async (bodyContent) => {
    try {
        const response = await axios.post(`${baseUrl}/game`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const drawCard = async (game_id, bodyContent) => {
    try {
        const response = await axios.put(`${baseUrl}/game/${game_id}/deal-card`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGameInfo = async (game_id) => {
    try {
        const response = await axios.get(`${baseUrl}/game/${game_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const playCard = async (game_id, bodyContent) => {
    try {
        const response = await axios.put(`${baseUrl}/game/${game_id}/play-card`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const createRoom = async (bodyContent) => {
    try {
        const response = await axios.post(`${baseUrl}/room`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getRoomInfo = async (room_id) => {
    try {
        const response = await axios.get(`${baseUrl}/room/${room_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const addPlayerToWaitingRoom = async (roomID, bodyContent) => {
    try {
        const response = await axios.post(`${baseUrl}/room/${roomID}/player`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getPlayerInfo = async (player_id) => {
    try {
        const response = await axios.get(`${baseUrl}/player/${player_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getWaitingRooms = async () => {
    try {
        const response = await axios.get(`${baseUrl}/room/rooms`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const removePlayerFromRoom = async (room_id, bodyContent) => {
    try {
        const response = await axios.delete(`${baseUrl}/room/${room_id}/player`, { data: bodyContent });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const discardCard = async (roomID, bodyContent) => {
    try {
        const response = await axios.put(`${baseUrl}/game/${roomID}/discard-card`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export const tradeCard = async (roomID, bodyContent) => {
    try {
        const response = await axios.put(`${baseUrl}/game/${roomID}/trade-card`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



export const defendCard = async (room_id, bodyContent) => {
    try {
        const response = await axios.put(`${baseUrl}/game/${room_id}/defend-card`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export const getCardsUsability = async (player_id) => {
    try {
        const response = await axios.get(`${baseUrl}/player/${player_id}/cards-usability`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getPossibleTargets = async (player_id, card_id) => {
    try {
        const response = await axios.get(`${baseUrl}/player/${player_id}/targets/${card_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCardsDefend = async (player_id, card_id) => {
    try {
        const response = await axios.get(`${baseUrl}/player/${player_id}/cards-defend/${card_id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCardsToTrade = async (player_id) => {
    try {
        const response = await axios.get(`${baseUrl}/player/${player_id}/cards-trade`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const removePlayerFromGame = async (room_id, bodyContent) => {
    try{
        const response = await axios.delete(`${baseUrl}/game/${room_id}/leave-game`, bodyContent);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}