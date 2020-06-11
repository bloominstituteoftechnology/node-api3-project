module.exports = (format) => {
    return (req, res, next) => {
        const time = new Date().toISOString();
        switch (format) {
           case "custom":
               console.log(`Logger: [${time}] ${req.method} ${req.url}`);
            }
           next();
         };
       };
