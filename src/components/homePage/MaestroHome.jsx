import {Container} from "../container/Container";
import {PlayerForm} from "./PlayerForm";
import {HostForm} from "./HostForm";
import {useState} from "react";

export const MaestroHome = () => {
    const [mode, setMode] = useState('player');


    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black p-8">
            <div className="max-w-md mx-auto">
                <Container>
                    <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                        MAESTRO
                    </h1>
                </Container>
                <Container containerClass="mt-4">
                    <div className="flex bg-purple-900/30 p-1 rounded-lg">
                        <button
                            className={`flex-1 py-2 text-center rounded-md transition-colors ${
                                mode === 'player' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-purple-200'
                            }`}
                            onClick={() => setMode('player')}
                        >
                            Joueur
                        </button>
                        <button
                            className={`flex-1 py-2 text-center rounded-md transition-colors ${
                                mode === 'host' ? 'bg-purple-600 text-white' : 'text-purple-300 hover:text-purple-200'
                            }`}
                            onClick={() => setMode('host')}
                        >
                            Host
                        </button>
                    </div>
                </Container>
                {mode === 'player' ? <PlayerForm /> : <HostForm />}
            </div>
        </div>
    );
};

