// import React, { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     IconButton,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Button
// } from "@mui/material";
// import { getAllTeams, deleteTeam, updateTeam } from "../utils";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// export default function ManageTeams() {
//     const [teams, setTeams] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [editModalOpen, setEditModalOpen] = useState(false);
//     const [editTeam, setEditTeam] = useState({ team_id: "", teamName: "", city: "" });

//     // Fetch all teams
//     const fetchTeams = async () => {
//         try {
//             setLoading(true);
//             const data = await getAllTeams();
//             setTeams(data);
//         } catch (err) {
//             console.error(err);
//             setError("Failed to load teams.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchTeams();
//     }, []);

//     // Handle delete
//     const handleDelete = async (team_id) => {
//         if (!window.confirm("Are you sure you want to delete this team?")) return;
//         try {
//             await deleteTeam(team_id);
//             setTeams(teams.filter((team) => team.team_id !== team_id));
//         } catch (err) {
//             console.error(err);
//             alert("Failed to delete team.");
//         }
//     };

//     // Handle edit modal open
//     const handleEditOpen = (team) => {
//         setEditTeam(team);
//         setEditModalOpen(true);
//     };

//     // Handle edit save
//     const handleEditSave = async () => {
//         try {
//             await updateTeam(editTeam.team_id, {
//                 teamName: editTeam.teamName,
//                 city: editTeam.city
//             });
//             setEditModalOpen(false);
//             fetchTeams();
//         } catch (err) {
//             console.error(err);
//             alert("Failed to update team.");
//         }
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Typography color="error" align="center" sx={{ mt: 4 }}>
//                 {error}
//             </Typography>
//         );
//     }
//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//                 Manage Teams
//             </Typography>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {teams.length > 0 ? (
//                             teams.map((team) => (
//                                 <TableRow key={team.team_id}>
//                                     <TableCell>{team.team_id}</TableCell>
//                                     <TableCell>{team.teamName}</TableCell>
//                                     <TableCell>{team.city || "-"}</TableCell>
//                                     <TableCell>
//                                         <IconButton color="primary" onClick={() => handleEditOpen(team)}>
//                                             <EditIcon />
//                                         </IconButton>
//                                         <IconButton color="error" onClick={() => handleDelete(team.team_id)}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={4} align="center">
//                                     No teams found.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//                 <DialogTitle>Edit Team</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         margin="dense"
//                         label="Team Name"
//                         fullWidth
//                         value={editTeam.teamName}
//                         onChange={(e) => setEditTeam({ ...editTeam, teamName: e.target.value })}
//                     />
//                     <TextField
//                         margin="dense"
//                         label="City"
//                         fullWidth
//                         value={editTeam.city}
//                         onChange={(e) => setEditTeam({ ...editTeam, city: e.target.value })}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
//                     <Button onClick={handleEditSave} variant="contained" color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// }
import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button
} from "@mui/material";
import { getAllTeams, deleteTeam, updateTeam } from "../utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ManageTeams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editTeam, setEditTeam] = useState({ team_id: "", teamName: "", city: "" });
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    // Fetch all teams
    const fetchTeams = async () => {
        try {
            setLoading(true);
            const data = await getAllTeams();
            setTeams(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load teams.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    // Handle delete confirmation modal open
    const handleDeleteOpen = (team) => {
        setTeamToDelete(team);
        setDeleteModalOpen(true);
    };

    // Handle delete save
    const handleDeleteConfirm = async () => {
        try {
            await deleteTeam(teamToDelete.team_id);
            setTeams(teams.filter((team) => team.team_id !== teamToDelete.team_id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete team.");
        } finally {
            setDeleteModalOpen(false);
            setTeamToDelete(null);
        }
    };

    // Handle edit modal open
    const handleEditOpen = (team) => {
        setEditTeam(team);
        setEditModalOpen(true);
    };

    // Handle edit save
    const handleEditSave = async () => {
        try {
            await updateTeam(editTeam.team_id, {
                teamName: editTeam.teamName,
                city: editTeam.city
            });
            setEditModalOpen(false);
            fetchTeams();
        } catch (err) {
            console.error(err);
            alert("Failed to update team.");
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" align="center" sx={{ mt: 4 }}>
                {error}
            </Typography>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Manage Teams
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.length > 0 ? (
                            teams.map((team) => (
                                <TableRow key={team.team_id}>
                                    <TableCell>{team.team_id}</TableCell>
                                    <TableCell>{team.teamName}</TableCell>
                                    <TableCell>{team.city || "-"}</TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => handleEditOpen(team)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="error" onClick={() => handleDeleteOpen(team)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    No teams found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit Team Modal */}
            <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                <DialogTitle>Edit Team</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Team Name"
                        fullWidth
                        value={editTeam.teamName}
                        onChange={(e) => setEditTeam({ ...editTeam, teamName: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="City"
                        fullWidth
                        value={editTeam.city}
                        onChange={(e) => setEditTeam({ ...editTeam, city: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
                <DialogTitle>Delete Team</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete{" "}
                        <strong>{teamToDelete?.teamName}</strong>?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}