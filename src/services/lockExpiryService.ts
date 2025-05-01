import cron from "node-cron";
import { lockExpiration } from "./reservationsService";
import { getTwentyMinutesBeforeDate } from "../utils/reservation";

const startExpirationChecker = () => {
  cron.schedule("* * * * *", async () => {
    const expirationDate = getTwentyMinutesBeforeDate(new Date());
    await lockExpiration(expirationDate);
  });
};

export { startExpirationChecker };
