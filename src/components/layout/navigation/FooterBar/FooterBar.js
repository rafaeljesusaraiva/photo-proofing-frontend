import React from "react";

export function FooterBar() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer text-base-content footer-center p-10">
            <p>&copy; Copyright {currentYear}, Rafael Jesus Saraiva</p>
        </footer>
    );
}