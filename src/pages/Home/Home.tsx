import React, { useEffect, useState } from "react";
import jsonData from "../../assets/data/data.json";
import Dashboard from "../../components/Dashboard/Dashboard";

const Home: React.FC<WithProps> = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    setData(jsonData);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getData();
    }, 0);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ height: "200vh" }}>
      <Dashboard data={data} />
    </div>
  );
};

export default Home;

interface WithProps {}
