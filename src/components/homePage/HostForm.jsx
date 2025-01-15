// Formulaire host

import {Container} from "../container/Container.jsx";
import {useState} from "react";
import {HostService} from "../../services/host.service.js";

export const HostForm = () => {
    const [hostName, setHostName] = useState('');
    const [hostCode, setHostCode] = useState('');

    const handleCreateHost = async (e) => {
        e.preventDefault();

        try {
            const response = await HostService.createHost(hostName);
            console.log("Host créé :", response);
            setHostCode(response.data.groupeCode);
            // Rediriger vers la page d'attente ou afficher le code de la partie
        } catch (err) {
            console.error(err);
            // Afficher un message d'erreur
        }
    };

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
                    {hostCode && (
                        <label className="block text-sm font-medium mb-1"> Code de la partie :
                        {/*    display code in an input section in read only*/}
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-purple-900/50 border border-purple-500/30 focus:border-purple-400 focus:outline-none"
                                value={hostCode}
                                readOnly
                            />
                        </label>
                    )}

                </div>
                <button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >Créer la partie
                </button>
            </form>
        </Container>
    );
};