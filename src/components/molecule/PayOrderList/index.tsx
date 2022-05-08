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
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {orderTypeName}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{helpText}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {children?.length ? children : "Sin Cuotas"}
      </AccordionDetails>
    </Accordion>
  );
};
