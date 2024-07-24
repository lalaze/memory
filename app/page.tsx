import { auth } from "../auth";
import Content from '../components/content/page'
import { Session } from "next-auth";

export default async function Home() {
  const session = (await auth()) as Session;

  return (
    <div className="bg-zinc-900 flex flex-col h-screen">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="navbar bg-base-100 justify-between flex-none">
        <div className="flex-none">
          <a className="btn btn-ghost text-xl">memory</a>
        </div>
        <div className="form-control flex-none w-96">
          <input
            type="text"
            placeholder="Search Card"
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
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-grow">
        <Content></Content>
      </div>
    </div>
  );
}
