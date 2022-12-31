import { InfomationMenuMap } from "./menuComponents/InfomationMenuMap";

const InfomationMenu = () => {
  return (
    <section className="infomationMenuSection">
      <div className="infomationMenuWrapper">
        <div className="upperContent">
          <h2>Information Menu</h2>
        </div>
        <div className="middleContent">
          {InfomationMenuMap.map((item, index) => {
            return (
              <div key={index} className="content">
                <h3>{item.Heading}</h3>
                <p>{item.Content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default InfomationMenu;
