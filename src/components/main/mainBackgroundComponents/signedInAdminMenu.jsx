import { useCollection } from "../../firebase/useFirestoreDatabase.js";

const SignedInAdminMenu = () => {
  const { databaseFirestore } = useCollection("MissingIds");

  const renderIDsCollection = () => {
    if (databaseFirestore === null) {
      return <p>No IDs found for now.</p>;
    } else {
      return databaseFirestore[0].IdCollection.map((item) => {
        return <p key={item}>{item}</p>;
      });
    }
  };

  return (
    <div className="SignedInAdminMenu">
      <h2>Community IDs found:</h2>
      {renderIDsCollection()}
    </div>
  );
};
export default SignedInAdminMenu;
