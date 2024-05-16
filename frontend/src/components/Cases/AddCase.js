import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddCase(props) {
  const navigate = useNavigate();
    
  const [optionlawyers, setOptionlawyers] = useState([])
  const [casetype, setCasetype] = useState("Criminal")
  const [casedescrip, setCasedescrip] = useState("")
  const [lawyer, setLawyer] = useState("Warren Jacinto")
  const [defendant, setDefendent] = useState("")

  const getLawyers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/lawyers", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      // console.log(json);
      setOptionlawyers(json.lawyers)
      // console.log(optionlawyers)
      if (!response.ok) {
        console.log(json.error)
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(casetype)
    console.log(casedescrip)
    console.log(lawyer)
    console.log(defendant)
    if (!casetype || !casedescrip || !lawyer || !defendant) {
      alert("Please input all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          defendant: defendant,
          plaintiff: JSON.parse(localStorage.getItem("name")),
          judge: "Naman Gosain",
          defendantLawyer: lawyer,
          caseType: casetype,
          description: casedescrip
        })
      });

      const json = await response.json();
      console.log(json);

      if (!response.ok) {
        console.log(json.message);
        alert(json.message)
        return;
      }
      else {
        navigate('/')
        clear()
        return;
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  const clear = () => {
    setOptionlawyers([])
    setCasetype("Criminal")
    setDefendent("")
    setCasedescrip("")
    setLawyer("Warren Jacinto")
  }

  useEffect(() => {
    clear();
    getLawyers()
  }, [])

  return (
    <section className=" py-1 bg-blueGray-50">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">ADD CASE</h6>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form
              onSubmit={handleSubmit}
            >
              {/* Select case-type */}
              <div className="w-full my-6 md:w-3/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Case Against
                </label>

                <input
                  value={defendant}
                  onChange={e => setDefendent(e.target.value)}
                  type="text"
                  className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="John Doe"
                //   {...register("Address", { required: true })}
                />
              </div>
              <div className="mt-6">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Case Type
                </label>
                <select
                  onChange={e => setCasetype(e.target.value)}
                  value={casetype}
                  className="form-select mt-1 block w-full border"
                //   {...register("Case_Type", { required: true })}
                >
                  <option value="Criminal">Criminal</option>
                  <option value="Civil">Civil</option>
                  <option value="Family-Matters">Family-Matters</option>
                  <option value="Land">Land</option>
                  <option value="Co-op court dispute">
                    Co-op court dispute
                  </option>
                  <option value="Charity Trust">Charity Trust</option>
                  <option value="SEBI">SEBI</option>
                </select>
              </div>
              {/* Enter description */}
              <div className="mt-6">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Case description
                </label>
                <textarea
                  onChange={e => setCasedescrip(e.target.value)}
                  value={casedescrip}
                  className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                //   {...register("Case_desciption", { required: true, max: 200 })}
                />
              </div>

              {/* Select Lawyer */}
              <div className="mt-6">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Select Lawyer
                </label>
                <select
                  className="form-select mt-1 block w-full border"
                  onChange={e => setLawyer(e.target.value)}
                  value={lawyer}
                //   {...register("Case_Type", { required: true })}
                >
                  {optionlawyers && optionlawyers.map((item, index) => (
                    <option key={index}>{item.userName}</option>
                  ))}
                </select>
              </div>

              <div className="w-full my-6 md:w-3/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                  Address
                </label>

                <input
                  type="text"
                  className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Address"
                //   {...register("Address", { required: true })}
                />
              </div>
              <div className="flex flex-wrap -mx-3 my-6 mb-2">
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                    City
                  </label>

                  <input
                    className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="text"
                    placeholder="City"
                  // {...register("City", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                    Country
                  </label>

                  <input
                    className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="text"
                    placeholder="Country"
                  // {...register("Country", { required: true })}
                  />
                </div>
                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2">
                    Postal Code
                  </label>

                  <input
                    className="border-0 px-3 py-3 mt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    type="number"
                    placeholder="Postal Code"
                  // {...register("Postal_Code", { required: true })}
                  />
                </div>
              </div>

              <input
                className="block my-2 bg-gray-300 hover:bg-gray-400 rounded-md p-2"
                type="submit"
              />
            </form>
            {/* names={props.names} */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCase;
