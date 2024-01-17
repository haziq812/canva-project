const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const mockData = require("./db.json");
const jwt = require("jsonwebtoken");
const dummyData = require("./sample_result_json");

server.db = router.db;

// Set default middlewares (logger, static, cors)
server.use(middlewares);

// Add custom middleware for authentication
// server.use(auth);

server.use(jsonServer.bodyParser);

// Add custom middleware for validation
server.use((req, res, next) => {
  if (req.method === "POST" && req.path === "/posts") {
    const { body } = req;
    // Your custom validation logic here
    if (!body.title || !body.content) {
      return res
        .status(400)
        .json({ error: "Title and content are required for a post." });
    }
  }
  server.use(jsonServer.bodyParser);
  next();
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (token) {
    jwt.verify(token, "TEST_API_MOCK", (err, user) => {
      console.log(err);
      console.log(token);
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

server.post("/login", (req, res) => {
  const { body } = req;
  var data = mockData.login.find(
    (x) => x.client_id === body.clientID && x.secret_key === body.secretKey
  );
  if (data !== undefined) {
    const token = jwt.sign({ client_id: data.client_id }, "TEST_API_MOCK", {
      expiresIn: "1h",
    });
    return res.status(200).json({ token: token });
  }
  return res.status(401).json({ error: "Invalid credential." });
});

//Submit Invoice
server.post("/SubmitInvoice", authenticateToken, (req, res) => {
  const { body } = req;

  if (body.supplier !== "") {
    return res.status(200).json({ invoice: body });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

//Request Cancelation Invoice
server.post("/CancelInvoice", authenticateToken, (req, res) => {
  const { body } = req;

  if (body.supplier !== "") {
    return res.status(200).json({ invoice: body });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

//Submit Consolidate Invoice
server.post("/SubmitConsolidateInvoice", authenticateToken, (req, res) => {
  const { body } = req;

  if (body.supplier !== "") {
    return res.status(200).json({ invoice: body });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

//Request All Invoices
server.get("/Invoices", (req, res) => {
  return res.status(200).json({ invoices: dummyData });
  // if (body.supplier !== "") {
  //   return res.status(200).json({ invoices: [body] });
  // }
  return res.status(401).json({ error: "Invalid credentials." });
});

//Request Specific Invoices for a Buyer
server.get(`/Invoices/:type/:id`, (req, res) => {
  /**
   * Type:
   * a) IC = Buyer IC
   * b) TIN = Buyer TIN
   * c) Invoice ID = Invoice ID
   */
  const findData = (id, dataObject, type) => {

    if (type === "IC") {
      for (let i = 0; i < dataObject.length; i++) {
        if (dataObject[i].buyer_details.Identification === id) {
          return dataObject[i]
        }
      }
    }
    if (type === "TIN") {
      for (let i = 0; i < dataObject.length; i++) {
        if (dataObject[i].buyer_details.Tin === id) {
          return dataObject[i]
        }
      }
    }
    if (type === "INVOICE") {
      for (let i = 0; i < dataObject.length; i++) {
        if (dataObject[i].EInvoiceNo === id) {
          return dataObject[i]
        }
      }
    }
  }
  const data = findData(req.params.id, dummyData.data, req.params.type);
  if (data != null) {
    return res.status(200).json({ invoices: data });
  } else {
    return res.status(404).json({ result: "ID not found" });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

// Receive a Specific Invoices 
server.get(`/Invoices/:InvoiceID`, (req, res) => {
  
  const { body } = req;

  if (body.supplier !== "") {
    
    return res.status(200).json({ invoices: [body] });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});


// Receive all Consolidate Invoices
server.get("/ConsolidateInvoices", (req, res) => {
  const { body } = req;

  if (body.supplier !== "") {

    return res.status(200).json({ invoices: [body] });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

// Receive Specific Consolidate Invoices
server.get(`/ConsolidateInvoices/:year/:month`, (req, res) => {
  
  const { body } = req;

  if (body.supplier !== "") {

    return res.status(200).json({ invoices: [body] });
  }
  return res.status(401).json({ error: "Invalid credentials." });
});

// Use default router
server.use(router);

// Start server
const port = 3030;
server.listen(port, () => {
  console.log(
    `JSON Server with auth and validation is running on port ${port}`
  );
});