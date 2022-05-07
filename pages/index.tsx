// components
import { TotalPayment } from "components/molecule/TotalPayment";
import { Header } from "components/organism/Layout";

// material ui
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// types
import type { NextPage } from "next";

//services
import * as studentService from "services/student";

const Home: NextPage = ({student}:any) => {
	 
  return (
    <>
      <Header schoolName="San Miguel" />
      <div>
        <TotalPayment student={{}} total={0} />
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            Cuotas Pagadas
          </AccordionSummary>
          <AccordionDetails>content</AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            Cuotas Pendientes
          </AccordionSummary>
          <AccordionDetails>content</AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            Cuotas Futuras
          </AccordionSummary>
          <AccordionDetails>content</AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export async function getServerSideProps() {
	const testStudentId = '3b35fb50-3d5e-41b3-96d6-c5566141fab0'
	const student = await studentService.find(testStudentId)
	
  return { props: { student } }
}
export default Home;
