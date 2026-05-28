import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { useAuth } from './AuthContext';
import { useTranslation } from 'react-i18next';

const Logo = () => (
    <div className="flex items-center h-12 overflow-visible">
        <img
            src="/images/Logo RS 1.png"
            alt="First Real State Logo"
            className="h-10 w-auto object-contain transform scale-125 origin-center -my-1"
        />
    </div>
);

interface HeaderProps {
    onNavigate: (view: 'home' | 'login' | 'dashboard' | 'userPortal' | 'about' | 'contact' | 'servicios') => void;
    onLogout: () => void;
    onNavClick: (href: string) => void;
    onOpenAppointmentModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, onLogout, onNavClick, onOpenAppointmentModal }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isAuthenticated, currentUser } = useAuth();
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Helper to translate nav links
    const getTranslatedNavLink = (href: string, defaultName: string) => {
        const keyMap: Record<string, string> = {
            '#home': 'header.home',
            '#properties': 'header.properties',
            '#servicios': 'header.services',
            '#about': 'header.about',
            '#contact': 'header.contact',
        };
        return keyMap[href] ? t(keyMap[href]) : defaultName;
    };

    const handleNavLinkClick = (e: React.MouseEvent<HTMLButtonElement>, view: 'home' | 'login' | 'dashboard' | 'userPortal' | 'about' | 'contact' | 'servicios') => {
        e.preventDefault();
        onNavigate(view);
        setIsMenuOpen(false); // Close mobile menu on navigation
    };

    const handleLogoutClick = () => {
        onLogout();
        setIsMenuOpen(false);
    };

    return (
        <header className="bg-white backdrop-blur-sm sticky top-0 z-50 shadow-lg border-b border-ileana-navy/10">
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                <div className="flex items-center justify-between">
                    <button onClick={() => onNavigate('home')} aria-label="Go to homepage" className="flex-shrink-0">
                        <Logo />
                    </button>
                    
                    {/* Language Switcher - Desktop & Mobile */}
                    <div className="flex items-center space-x-2 ml-4 mr-auto">
                        <button 
                            onClick={() => changeLanguage('es')} 
                            className={`text-xl transition-transform hover:scale-110 ${i18n.language === 'es' ? 'opacity-100 scale-110' : 'opacity-50'}`}
                            title="Español"
                        >
                            🇲🇽
                        </button>
                        <button 
                            onClick={() => changeLanguage('en')} 
                            className={`text-xl transition-transform hover:scale-110 ${i18n.language === 'en' ? 'opacity-100 scale-110' : 'opacity-50'}`}
                            title="English"
                        >
                            🇺🇸
                        </button>
                    </div>
                    
                    {!isAuthenticated && (
                        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            <button onClick={() => onNavigate('home')} className="text-ileana-orange hover:text-ileana-navy transition-colors duration-300 font-medium text-sm lg:text-base">
                                {t('header.home')}
                            </button>
                            {NAV_LINKS.filter(link => link.name !== 'Inicio').map((link) => (
                                <button key={link.name} onClick={() => onNavClick(link.href)} className="text-ileana-orange hover:text-ileana-navy transition-colors duration-300 font-medium text-sm lg:text-base">
                                    {getTranslatedNavLink(link.href, link.name)}
                                </button>
                            ))}
                        </nav>
                    )}

                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button onClick={() => onNavigate('userPortal')} className="text-ileana-navy font-medium px-3 py-2 lg:px-5 rounded-xl hover:bg-ileana-navy/10 transition-all duration-300 font-heading">
                                    {t('header.agentPortal')}
                                </button>
                                {currentUser?.role === 'admin' && (
                                    <button onClick={() => onNavigate('dashboard')} className="text-ileana-navy font-medium px-3 py-2 lg:px-5 rounded-xl hover:bg-ileana-navy/10 transition-all duration-300 font-heading">
                                        {t('header.adminPortal')}
                                    </button>
                                )}
                                <span className="text-ileana-navy font-medium whitespace-nowrap font-body">Hola, {currentUser?.username}</span>
                                <button onClick={handleLogoutClick} className="text-ileana-navy font-medium px-3 py-2 lg:px-5 rounded-xl hover:bg-ileana-navy/10 transition-all duration-300 font-heading">
                                    {t('header.logout')}
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={(e) => handleNavLinkClick(e, 'login')} className="bg-ileana-navy text-ileana-white font-bold px-4 py-2 rounded-xl hover:bg-ileana-navy/90 transition-all duration-300 transform hover:scale-105 shadow-ileana text-sm lg:text-base font-heading">
                                    Ingresar
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-ileana-navy lg:hidden flex-shrink-0 p-2" aria-label="Toggle Menu">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 border-t border-gray-700 pt-4">
                        <nav className="space-y-2">
                            {!isAuthenticated ? (
                                <>
                                    <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                                        {t('header.home')}
                                    </button>
                                    {NAV_LINKS.filter(link => link.name !== 'Inicio').map((link) => (
                                        <button key={link.name} onClick={() => { onNavClick(link.href); setIsMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium">
                                            {getTranslatedNavLink(link.href, link.name)}
                                        </button>
                                    ))}
                                    <button onClick={(e) => handleNavLinkClick(e, 'login')} className="text-white font-medium px-3 py-2 rounded-md hover:bg-inverland-blue transition-colors duration-300 text-left w-full">
                                        Login
                                    </button>
                                    <button onClick={() => { onOpenAppointmentModal(); setIsMenuOpen(false); }} className="bg-inverland-green text-white font-bold px-3 py-2 rounded-md hover:bg-opacity-90 transition-transform duration-300 transform hover:scale-105 shadow-md w-full">
                                        {t('header.bookAppointment')}
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => { onNavigate('userPortal'); setIsMenuOpen(false); }} className="block w-full text-left text-white font-medium px-3 py-2 rounded-md hover:bg-inverland-blue transition-colors duration-300">
                                        {t('header.agentPortal')}
                                    </button>
                                    {currentUser?.role === 'admin' && (
                                        <button onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }} className="block w-full text-left text-white font-medium px-3 py-2 rounded-md hover:bg-inverland-blue transition-colors duration-300">
                                            {t('header.adminPortal')}
                                        </button>
                                    )}
                                    <button onClick={handleLogoutClick} className="block w-full text-left text-white font-medium px-3 py-2 rounded-md hover:bg-inverland-blue transition-colors duration-300">
                                        {t('header.logout')}
                                    </button>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;