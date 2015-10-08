import kit from "nokit";

async () => {

    let server = await kit.readJson(__dirname + "/../.server");
    let url = `http://127.0.0.1:${server.port}/api/push`;

    let body = await kit.request({
        url,
        reqData: JSON.stringify({
            cwd: process.cwd()
        })
    });

    console.log(body);

}().catch(kit.throw);
