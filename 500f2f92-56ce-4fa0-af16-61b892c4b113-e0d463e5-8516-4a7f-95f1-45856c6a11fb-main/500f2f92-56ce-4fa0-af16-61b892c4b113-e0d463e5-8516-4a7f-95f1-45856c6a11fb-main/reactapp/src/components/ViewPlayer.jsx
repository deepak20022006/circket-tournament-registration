// import React, { useEffect, useState } from 'react';
// import { getAllPlayers } from '../api';
// import './ViewPlayer.css';
// import Alert from "@mui/material/Alert";

// export default function ViewPlayer() {
//     const [players, setPlayers] = useState([]);

//     useEffect(() => {
//         async function fetchPlayers() {
//             try {
//                 const res = await getAllPlayers()
//                 setPlayers(res);
//             } catch (err) {
//                 // ignore in tests
//             }
//         }
//         fetchPlayers();
//     }, []);

//     return (
//         <div className="viewplayer-container">

//             <div className="card">
//                 <h2>All Players</h2>
//                 <table className="players-table" aria-label="players-table">
//                     <thead>
//                         <tr>
//                             <th>Player Name</th>
//                             <th>City</th>
//                             <th>Phone</th>
//                             <th>Played In</th>
//                             <th>Player Type</th>
//                             <th>Last Played For</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {players && players.length > 0 ? (
//                             players.map(p => (
//                                 <tr key={p.playerId}>
//                                     <td>{p.playerName}</td>
//                                     <td>{p.playerCity}</td>
//                                     <td>{p.phone}</td>
//                                     <td>{p.playedIn}</td>
//                                     <td>{p.playerType}</td>
//                                     <td>{p.lastPlayedFor}</td>
//                                 </tr>
//                             ))
//                         ) : (
//                             <tr><td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>No players found</td></tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import { getAllPlayers } from '../api';
import './ViewPlayer.css';

export default function ViewPlayer() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function fetchPlayers() {
            try {
                const res = await getAllPlayers();
                setPlayers(res);
            } catch (err) {
                // ignore in tests
            }
        }
        fetchPlayers();
    }, []);

    return (
        <div className="viewplayer-container">
            <div className="overlay"></div> {/* translucent overlay */}
            <div className="card">
                <h2>All Players</h2>
                <table className="players-table" aria-label="players-table">
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>City</th>
                            <th>Phone</th>
                            <th>Played In</th>
                            <th>Player Type</th>
                            <th>Last Played For</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players && players.length > 0 ? (
                            players.map((p) => (
                                <tr key={p.playerId}>
                                    <td>{p.playerName}</td>
                                    <td>{p.playerCity}</td>
                                    <td>{p.phone}</td>
                                    <td>{p.playedIn}</td>
                                    <td>{p.playerType}</td>
                                    <td>{p.lastPlayedFor}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>
                                    No players found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
