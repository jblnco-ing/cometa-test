// material ui
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// types
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
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
  );
};

export default Home;
