import {apiService} from "./api.service.js";
import {ApiEndpoints} from "../enums/endpoints.enum.js";

export class PlayerService {
    static async joinGame(playerName, groupeName, groupCode) {
        return apiService.post(
            ApiEndpoints.PLAYER_JOIN_GAME,
            {},  // empty body
            null,  // no params
            {  // query params
                playerName,
                groupeName,
                groupCode
            }
        );
    }

    static async removePlayer(playerPseudo, hostName) {
        console.log('playerPseudo', playerPseudo);
        return apiService.delete(
            ApiEndpoints.PLAYER_REMOVE,
            {},  // no params
            { playerPseudo, hostName } // correct query params
        );
    }

}