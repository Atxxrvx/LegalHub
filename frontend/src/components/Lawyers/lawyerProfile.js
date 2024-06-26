import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function LawyerProfile() {
  const navigate = useNavigate();
  const [barId,setBarId] = useState("");
  const [name,setName] = useState(JSON.parse(localStorage.getItem("name")));
  const [prefCase,setPrefCase] = useState("");
  const [yoe,setYoe] = useState("");
  const [fees,setFees] = useState("");
  const [age,setAge] = useState("");
  const [feeStruc,setFeeStruc] = useState("");
  const [dob,setDob] = useState("");
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const postCase = async () => {
      const response = await fetch("/api/createDetails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barId:barId,userName:name,preferredType:prefCase,yoe:yoe,fees:fees,age:age,feeStructure:feeStruc,dob:dob}),
      });
      const json = await response.json();
      if(response.ok){
      console.log(json)
      navigate("/")
      window.location.reload();
    }
    }
    await postCase();
  }
    return (
      <section className=" py-1 bg-blueGray-50">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
              <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                  Lawyer Information
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form action="" method="">
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                  Lawyer Information:
                </h6>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Bar Council ID <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setBarId(e.target.value)}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="Enter bar council ID"
                      />
                    </div>
                  </div>  
                  </div>
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Preferred Case Types <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setPrefCase(e.target.value)}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="ex: Criminal, Civil"
                        value={prefCase}
                      />
                    </div>
                  </div>
  
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Years of Experience <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setYoe(e.target.value)}
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="6"
                        
                      />
                    </div>
                  </div>
  
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Fees(in rupees) <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setFees(e.target.value)}
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="10000"
                        
                      />
                    </div>
                  </div>
  
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Age <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setAge(e.target.value)}
                        type="number"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="30"
                        
                      />
                    </div>
                  </div>
  
                  <div className="w-full lg:w-12/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Fee stucture <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setFeeStruc(e.target.value)}
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                        placeholder="Enter your fee stucture"
                        
                      />
                    </div>
                  </div>
  
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="grid-password"
                      >
                        Date of Birth <span className="text-red-500">*</span>
                      </label>
                      <input onChange={(e)=>setDob(e.target.value)}
                        type="date"
                        name="h_date"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        required
                      />
                    </div>
                  </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4">
                    <div className="relative w-full mb-3">
                      <Link
                        onClick={handleSubmit}
                        to="/dashboard"
                        className="inline-block w-full px-5 py-4 text-lg font-medium text-center text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 ease"
                      >
                        Create Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default LawyerProfile;