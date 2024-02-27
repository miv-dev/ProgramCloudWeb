import React, { useState} from "react";
import {useGetAllProgramsQuery} from "../redux/api/programsApi";
import {IProgram} from "../redux/api/types";

const HomePage = () => {
    const {isLoading, isError, error, data: programs = []} = useGetAllProgramsQuery();
    const [selectedProgram, setSelectedProgram] = useState<IProgram | null>(null)



    return (
        <div>

        </div>
    );
};

export default HomePage;