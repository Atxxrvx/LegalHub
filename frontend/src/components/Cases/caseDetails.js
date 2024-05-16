import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DisplayCaseDetails() {
  const [case1, setCase1] = useState(null);
  const navigate = useNavigate();

  const fetchCase = async (caseid) => {
    const response = await fetch(`http://localhost:3000/api/getById?caseId=${caseid}`)
    const json = await response.json()
    setCase1(json.case)
    console.log(json)
  }

  useEffect(() => {
    const caseId = localStorage.getItem('caseId');
    fetchCase(caseId)
  }, []);

  const deleteHandler = async() => {
    const response = await fetch("http://localhost:3000/api/del", {
      method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseId:localStorage.getItem('caseId')
        })
    })
    const json = response.json();
    console.log(json)
    console.log("Case deleted"); 
    localStorage.removeItem('caseId');
    navigate('/');
  }

  return (
    <Fragment>
      <div className="bg-white py-32 px-10 min-h-screen ">
        <div className="bg-gray-100 p-10 md:w-3/4 lg:w-1/2 mx-auto">
          <div className="flex items-center mb-5">
            <label className="items-center mr-6 text-right font-black text-gray-600 text-2xl">
              CASE DETAILS
            </label>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case No:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {case1 && case1._id}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case Type:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {case1 && case1.caseType}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Case Description:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {case1 && case1.description}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Lawyer Name:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {case1 && case1.defendantLawyer}
            </p>
          </div>

          <div className="flex items-center mb-5">
            <label className="inline-block w-32 mr-6 text-right font-bold text-gray-600">
              Hearing Date:
            </label>
            <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
              {case1 && case1.filingDate.slice(0, 10)}
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={deleteHandler}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Withdraw Case
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default DisplayCaseDetails;
