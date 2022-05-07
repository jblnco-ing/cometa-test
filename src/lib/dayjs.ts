import dayjs from "dayjs";
import mx from "dayjs/locale/es-mx";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter).locale(mx);

export default dayjs;
