import {ApiEndpoints} from "../enums/endpoints.enum.js";
import {apiService} from "./api.service.js";

export class HostService {
    static async createHost(hostName) {
        return apiService.post(
            ApiEndpoints.CREATE_HOST,
            {},  // empty body
            { hostName }  // params
        );
    }

    static async getPlayersOfHost(hostName) {
        return apiService.get(
            ApiEndpoints.PLAYERS_OF_HOST,
            { hostName }
        );
    }
}