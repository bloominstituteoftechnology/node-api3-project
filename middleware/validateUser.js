module.exports = function (req, res, next) {
  try {
    // checking if the body exists
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ error: "Missing post data" });
    }

    const { name } = req.body;

    if (!name)
    return res.status(400).send({ message: "Missing required name field" });

    req.name = name; 

    return next(); 
  } catch (e) {
    res.status(500).send(e);
  }
};
