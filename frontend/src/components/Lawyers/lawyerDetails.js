import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect,useState } from "react";
function LawyerDetails() {
  const {id} = useParams();
  console.log(id);
  const [lawyer, setLawyer] = useState(null);
  const navigate = useNavigate();

  const fetchCase = async (id) => {
    const response = await fetch(`http://localhost:4000/api/getDetails?userName=${id}`)
    const json = await response.json()
    setLawyer(json.lawyer)
    console.log(json)
  }

  useEffect(() => {
    fetchCase(id)
  }, []);

  return (
    <div className="bg-white py-32 px-10 min-h-screen ">
      <div className="bg-gray-100 p-10 md:w-3/4 lg:w-1/2 mx-auto">
        <div className="flex items-center mb-5">
          <label
            htmlFor="title"
            className="items-center mr-6 text-right font-black text-gray-600 text-2xl"
          >
            LAWYER DETAILS
          </label>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="bar_id"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Bar Council ID:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.barId}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="company_name"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Name:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.userName}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="desc"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Preferred case type:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.preferredType}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="years_of_exp"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Years Of Experience:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.yoe}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="fees"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Fees(Rs):
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.fees}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="age"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Age:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.age}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="fee_structure"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Fee Structure:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.feeStructure}
          </p>
        </div>

        <div className="flex items-center mb-5">
          <label
            htmlFor="dob"
            className="inline-block w-32 mr-6 text-right font-bold text-gray-600"
          >
            Date of Birth:
          </label>
          <p className="flex-1 py-2 border-b-2 border-gray-400 text-gray-600  outline-none">
            {lawyer && lawyer.dob.slice(0,10)}
          </p>
        </div>

        <div className="w-1/4 text-right">
          <Link to="/dashboard">
            <p className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease">
              Back
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LawyerDetails;