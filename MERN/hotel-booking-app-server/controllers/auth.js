export const echoMessage = (req, res) => {
    res.status(200).send(req.params.message);
}