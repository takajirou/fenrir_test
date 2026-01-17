import styles from "../styles/components/LoadingOverlay.module.css";

interface LoadingOverlayProps {
    message?: string;
}

export default function LoadingOverlay({
    message = "読み込み中...",
}: LoadingOverlayProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
}
