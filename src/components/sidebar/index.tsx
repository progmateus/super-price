import styles from "./styles.module.scss"
import { RiDashboardLine } from "react-icons/ri"

export default function Sidebar() {
    return (
        <>
            <aside className={styles.container}>
                <div>
                    <div>
                        <h1>HOME</h1>
                        <div>
                            <RiDashboardLine />
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
