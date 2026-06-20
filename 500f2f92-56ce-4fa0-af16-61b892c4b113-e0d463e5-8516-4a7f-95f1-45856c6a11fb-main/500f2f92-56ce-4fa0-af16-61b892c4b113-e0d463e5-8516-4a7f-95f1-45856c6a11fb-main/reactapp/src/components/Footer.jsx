// import React from 'react';

// function Footer()
// {
//     return(
//         <footer style = {styles.footer}>
//             <p>&copy; {new Date().getFullYear()} Neo Cricket Tournament.</p>
//         </footer>
//     );
// }

// const styles=
// {
//     footer:{
//         marginTop: 'auto',
//         padding: '10px 0',
//         backgroundColor: "#222",
//         color: '#fff',
//         textAlign: 'center',
//         position: 'fixed',
//         width: '100%',
//         bottom:0
//     }
// };
// export default Footer;

import React from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-inner">
                © 2023 Cricket Tournament Registration App
            </div>
        </footer>
    );
}
