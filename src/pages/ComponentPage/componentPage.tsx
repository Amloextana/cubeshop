import ComponentInfo from "./ComponentInfo/ComponentInfo";

import styles from "./componentpage.module.scss";
import { useParams } from "react-router-dom";

const ComponentPage = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  return (
    <div className={styles.componentpage}>
      <div className={styles.container}>
        <ComponentInfo id={id} />
      </div>
    </div>
  );
};

export default ComponentPage;
