import { useState, useEffect } from "react";
import { signOut } from "next-auth/react"
import { fetchWrapper } from "@/utils/api";
import { useGlobalState } from "./view";

const Nav = () => {
  const [searchValue, setSearchValue] = useState('');
  const { handleClick, session } = useGlobalState();

  const handleInputChange = (event: { target: { value: any; }; }) => {
    setSearchValue(event.target.value);
  };

  const handleKeyPress = (event: {
    target: any; key: string;
  }) => {
    if (event.key === 'Enter') {
      setSearchValue(event.target.value);
    }
  };

  const handleSignOut = () => {
    signOut()
  }

  useEffect(() => {
    if (searchValue) {
      const fetchData = async () => {
        try {
          const res = await fetchWrapper("/api/search", {
            method: "POST",
            body: JSON.stringify({
              content: searchValue,
            }),
          });
          console.log('zeze', res)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }
  }, [searchValue]);

  return <div className="navbar bg-base-100 justify-between flex-none">
    <div className="flex-none">
      <div className="dropdown mr-6">
        <button className="btn btn-square btn-ghost" tabIndex={1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <ul
          tabIndex={1}
          className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <a onClick={() => handleClick("new")}>New</a>
          </li>
          <li>
            <a onClick={() => handleClick("list")}>List</a>
          </li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">Memory Card</a>
    </div>
    <div className="form-control flex-none w-96">
      <input
        type="text"
        placeholder="Search Card"
        onBlur={handleInputChange}
        onKeyPress={handleKeyPress}
        className="input input-bordered w-full"
      />
    </div>
    <div className="flex-none gap-2">
      <div className="mr-4">{session?.user?.name && session.user.name}</div>
      <div className="dropdown dropdown-end mr-6">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={session?.user?.image ? session?.user?.image : ""}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          {/* <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li> */}
          <li onClick={handleSignOut}>
            <a>Sign out</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
}

export default Nav
