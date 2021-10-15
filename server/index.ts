import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});