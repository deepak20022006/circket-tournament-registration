import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
    Typography,
} from "@mui/material";
import { getAllMatches, updateMatch } from "../utils";

export default function ManageMatchesList() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const data = await getAllMatches();
            setMatches(data);
            setError("");
        } catch (err) {
            setError("Failed to load matches");
        } finally {
            setLoading(false);
        }
    };

    // Start a match — set status to ONGOING and startDate = now if not set
    const handleStart = async (match) => {
        try {
            const updatedMatch = {
                ...match,
                status: "LIVE",
                startDate: match.startDate || new Date().toISOString(),
            };
            await updateMatch(match.matchId, updatedMatch);
            fetchMatches();
        } catch {
            alert("Failed to start match");
        }
    };

    // End a match — set status to COMPLETED and endDate = now if not set
    const handleEnd = async (match) => {
        try {
            const updatedMatch = {
                ...match,
                status: "COMPLETED",
                endDate: match.endDate || new Date().toISOString(),
            };
            await updateMatch(match.matchId, updatedMatch);
            fetchMatches();
        } catch {
            alert("Failed to end match");
        }
    };

    if (loading) return <CircularProgress />;

    if (error)
        return (
            <Typography color="error" variant="body1">
                {error}
            </Typography>
        );

    if (matches.length === 0)
        return <Typography>No matches found. Create one!</Typography>;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Match Name</TableCell>
                        <TableCell>Team 1</TableCell>
                        <TableCell>Team 2</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {matches.map((match) => (
                        <TableRow key={match.matchId}>
                            <TableCell>{match.matchId}</TableCell>
                            <TableCell>{match.matchName}</TableCell>
                            <TableCell>{match.team1Id}</TableCell>
                            <TableCell>{match.team2Id}</TableCell>
                            <TableCell>{match.status}</TableCell>
                            <TableCell>
                                {match.startDate
                                    ? new Date(match.startDate).toLocaleString()
                                    : "-"}
                            </TableCell>
                            <TableCell>
                                {match.endDate ? new Date(match.endDate).toLocaleString() : "-"}
                            </TableCell>
                            <TableCell>
                                {match.status === "SCHEDULED" && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleStart(match)}
                                    >
                                        Start
                                    </Button>
                                )}
                                {match.status === "LIVE" && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleEnd(match)}
                                    >
                                        End
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
