import kit from "nokit";
import git from "nodegit";

async () => {

    let repo = await git.Repository.open(".");
    let head = await repo.getHeadCommit();
    let sign = git.Signature.now("git-temp", "git-temp@git-temp");

    let tempName = "git-temp-auto-" + Date.now();

    kit.logs("create branch:", tempName);
    let tempRef = await repo.createBranch(tempName, head);

    repo.checkoutBranch(tempRef);

    kit.logs("add all & commit");
    await (await repo.index()).addAll("**");
    await repo.createCommitOnHead(["."], sign, sign, "git-temp auto commit");

    kit.logs("auto commit done");

}().catch(kit.throw);
