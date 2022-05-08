// types
import { FC, ReactNode } from "react";

// component
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const PayOrderList: FC<{
  helpText?: string;
  orderTypeName: string;
  children?: ReactNode[];
}> = ({ helpText, orderTypeName, children }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>
					<Typography variant="subtitle2" fontWeight='bold' >
						{orderTypeName}<br/>
					</Typography>
					<Typography variant="caption" color='secondary' >
						{helpText}
					</Typography>
				</div>
      </AccordionSummary>
      <AccordionDetails>
        {children?.length ? children : "Sin Cuotas"}
      </AccordionDetails>
    </Accordion>
  );
};
