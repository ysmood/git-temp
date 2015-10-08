import kit from "nokit";
import { spawn } from "child_process";

let { flow, select, body } = kit.require("proxy");

async () => {

    let app = flow();

    app.push(
        async ($) => {
            kit.logs("access:", $.req.url);
            await $.next();
        },

        body(),

        select("/api/push", ($) => {
            let data = JSON.parse($.reqBody);

            let ps = spawn(
                "node",
                [`${__dirname}/push-temp.js`, $.reqBody + ""],
                {
                    cwd: data.cwd,
                    stdio: ["ignore", process.stdout, process.stderr]
                }
            );

            $.body = `task added ${ps.pid}`;
        })
    );

    await app.listen(0);

    let port = app.server.address().port;

    await kit.outputJson(`${__dirname}/../.server`, { port });

    kit.logs(`listen at ${port}`);

}().catch(kit.throw);

