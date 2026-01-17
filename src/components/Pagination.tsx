import styles from "../styles/components/PagiNation.module.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    const getPageNumbers = (): (number | string)[] => {
        // 5ページ以下の場合
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const pages: (number | string)[] = [];

        pages.push(1);

        // 現在ページが先頭付近の場合
        if (currentPage <= 3) {
            pages.push(2, 3, 4, "...", totalPages);
        } else if (currentPage >= totalPages - 2) {
            // 現在ページが末尾付近の場合
            pages.push(
                "...",
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages
            );
        } else {
            // 現在ページが中間の場合
            pages.push(
                "...",
                currentPage - 1,
                currentPage,
                currentPage + 1,
                "...",
                totalPages
            );
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={styles.pagination}>
            <button
                className={styles.navButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="前のページ"
            >
                前へ
            </button>

            <div className={styles.pageNumbers}>
                {pageNumbers.map((page, index) => {
                    if (page === "...") {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className={styles.ellipsis}
                            >
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${
                                currentPage === page ? styles.active : ""
                            }`}
                            onClick={() => onPageChange(page as number)}
                            aria-label={`ページ${page}`}
                            aria-current={
                                currentPage === page ? "page" : undefined
                            }
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                className={styles.navButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="次のページ"
            >
                次へ
            </button>
        </div>
    );
}
