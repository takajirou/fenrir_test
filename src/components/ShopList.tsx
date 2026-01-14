import { IoLocationSharp } from "react-icons/io5";
import { MdRestaurant } from "react-icons/md";
import { BiWallet } from "react-icons/bi";
import Image from "next/image";
import styles from "@/styles/components/ShopList.module.css";
import { ShopCard } from "@/types/api/hotpepper";

interface Props {
    shops: ShopCard[];
    isLoading?: boolean;
}

const ShopList = ({ shops, isLoading }: Props) => {
    if (isLoading) {
        return <div className={styles.loading}>読み込み中...</div>;
    }

    if (shops.length === 0) {
        return <div className={styles.empty}>検索結果がありません</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {shops.map((shop) => (
                    <div key={shop.id} className={styles.card}>
                        <div className={styles.thumbnail}>
                            <Image
                                src={shop.image}
                                alt={shop.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                            />
                            <div className={styles.genreBadge}>
                                <MdRestaurant size={14} />
                                {shop.genre}
                            </div>
                        </div>

                        <div className={styles.content}>
                            <h3 className={styles.name}>{shop.name}</h3>

                            <div className={styles.access}>
                                <IoLocationSharp
                                    size={18}
                                    className={styles.locationIcon}
                                />
                                <p>{shop.access}</p>
                            </div>

                            <div className={styles.budget}>
                                <BiWallet
                                    size={18}
                                    className={styles.walletIcon}
                                />
                                <span>{shop.budget}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopList;
