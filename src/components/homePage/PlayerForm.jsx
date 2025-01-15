// Formulaire joueur

import {Container} from "../container/Container.jsx";
import {useState} from "react";
import {PlayerService} from "../../services/player.service.js";

export const PlayerForm = () => {
    const [playerName, setPlayerName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupCode, setGroupCode] = useState("");

    const handleJoinGame = async (e) => {
        e.preventDefault();
        try {
            const response = await PlayerService.joinGame(playerName, groupName, parseInt(groupCode));
            console.log("Partie rejointe :", response);
            // Rediriger vers la page de jeu ou afficher un message de succès
        } catch (err) {
            console.error(err);
            // Afficher un message d'erreur
        }
    };

    return (
        <Container containerClass="mt-4">
            <form className="space-y-4" onSubmit={handleJoinGame}>
                <div>
                    <label className="block text-sm font-medium mb-1">Player name</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-purple-900/50 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                        placeholder="Entrez votre pseudo"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Groupe name</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-purple-900/50 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                        placeholder="Entrez le nom du groupe"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Code de la partie</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-purple-900/50 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                        placeholder="Entrez le code"
                        value={groupCode}
                        onChange={(e) => setGroupCode(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                > Rejoindre un groupe
                </button>
            </form>
        </Container>
    );
};