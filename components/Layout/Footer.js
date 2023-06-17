import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className='w-full text-center text-xs text-secondary bg-white font-medium py-3 drop-shadow-lg'>
            <div className='flex flex-row justify-around items-center md:grid md:grid-cols-2 md:gap-3'>
                <div>
                    <a href='https://www.wunjo.life/mentions-legales/' className='block'>Mentions légales</a>
                </div>
                <div>
                    <p>Coordonnées postales :</p>
                    <a href="" className='block'>Les Clottes 716 chemin des Sablières 81570 Vielmur sur Agout</a>
                </div>
                <div>
                    <p>Contact client :</p>
                    <a href='mail:relationclient@maqvt.com'>relationclient@maqvt.com</a>
                </div>
                <div>
                    <p>Contact technique :</p>
                    <a href='mail:sav@maqvt.com'>sav@maqvt.com</a>
                </div>
            </div>
            <div className="w-full text-center text-xs text-secondary bg-white font-medium pt-3">
                © {currentYear} WUNJO. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;
