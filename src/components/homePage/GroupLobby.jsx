import React, { useState, useEffect } from 'react';
import { Container } from '../container/Container';
import { UserX, Copy, PlayCircle, XCircle } from 'lucide-react';
import {webSocketService} from "../../services/websocket.service.js";

const GroupLobby = ({
                        isHost,
                        groupName,
                        groupCode,
                        currentPlayer,
                        onStartGame,
                        onLeaveGroup,
                        onKickPlayer
                    }) => {
    const [players, setPlayers] = useState([]);
    const [copySuccess, setCopySuccess] = useState(false);

    useEffect(() => {
        // Connexion au WebSocket lors du montage du composant
        webSocketService.connect(() => {
            // Une fois connecté, s'abonner aux updates du groupe
            webSocketService.subscribeToGroup(groupName, handlePlayerUpdate);

            // Envoyer une notification de join si on est un joueur
            if (!isHost && currentPlayer) {
                webSocketService.sendJoinNotification(groupName, currentPlayer);
            }
        });

        // Cleanup lors du démontage
        return () => {
            webSocketService.disconnect();
        };
    }, [groupName, isHost, currentPlayer]);

    const handlePlayerUpdate = (update) => {
        // Mettre à jour la liste des joueurs en fonction du type d'événement
        switch (update.type) {
            case 'JOIN':
                setPlayers(prev => [...prev, update.player]);
                break;
            case 'LEAVE':
            case 'KICK':
                setPlayers(prev => prev.filter(p => p.id !== update.player.id));
                break;
            default:
                console.warn('Unknown update type:', update.type);
        }
    };

    // const handleLeaveGroup = async () => {
    //     try {
    //         await onLeaveGroup();
    //         webSocketService.sendLeaveNotification(groupName, currentPlayer);
    //     } catch (err) {
    //         console.error('Error leaving group:', err);
    //     }
    // };
    //
    // const handleKickPlayer = async (playerId) => {
    //     try {
    //         await onKickPlayer(playerId);
    //         const playerToKick = players.find(p => p.id === playerId);
    //         if (playerToKick) {
    //             webSocketService.sendKickNotification(groupName, playerToKick);
    //         }
    //     } catch (err) {
    //         console.error('Error kicking player:', err);
    //     }
    // };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(groupCode);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Group Info Section */}
            <Container>
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                        {groupName}
                    </h2>

                    <div className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg">
                        <span className="text-sm text-purple-200">Code du groupe: {groupCode}</span>
                        <button
                            onClick={handleCopyCode}
                            className="p-2 hover:bg-purple-700/50 rounded-full transition-colors"
                            title="Copier le code"
                        >
                            <Copy size={18} className={copySuccess ? 'text-green-400' : 'text-purple-400'} />
                        </button>
                    </div>
                </div>
            </Container>

            {/* Players List Section */}
            <Container>
                <h3 className="text-lg font-semibold text-purple-200 mb-3">Joueurs</h3>
                <div className="space-y-2">
                    {players.map((player) => (
                        <div
                            key={player.id}
                            className="flex items-center justify-between p-3 bg-purple-900/30 rounded-lg"
                        >
                            <span className="text-purple-200">{player.pseudo}</span>
                            {isHost && (
                                <button
                                    onClick={() => onKickPlayer(player.id)}
                                    className="p-1 hover:bg-purple-700/50 rounded-full transition-colors"
                                    title="Expulser le joueur"
                                >
                                    <UserX size={18} className="text-red-400" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </Container>

            {/* Action Buttons Section */}
            <Container>
                <div className="flex gap-3">
                    {isHost ? (
                        <>
                            <button
                                onClick={onStartGame}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                            >
                                <PlayCircle size={20} />
                                Commencer la partie
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onLeaveGroup}
                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center gap-2"
                        >
                            <XCircle size={20} />
                            Quitter le groupe
                        </button>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default GroupLobby;