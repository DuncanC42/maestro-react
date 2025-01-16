export const ApiEndpoints = {
    CREATE_HOST: '/host/create/:hostName',
    PLAYERS_OF_HOST: '/host/:hostName/players',
    PLAYER_JOIN_GAME: '/player/join',  // On va gérer les query params dans le service
    PLAYER_REMOVE: '/player/delete'
};