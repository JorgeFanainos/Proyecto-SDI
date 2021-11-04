import React from "react";
import './pagesFooter.css';

function Contacto(){
    return(
        <div className="div">
            <h1 className="h1">Contacto</h1>
            <a
              class='social-icon-link1 instagram'
              href='https://www.instagram.com/MyHelperSDI'
              rel='noreferrer'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />Instagram
            </a>
            <a
              class='social-icon-link1 twitter'
              href='https://twitter.com/Paginapsicolog1'
              rel='noreferrer'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' /> Twitter
            </a>
            <a
              class='social-icon-link1 twitter'
              href='https://accounts.google.com/signin/v2/identifier?hl=es&continue=https%3A%2F%2Fmail.google.com&service=mail&ec=GAlAFw&flowName=GlifWebSignIn&flowEntry=AddSession'
              rel='noreferrer'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-google' /> Gmail
            </a>
        </div>
        

    )

}
export default Contacto;    