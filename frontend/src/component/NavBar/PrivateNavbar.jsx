import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { PlusIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction } from "../../../src/redux/slices/users/userSlices";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
  const { userAuth } = useSelector((state) => state.users);
  const userId = userAuth?.userInfo?.Id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const logoutHandler = () => {
    dispatch(LogoutAction());
    navigate("/");
  };

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Explore Feed", href: "/posts" },
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center">
                {/* Mobile Menu Toggle */}
                <div className="flex items-center md:hidden mr-2">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white focus:ring-2 focus:ring-indigo-500">
                    {open ? (
                      <XMarkIcon className="h-6 w-6" />
                    ) : (
                      <Bars3Icon className="h-6 w-6" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Brand Logo */}
                <Link to="/" className="flex flex-shrink-0 items-center group">
                  <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-3 transition-transform">
                    <img
                      className="h-6 w-auto invert"
                      src="https://cdn-icons-png.flaticon.com/512/1458/1458485.png"
                      alt="BloggyTech"
                    />
                  </div>
                  <span className="ml-3 text-xl font-bold text-white hidden sm:block">
                    Bloggy<span className="text-indigo-400">Tech</span>
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:ml-10 md:flex md:space-x-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        isActive(item.href)
                          ? "bg-slate-800 text-white"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white",
                        "px-3 py-2 rounded-md text-sm font-medium transition-all"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-x-4">
                {/* Create Post Button */}
                <Link
                  to="/add-post"
                  className="inline-flex items-center gap-x-1.5 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all active:scale-95"
                >
                  <PlusIcon className="h-5 w-5" />
                  <span className="hidden lg:inline">Create Story</span>
                </Link>

                {/* Notification Bell (Visual only) */}
                <button className="text-slate-400 hover:text-white transition-colors">
                  <BellIcon className="h-6 w-6" />
                </button>

                {/* Profile Dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-2 rounded-full bg-slate-800 p-1 pr-3 text-sm focus:ring-2 focus:ring-indigo-500 hover:bg-slate-700 transition-all">
                    <img
                      className="h-8 w-8 rounded-full border border-slate-700 object-cover"
                      src={
                        userAuth?.userInfo?.profilePicture ||
                        "https://via.placeholder.com/150"
                      }
                      alt="User profile"
                    />
                    <ChevronDownIcon className="h-4 w-4 text-slate-400" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-in"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-slate-900 border border-slate-800 py-2 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-2 border-b border-slate-800 mb-1">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                          Account
                        </p>
                        <p className="text-sm font-medium text-white truncate">
                          {userAuth?.userInfo?.username}
                        </p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={`/users-private-profile/${userId}`}
                            className={classNames(
                              active
                                ? "bg-slate-800 text-white"
                                : "text-slate-300",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Developer Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={logoutHandler}
                            className={classNames(
                              active
                                ? "bg-red-900/20 text-red-400"
                                : "text-slate-300",
                              "block w-full text-left px-4 py-2 text-sm"
                            )}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile Panel */}
          <Disclosure.Panel className="md:hidden bg-slate-900 border-t border-slate-800">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    isActive(item.href)
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as="button"
                onClick={logoutHandler}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-red-400 hover:bg-slate-800"
              >
                Logout
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
