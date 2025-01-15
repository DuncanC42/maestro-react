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
}