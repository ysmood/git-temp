import kit from "nokit";

export default (task) => {
    task("build", () =>
        kit.spawn("babel", [
            "--optional", "runtime",
            "src", "--out-dir", "lib"
        ])
    );
};
