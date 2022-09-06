const CronJob = require('cron').CronJob;

async function start(job) {
    let running = false;
    let cron = new CronJob('*/10 * * * * * ', async function() {
        console.log(`running`, running)
        if(running)
            return
        console.log(`starting job at ${new Date(Date.now())}....`)
        running = true
        try {
            job()
        }
        finally {
            running = false
        }
    }, null, true, null, null, true);
    cron.start();
}

module.exports = {
    start
}