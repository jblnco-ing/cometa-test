// types
import { FC, ReactNode } from "react";

// component
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const PayOrderList: FC<{ orderTypeName: string, children?: ReactNode[] }> = ({ children, orderTypeName }) => {

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
			>
				{orderTypeName}
			</AccordionSummary>
			<AccordionDetails>
				{
					children?.length ? children : 'Sin Cuotas'
				}
			</AccordionDetails>
		</Accordion>
	);
};