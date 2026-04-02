import React from "react";
import footerLogo from "../../images/logo.png";

const Footer = ({ onImpressumClick }: { onImpressumClick?: () => void }) => (
  <footer className="bg-surface text-slate-400 py-8 px-4 mt-16 w-full">
    <div className="flex flex-col items-center justify-center w-full">
      <img src={footerLogo} alt="Nachhilfe Plus Logo" className="h-12 mb-4" />
      <nav className="mb-4">
        <ul className="flex flex-wrap gap-8 justify-center items-center text-sm">
          <li><a href="#">Start</a></li>
          <li><a href="#ueber-uns">Über uns</a></li>
          <li><a href="#angebot">Angebot</a></li>
          <li><a href="#kontakt">Kontakt</a></li>
          <li><button onClick={onImpressumClick} className="hover:text-primary underline bg-transparent border-none cursor-pointer p-0 m-0">Impressum</button></li>
          <li><a href="#datenschutz">Datenschutz</a></li>
        </ul>
      </nav>
      <div className="text-xs tracking-widest text-center mb-2">© 2019 NACHHILFE PLUS • DIE ZUKUNFT DER BILDUNG</div>
    </div>
  </footer>
);

export default Footer;
