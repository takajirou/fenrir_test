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
        return <div className={styles.Loading}>読み込み中...</div>;
    }

    if (shops.length === 0) {
        return <div className={styles.Empty}>該当する店舗が見つかりません</div>;
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Grid}>
                {shops.map((shop) => (
                    <div key={shop.id} className={styles.Card}>
                        <div className={styles.Thumbnail}>
                            <Image
                                src={shop.image}
                                alt={shop.name}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                            />
                            <div className={styles.GenreBadge}>
                                <MdRestaurant size={14} />
                                {shop.genre}
                            </div>
                        </div>

                        <div className={styles.Content}>
                            <h3 className={styles.Name}>{shop.name}</h3>

                            <div className={styles.Access}>
                                <IoLocationSharp
                                    size={18}
                                    className={styles.LocationIcon}
                                />
                                <p>{shop.access}</p>
                            </div>

                            <div className={styles.Budget}>
                                <BiWallet
                                    size={18}
                                    className={styles.WalletIcon}
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
