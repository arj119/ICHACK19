var remotePath = "/home/pi/server_code",
    host = "192.168.137.46",
    username = "pi",
    password = "icHackI9",

    gulp = require("gulp"),
    gutil = require("gulp-util"),
    sftp = require("gulp-sftp"),
    GulpSSH = require("gulp-ssh"),
    fs = require("fs"),

    config = {
        host: host,
        port: 22,
        username: username,
        password: password
    },
    gulpSSH = new GulpSSH({ignoreErrors: !0, sshConfig: config});

gulp.task("upload", function () {
    return gulp.src("**/*").pipe(sftp({
        host: host,
        user: username,
        pass: password,
        remotePath: remotePath
    }));
}), gulp.task("exec", function () {
    if (args = process.argv, -1 === args.indexOf("-f")) throw new gutil.PluginError({
        plugin: "Error",
        message: "You have not provided a file name"
    });
    return file = args[args.indexOf("-f") + 1],
    -1 === file.indexOf(".py") && (file += ".py"),
        gulpSSH.shell(["python " + remotePath + file],
            {
                filePath: "commands.log",
                autoExit: !0
            }
        ).pipe(gulp.dest("logs"));
});
