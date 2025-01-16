import React, { useState } from 'react';
import { Container } from '../container/Container';
import { HostService } from '../../services/host.service';
import GroupLobby from './GroupLobby';

export const HostForm = () => {
    const [hostName, setHostName] = useState('');
    const [groupData, setGroupData] = useState(null);

    const handleCreateHost = async (e) => {
        e.preventDefault();
        try {
            const response = await HostService.createHost(hostName);
            setGroupData({
                name: hostName,
                code: response.data.groupeCode
            });
        } catch (err) {
            console.error(err);
            // TODO: Afficher un message d'erreur
        }
    };

    const handleStartGame = async () => {
        try {
            // TODO: Implémenter la logique de démarrage
            console.log('Starting game...');
        } catch (err) {
            console.error(err);
        }
    };

    const handleKickPlayer = async (playerId) => {
        try {
            // TODO: Implémenter l'expulsion de joueur
            console.log('Kicking player:', playerId);
        } catch (err) {
            console.error(err);
        }
    };

    if (groupData) {
        return (
            <GroupLobby
                isHost={true}
                groupName={groupData.name}
                groupCode={groupData.code}
                onStartGame={handleStartGame}
                onKickPlayer={handleKickPlayer}
            />
        );
    }

    return (
        <Container containerClass="mt-4">
            <form className="space-y-4" onSubmit={handleCreateHost}>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Nom de la partie
                        <input
                            type="text"
                            className="w-full p-2 rounded bg-purple-900/50 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                            placeholder="Entrez le nom de la partie"
                            value={hostName}
                            onChange={(e) => setHostName(e.target.value)}
                        />
                    </label>
                </div>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Créer la partie
                </button>
            </form>
        </Container>
    );
};