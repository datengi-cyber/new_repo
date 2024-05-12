import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import './compo.css'; 

const navigation = [
  { name: "Dashboard", href: "/", current: true },
  { name: "Inventory", href: "/inventory", current: false },
  { name: "Purchase Details", href: "/purchase-details", current: false },
  { name: "Sales", href: "/sales", current: false },
  { name: "Manage Store", href: "/manage-store", current: false },
];

const userNavigation = [{ name: "Sign out", href: "./login" }];

export default function Header() {
  const authContext = useContext(AuthContext);
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="header">
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="nav-container">
              <div className="logo-section">
                <img className="logo-header"
                  src={require("../assets/clothify.png")}
                  alt="Clothify Inventory management System"
                />
                <span className="site-title">
                  Clothify Inventory Management
                </span>
              </div>
              <div className="actions-container">
                <button type="button" className="notification-btn">
                  <img
                    src={require("../assets/notification.png")}
                    alt="Notification"
                    className="notif-icon"
                  />
                </button>



                <Menu as="div" className="profile-dropdown">
                  <Menu.Button className="profile-btn">
                    <img
                      className="profile-img"
                      src={localStorageData.imageUrl}
                      alt="profile"
                    />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition-enter"
                    enterFrom="transition-start"
                    enterTo="transition-end"
                    leave="transition-leave"
                    leaveFrom="transition-end"
                    leaveTo="transition-start"
                  >
                    <Menu.Items className="menu-items">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={`menu-item ${active ? 'active' : ''}`}
                              onClick={() => authContext.signout()}
                            >
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <Disclosure.Button className="menu-button">
                {open ? <XMarkIcon /> : <Bars3Icon />}
              </Disclosure.Button>
            </div>

            <Disclosure.Panel className="mobile-menu">
              {navigation.map((item) => (
                <Link to={item.href} key={item.name} className="mobile-menu-item">
                  <Disclosure.Button as="div" className={item.current ? "current" : ""}>
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
