import styles from "./styles.module.scss"
import { RiSearchLine } from "react-icons/ri"

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/white-shopping-cart-icon-9.jpg" alt="logo super price" />

                <nav>
                    <a className={styles.active}> Home </a>
                    <a href=""> Products </a>
                    <a href=""> About </a>
                </nav>

                <label>
                    <input placeholder="Buscar produto" />
                    <RiSearchLine />
                </label>

                <div className={styles.headerProfile}>
                    <div className={styles.headerProfileName}>
                        <p>john doe</p>
                        <p>johndoe@gmail.com</p>
                    </div>

                    <img src="/images/teste.jpg" alt="Foto de perfil" />

                </div>
            </div>
        </header>

    )
}