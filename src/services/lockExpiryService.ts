import cron from "node-cron";
import { lockExpiration } from "./reservationsService";

const startExpirationChecker = () => {
  cron.schedule("* * * * *", async () => {
    const expirationDate = getTwentyMinutesBeforeDate(new Date());
    await lockExpiration(expirationDate);
  });
};

export { startExpirationChecker };
