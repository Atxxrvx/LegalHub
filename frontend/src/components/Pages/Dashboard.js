import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faSort } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [cases, setCases] = useState([])
    const [user,setUser]=useState(null)
    const [role,setRole]=useState(null)
    const [name,setName]=useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("user"))
        setUser(JSON.parse(localStorage.getItem('user')))
        if(localStorage.getItem("role"))
        setRole(JSON.parse(localStorage.getItem('role')))
        if(localStorage.getItem("name"))
        setName(JSON.parse(localStorage.getItem('name')))
    }, [localStorage,user]);
    const [filterDate, setFilterDate] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const handleDateChange = (event) => {
        setFilterDate(event.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedCases = React.useMemo(() => {
        let sortableCases = [...cases];
        if (sortConfig.key !== null) {
            sortableCases.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableCases;
    }, [cases, sortConfig]);

    const filteredCases = sortedCases.filter((caseItem) => {
        return filterDate ? caseItem.filingDate.slice(0, 10) === filterDate : true;
    });

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
        }
        return faSort;
    };

    const getCases = async () => {
        try {
            const username = JSON.parse(localStorage.getItem("name"));
            const response = await fetch(`http://localhost:4000/api/get?userName=${encodeURIComponent(username)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const json = await response.json();
            setCases(json.cases);
            // console.log(json);
        } catch (e) {
            console.error('Error occurred:', e);
        }
    };

    useEffect(() => {
        getCases();
    }, [])

    return (
        <div className="h-fit py-20 bg-gray-300 flex items-center justify-center">
            <div className="max-w-7xl w-full bg-white rounded-lg shadow-md p-8">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Welcome : {name}</h1>
                </header>
                {role==="User" &&<div>
                <h2 className="text-2xl font-bold mb-4">Add Cases In One Click</h2>
                <p className="mb-8 text-gray-600">Our service provides an optimal way for adding and managing cases</p>
                <Link to="/addCases">
                    <button className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Add Cases</button>
                </Link>
                </div>}
                <div className="mb-4">
                    <label htmlFor="filter-date" className="block text-gray-700 font-bold mb-2">Filter by Hearing Date:</label>
                    <input
                        type="date"
                        id="filter-date"
                        value={filterDate}
                        onChange={handleDateChange}
                        className="border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('caseNo')}>
                                    Case No <FontAwesomeIcon icon={getSortIcon('caseNo')} />
                                </th>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('caseType')}>
                                    Case Type <FontAwesomeIcon icon={getSortIcon('caseType')} />
                                </th>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('plaintiffLawyer')}>
                                    Plaintiff Lawyer <FontAwesomeIcon icon={getSortIcon('plaintiffLawyer')} />
                                </th>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('defendantLawyer')}>
                                    Defendant Lawyer <FontAwesomeIcon icon={getSortIcon('defendantLawyer')} />
                                </th>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('judge')}>
                                    Judge <FontAwesomeIcon icon={getSortIcon('judge')} />
                                </th>
                                <th className="border border-gray-300 p-2 cursor-pointer" onClick={() => handleSort('hearingDate')}>
                                    Hearing Date <FontAwesomeIcon icon={getSortIcon('hearingDate')} />
                                </th>
                                <th className="border border-gray-300 p-2">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCases.map((caseItem, index) => (
                                <tr key={caseItem._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                    <td className="border border-gray-300 p-2 text-center">{caseItem._id}</td>
                                    <td className="border border-gray-300 p-2 text-center">{caseItem.caseType}</td>
                                    <td className="border border-gray-300 p-2 text-center"><Link to={"/lawyerDetails/"+ caseItem.plaintiffLawyer}>{caseItem.plaintiffLawyer}</Link></td>
                                    <td className="border border-gray-300 p-2 text-center"><Link to={"/lawyerDetails/"+ caseItem.defendantLawyer}>{caseItem.defendantLawyer}</Link></td>
                                    <td className="border border-gray-300 p-2 text-center">{caseItem.judge}</td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        {caseItem.filingDate.slice(0, 10)}
                                    </td>
                                    <td className="border border-gray-300 p-2 text-center">
                                        <button
                                            className="bg-blue-600 text-white px-2 py-1 rounded"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                console.log("View button clicked for caseId:", caseItem._id);
                                                localStorage.setItem('caseId', caseItem._id);
                                                console.log("caseId set in local storage:", caseItem._id);
                                                navigate('/caseDetails');
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;