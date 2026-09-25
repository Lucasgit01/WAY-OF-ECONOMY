import "../../assets/css/Sidebar.css";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, type Transition } from 'framer-motion';
import { useAuthStore } from "../../../hooks/authStore";
import {
  Box,
  BriefcaseBusinessIcon,
  Home,
  LogOut,
  PanelLeftOpenIcon,
  PanelRightOpenIcon,
  Plus,
  Zap,
  Building2,
  HandshakeIcon,
  Settings,
  UserCircle2Icon,
  ShoppingCartIcon,
  BadgeDollarSign,
  FilterX
} from "lucide-react";
import Logo from "../../assets/images/way of economy - cut - logo.png"
import { Button } from "../../ui/SubmitButton";
import { reduceName } from "../../../utils/reduceName";
import { useManagementStore } from "../../../hooks/management-store";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition: Transition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.8,
};

const interactions = [
  "Tenha um ótimo trabalho.",
  "Como vão as vendas?",
  "É um prazer tê-lo conosco.",
  "Seu trabalho faz a diferença."
];

const randomInt = Math.floor(Math.random() * interactions.length + 1) - 1;

const optionsMenu = [
  {
    label: "Inicio",
    icon: Home,
    path: "/home",
  },
  {
    label: "Produtos",
    icon: Box,
    path: "/products",
  },
  {
    label: "Vendas",
    icon: ShoppingCartIcon,
    path: "/sales",
  },
  {
    label: "Finanças",
    icon: BadgeDollarSign,
    path: "/finance",
  },
  {
    label: "Perfil",
    icon: UserCircle2Icon,
    path: "/profile",
  },
  {
    label: "Configurações",
    icon: Settings,
    path: "/settings",
  },
]

export const Sidebar = () => {
  const authStore = useAuthStore();
  const { store, setStore } = useManagementStore();

  const [collapsed, setCollapse] = useState(true);
  const [logOff, setLogOff] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    setLogOff(!logOff);
    authStore.logout();
    navigate("/")
  }

  return (
    <div className="container">
      {/* Sidebar */}
      <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-body">
          <div className="background-top"></div>
          <div className="sidebar-top">
            <button
              className="arrow-btn"
              onClick={() => setCollapse(!collapsed)}
              aria-expanded={!collapsed}
            >
              {collapsed ? <PanelLeftOpenIcon /> : <PanelRightOpenIcon />}
            </button>
            <div className="sidebar-profile">
              <UserCircle2Icon style={{ scale: 1.7 }} />
            </div>
            {!collapsed && (
              <div className="profile-title">
                <BriefcaseBusinessIcon /><p style={
                  {
                    fontWeight: 600,
                    fontSize: 14,
                    textShadow: "0px 0px 2px white"
                  }
                }>{authStore.role}</p>
              </div>
            )}
            <nav className="menu">
              {
                optionsMenu.map((m) => (
                  <Link
                    to={m.path}
                    className="menu-link"
                  >
                    <m.icon />{!collapsed && m.label}
                  </Link>
                ))
              }
            </nav>
          </div>

          <div className="sidebar-footer">
            <Button
              title={!collapsed ? "Sair" : ""}
              colors={{ background: "rgba(192, 30, 92, 0.89)", details: "white" }}
              Icon={LogOut}
              style={{ fontSize: 18 }}
              props={{ disabled: logOff }}
              requested={logOff}
              requestedMsg=" "
              onClick={logout}
            />
          </div>
        </div>
      </aside>

      {/* Conteúdo */}
      <div className="content">
        <main>
          <div className="header-content">
            <img className="header-logo" src={Logo} width={110} height={60} />
            <header>
              <p className="welcome">Olá, {reduceName(authStore.name, false)}. 👋 {interactions[randomInt]}</p>
              <div className="header-actions">
                {store !== "all" &&
                  <button
                    className="header-buttons"
                    style={{ background: `linear-gradient(to bottom left, rgb(138, 153, 151), rgb(124, 126, 124)` }}
                    onClick={() => setStore("all")}
                  >
                    <FilterX />
                  </button>
                }
                <button
                  className="header-buttons"
                  style={{ background: `linear-gradient(to bottom left, rgb(70, 204, 186), rgb(46, 177, 90)` }}
                  onClick={() => setStore("way")}
                >
                  <Building2 /> Central (WAY)
                </button>
                <button
                  className="header-buttons"
                  style={{ background: `linear-gradient(to bottom left, rgb(14, 139, 189), rgb(19, 152, 192))` }}
                  onClick={() => setStore("sponsored")}
                >
                  <HandshakeIcon /> Parceiros
                </button>
                <button
                  className="header-buttons"
                  style={{ background: `linear-gradient(to bottom left, rgb(228, 198, 28), rgb(216, 144, 11))` }}
                  onClick={() => setStore("advertiser")}
                >
                  <Zap /> ADS
                </button>
                <div style={{ borderRight: "2px solid grey" }} />
                <button
                  className="header-buttons"
                  style={{ background: `linear-gradient(to bottom left, rgb(81, 23, 173), rgb(88, 21, 196))` }}
                >
                  <Plus /> Produto
                </button>
              </div>
            </header>
          </div>
          <AnimatePresence mode="wait">
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}