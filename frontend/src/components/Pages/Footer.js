const Footer = () => {
    return ( 
        <>
        <div className="bg-gray-900">
        <footer className="flex flex-wrap items-center justify-between p-3 m-auto">
          <div className="container mx-auto flex flex-col flex-wrap items-center justify-between">
            <ul className="flex mx-auto text-white text-center">
              <li className="p-2 cursor-pointer hover:underline">
                Terms & Conditions
              </li>
              <li className="p-2 cursor-pointer hover:underline">Privacy</li>
              <li className="p-2 cursor-pointer hover:underline">Cookies</li>
            </ul>
            <div className="flex mx-auto text-white text-center">
              Copyright LegalHub © 2024
            </div>
          </div>
        </footer>
      </div>
        </>
     );
}
 
export default Footer;