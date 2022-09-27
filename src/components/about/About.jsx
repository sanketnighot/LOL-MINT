import styles from "./About.module.css";
const About = () => {
  return (
 <div className="container mx-auto pt-20 ">
  <div className="row">
    <div className={`mx-auto  text-center mt-20 mb-20 pl-3 pr-3` }>
      <span className={`${styles.abtUs}`}>About</span>
      <p >
        The future of retail is here on the LOL Metaverse. The virtual shopping
        experience on the metaverse will not be bound by physical space,
        allowing its users to virtually experience the product before buying it.
        In the LOL Metaverse, Brands will have more creative freedom to express
        themselves and attract customers than in the physical or online retail
        space.
      </p>
    </div>
    </div>
 </div>
  );
};

export default About;
