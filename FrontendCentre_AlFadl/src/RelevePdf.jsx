import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import html2pdf from "html2pdf.js";

function RelevePdf() {
  const [data, setData] = useState(null);
  const pdfRef = useRef();
  const { id } = { id: 6 }; // ID du stagiaire à récupérer (exemple)
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/releveNote/stagiaire/${id}`)
      .then(res => {
        console.log("DATA API:", res.data);
        setData(res.data);
      })
      .catch(err => console.log("ERROR:", err));
  }, [id]);
  const generatePdf = () => {
    const element = pdfRef.current;

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `releve_${data.stagiaire}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { format: "a4", orientation: "portrait" }
      })
      .save();
  };

  const getModuleNote = (modules, nomModule) => {
    return (
      modules.find((m) => m.module_nom === nomModule)?.moyenneModule || '-'
    );
  };
  if (!data) return <p>Chargement...</p>;
  return (
    <div>
      <button onClick={generatePdf}>
        Télécharger PDF
      </button>

      {/* CONTENU PDF */}
      <div ref={pdfRef} style={{ padding: 20, background: "white" }}>

        <h1 style={{ textAlign: "center" }}>
          Relevé de Notes Officiel
        </h1>

        <p>
          <strong>Nom :</strong> {data.stagiaire}
        </p>

        <table border="1" width="100%">
          <tbody>
            <tr>
              <td>Moyenne Branche</td>
              <td>{data.moyenneBranche}</td>
            </tr>

            <tr>
              <td>Note Stage</td>
              <td>{data.noteStage}</td>
            </tr>
            <tr>
              <td>Français</td>
              <td>
                {getModuleNote(
                  data.moyennesParModule,
                  'Français'
                )}
              </td>
            </tr>
             <tr>
              <td>Arabe</td>
              <td>
                {getModuleNote(
                  data.moyennesParModule,
                  'Arabe'
                )}
              </td>
            </tr>
             <tr>
              <td>Education islamique</td>
              <td>
                {getModuleNote(
                  data.moyennesParModule,
                  'Education islamique'
                )}
              </td>
            </tr>
             <tr>
              <td>Activités paralléles</td>
              <td>
                {getModuleNote(
                  data.moyennesParModule,
                  'Activités paralléles'
                )}
              </td>
            </tr>
            <tr>
              <td>Note Discipline</td>
              <td>{data.noteDiscipline}</td>
            </tr>

            <tr>
              <td><b>Moyenne Générale</b></td>
              <td><b>{data.moyenneGenerale}</b></td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default RelevePdf;