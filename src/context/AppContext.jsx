import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export const GlobalContext = createContext()

const AppContext = ({children}) => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState('');
    const [totalJobs, setTotalJobs] = useState('');
    const [jobType, setJobType] = useState('');
    const [mode, setMode] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const resetFilters = () => {
        setJobType('');
        setMode('');
        setIndustry('');
        setLocation('');
    }

    const updateJobType = (value) => {
        setJobType(value);
        setPage(1);
    }

    const updateMode = (value) => {
        setMode(value);
        setPage(1);
    }

    const updateIndustry = (value) => {
        setIndustry(value);
        setPage(1);
    }

    const updateLocations = (value) => {
        setLocation(value);
        setPage(1);
    }

    const url = "https://job-me-server-pelumi.onrender.com/api/v1/jobs";
    const getJobs = async () => {
        setIsLoading(true);
        const {data} = await axios(`${url}?page=${page}&jobType=${jobType}&mode=${mode}&industry=${industry}&location=${location}`);
        setIsLoading(false);
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
        setTotalJobs(data.totalJobs);
    };
    useEffect(() => {
        getJobs();

    }, [page, jobType, mode, industry, location]);
    return <GlobalContext.Provider value={{jobs, isLoading, totalPages, page, setPage, totalJobs, updateJobType, resetFilters, updateMode, updateIndustry, updateLocations}}>
        {children}
    </GlobalContext.Provider>

}

export default AppContext;