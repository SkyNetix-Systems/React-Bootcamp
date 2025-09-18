export const welcome = (req, res) => {
  res.json({
    data: "Hello from nodejs api",
  });
};

export const preRegister = async (req, res) => {
  try {
    console.log(req.body);
    const emailSent = true;
    if (emailSent) {
      res.json({ ok: true });
    } else {
      res.json({ ok: false });
    }
  } catch (err) {
    console.log(err);
    return res.json({ error: "Something went wrong please try again." });
  }
};
