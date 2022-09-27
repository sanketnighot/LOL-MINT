import Image from "next/image";
import styles from "./Roadmap.module.css";

const Roadmap = ({
  order,
  imageSrc,
  textHeading,
  textBody,
  textParaHeading,
  textPara1,
  textPara2,
  textPara3,
  w = 830,
  h = 750,
}) => {
  return (
    <>
      <div className="container mx-auto my-20 mt-20">
        <div className="row mx-auto">
          <div className=" res text-center mt-10 mb-10 ">
            <h2 className="heading">{textHeading}</h2>
            <p>{textBody}</p>
          </div>
          <div className={`${styles.roadmapWrapper}`}>
            <div className={` ${order} ${styles.order} flex `}>
              <div className={`${styles.RoadMapImage}`}>
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    className={`${styles.imageRoadmap}`}
                    alt="vip pass"
                    width={w}
                    height={h}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={`${styles.roadmapList}`}>
              <div className={`${styles.listHeading}`}>{textParaHeading}</div>
              <ul className={`space-y-2 ${styles.ulFont}`}>
                <li className="text-lg">{textPara1}</li>
                <li className="text-lg">{textPara2}</li>
                <li className="text-lg">{textPara3}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
