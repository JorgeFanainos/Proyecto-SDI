import "./CitasAgendadas.css";
import SidebarPsico from "../componentesperfiles/SidebarPsico";
import HeroCitas from "./HeroCitas";
import { useState, useEffect } from "react";
import { db, auth } from "../../../../utils/firebaseApp";

function CitasAgendadas() {
  const [loading, setLoading] = useState(true);
  const [citas, setCitas] = useState({});
  const [refresh, setRefresh] = useState(0);

  async function getCitas() {
    try {
      setLoading(true);
      const citasref = db.collection(`users/${auth.currentUser.uid}/citas`);
      await citasref;
      const citas = await citasref.get();
      let docsCitas = {};
      let data;
      let docId;
      citas.forEach((doc) => {
        data = doc.data();
        docId = doc.id;

        docsCitas[docId] = data;
        docsCitas[docId]["id"] = docId;
      });

      setCitas(docsCitas);

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }
  console.log("hola");
  useEffect(() => {
    getCitas();
  }, [refresh]);
  return (
    <div className="container">
      <div className="sidebarcitas">
        <SidebarPsico />
      </div>
      <div className="herocitas">
      <HeroCitas />
      </div>
    </div>
  );
}

export default CitasAgendadas;
