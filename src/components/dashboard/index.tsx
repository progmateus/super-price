import { Header } from "../header"
import Sidebar from "../sidebar"
import styles from "./styles.module.scss"

export default function Dashboard() {
    return (
        <>
            <Header />

            <div className={styles.container}>
                <Sidebar />
            </div>
        </>
    )
}
