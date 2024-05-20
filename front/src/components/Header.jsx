import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPersonFalling, faCartShopping, faLock,faGears} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from "react-redux"
import {selectUser} from "../slices/UserSlice"
import BookSearch from './BookSearch';
import CartPreviewModal from './modal/CartPreviewModal';
import BurgerModal from './modal/BurgerPreviewModal';
import SettingModal from './modal/SettingModal';
import { ReactComponent as LogoSVG } from '../../assets/bookLogo.svg?react';



const Header = () => {
    const user = useSelector(selectUser);
    const [isScrolled, setIsScrolled] = useState(false);
    const [showCartPreview, setShowCartPreview] = useState(false);
    const [showMenuModal, setShowMenuModal] = useState(false);
    const [showSettingModal, setShowSettingModal] = useState(false);
    const [showSideMenu, setSideShowMenu] = useState(false);
    const [dyslexicMode, setDyslexicMode] = useState(() => localStorage.getItem('dyslexicMode') || 'false');
    const closeMenu = () => {
        setSideShowMenu(false); // Si vous utilisez un état pour contrôler l'ouverture/fermeture du menu
        setShowMenuModal(false); // Ferme le burger menu si utilisé
    };
    

    const onToggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'Light' ? '' : 'Light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Sauvegardez la préférence de l'utilisateur
    };

    const onToggleDyslexicMode = () => {
        let newMode;
        switch (dyslexicMode) {
            case 'false':
                newMode = 'true';
                break;
            case 'true':
                newMode = 'super';
                break;
            default:
                newMode = 'false';
        }
        setDyslexicMode(newMode); // Mise à jour de l'état
        document.documentElement.setAttribute('data-dyslexic', newMode); // Appliquer le nouvel état
        localStorage.setItem('dyslexicMode', newMode); // Sauvegarder le nouvel état
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        document.documentElement.setAttribute('data-dyslexic', dyslexicMode);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenuModal = () => {
        setShowMenuModal(!showMenuModal);
    };

    console.log("header user", user)
    
    return (
        <header className={isScrolled ? 'sticky scrolled' : 'sticky'}>
            <nav>
                <section className="header-top">
                    <button onClick={() => setSideShowMenu(!showSideMenu)} className="logo-container">
                        <LogoSVG alt="Logo Bibliologie" className="logo" />
                    </button>
                    <section className={showSideMenu ? 'menu-active' : ''}>
                        <div className="overlay" onClick={() => setSideShowMenu(false)}></div>
                        <aside className="sidebar-menu">
                            {user.isLogged ? (
                                <>
                                    <Link to="/profil" onClick={closeMenu}>Profil</Link>
                                    {(user.infos.status === 'admin' || user.infos.status === 'superAdmin') && (
                                        <Link to="/admin" onClick={closeMenu}>Gestion</Link>
                                    )}
                                    <Link to="/logout" onClick={closeMenu}>Déconnexion</Link>
                                    {user.infos.adult === 1 && (
                                    <> {/* Ajout d'un fragment pour englober les deux liens */}
                                        <Link to="/shop/home" onClick={closeMenu}>Shop Adulte</Link>
                                        <Link to="/cart" onClick={closeMenu}>Panier</Link>
                                    </>
                                )}
                                </>
                            ) : (
                                <>
                                    <Link to="/register" onClick={closeMenu}>S'enregistrer</Link>
                                    <Link to="/login" onClick={closeMenu}>Se connecter</Link>
                                </>
                            )}
                            {/* Placer le bouton des paramètres d'accessibilité ici pour qu'il soit toujours visible */}
                            <button onClick={() => {
                                closeMenu();
                                setShowSettingModal(true);
                            }}>
                            <FontAwesomeIcon icon={faGears} />Theme</button>
                        </aside>
                    </section>
                    <Link to="/"><h1>Bibliologie</h1></Link>
                </section>
                <section className={`menu header-bottom`}>
                    <section className="spacer"> </section>
                    <BookSearch />
                    <FontAwesomeIcon
                        icon={faBars}
                        className="burger-menu-icon"
                        onClick={toggleMenuModal}
                        aria-label="Ouvrir le menu"
                        />
                    <BurgerModal show={showMenuModal} onClose={toggleMenuModal}>
                        <aside className="menu">
                            {user.isLogged ? (
                                <>
                                    <Link to="/profil" onClick={closeMenu}>Profil</Link>
                                    {(user.infos.status === 'admin' || user.infos.status === 'superAdmin') && (
                                        <Link to="/admin" onClick={closeMenu}><FontAwesomeIcon icon={faLock} /> Gestion</Link>
                                    )}
                                    <Link to="/logout" onClick={closeMenu}><FontAwesomeIcon icon={faPersonFalling} /> Déconnexion</Link>
                                    {user.infos.adult === 1 && (
                                        <Link to="/shop/home" onClick={closeMenu}>Shop Adulte</Link>
                                    )}
                                </>
                            ) : (
                                <>
                                    <Link to="/register" onClick={closeMenu}>S'enregistrer</Link>
                                    <Link to="/login" onClick={closeMenu}>Se connecter</Link>
                                </>
                            )}
                        </aside>
                    </BurgerModal>
                    {user.isLogged && user.infos.adult === 1 && (
                        <div className="cart-icon-container" onMouseEnter={() => setShowCartPreview(true)} onMouseLeave={() => setShowCartPreview(false)}>
                            <Link to="/cart" aria-label="Voir le panier">
                                <FontAwesomeIcon icon={faCartShopping} />
                            </Link>
                            <CartPreviewModal show={showCartPreview} />
                        </div>
                    )}
                    <button onClick={() => setShowSettingModal(true)}>
                        <FontAwesomeIcon icon={faGears} />
                        Theme
                    </button>
                    <SettingModal 
                        show={showSettingModal} 
                        onClose={() => setShowSettingModal(false)}
                        onToggleTheme={onToggleTheme}
                        dyslexicMode={dyslexicMode}
                        onToggleDyslexicMode={onToggleDyslexicMode}
                        />
                </section>
            </nav>
        </header>
    );
};

export default Header;