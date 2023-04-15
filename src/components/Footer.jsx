import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="bd-footer">
      <div className="container">
        <div className="info-site">
          <div className="head">
            <img className="main-logo" src="logo-website.svg" alt="Logo IUDI" />
            <b>IUD Inventory</b>
          </div>
          <div className="integrants">
            <h4>
              <code>Desarrollo de IUDI</code>
            </h4>
            <b>Juan Peñaloza</b>
            <br />
            ✉️ <i>juan.penaloza@est.iudigital.edu.co</i>
            <br />
            <b>Rafael Molina</b>
            <br />
            ✉️ <i>rafael.molina@est.iudigital.edu.co</i>
            <br />
            <b>Danilo Ocampo</b>
            <br />
            ✉️ <i>danilo.ocampo@est.iudigital.edu.co</i>
          </div>
        </div>
        <div className="foot">
          <p>
            @coyright 2023 | <b>Latam for Latam 💚</b>
          </p>
        </div>
      </div>
    </footer>
  );
}
