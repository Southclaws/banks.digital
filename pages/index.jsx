import * as React from "react";

import { getData } from "../src/data";

const YES = "✅";
const NO = "⛔";

const TableHeader = ({ children }) => (
  <th className="pa0 pv3 rotate-315 fw6 f7" align="center">
    {children}
  </th>
);

const TableCell = ({ children, label }) => (
  <td className={label ? "tr black-60 f7" : "tc f5"} align="center">
    {children}
  </td>
);

const TransposedRows = ({ data }) => {
  let transposed = {};
  data.forEach(bank => {
    Object.keys(bank).forEach(f => {
      if (f === "Name") {
        return;
      }
      if (f in transposed) {
        transposed[f].push(bank[f]);
      } else {
        transposed[f] = [bank[f]];
      }
    });
  });
  // let labels = Object.keys(transposed);
  let rows = Object.keys(transposed).map(v => {
    return [v, ...transposed[v]];
  });

  return (
    <tbody className="lh-copy">
      {rows.map(f => (
        <tr>
          {f.map((b, i) => (
            <TableCell label={i == 0}>{b}</TableCell>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

const Table = ({ data }) => {
  return (
    <table className="pv3 mw8 center f6">
      <thead>
        <tr>
          <TableHeader />
          {data.map(v => (
            <TableHeader>{v.Name}</TableHeader>
          ))}
        </tr>
      </thead>
      <TransposedRows data={data} />
    </table>
  );
};

const Page = ({ headers, data }) => {
  return (
    <div className="center pa0 pt5-l flex flex-column helvetica bg-light-green">
      <div className="fffmw9">
        <header className="pt3 mh2 mh7-l">
          <h1 className="pa0 ma0">
            <span className="bg-black-90 lh-solid washed-blue ph2 pv0 tracked-tight f1">DIGITAL BANKING</span>{" "}
          </h1>
          <h2 className="pa0 ma0">
            <span className="bg-black-90 lh-solid washed-blue ph2 pv1 tracked-tight f4">Feature comparison</span>
          </h2>
        </header>
        <main>
          <article className="pv2 mh2 mh7-l measure">
            <p>💻 📱 🏦</p>
            <p>
              Digital banks have taken Europe by storm in recent years. Fast growing startups like Monzo and Revolut
              have drawn customers away from traditional big banks by boasting modern interfaces, better experiences and
              innovating on an age old and traditionally slow-moving industry.
            </p>
            <p>
              This is great news, because this means more competition in the banking space. This page aims to help you
              easily decide which of these new banks might be your next. The sign-up and switching journeys are often
              very quick, so it's perfectly fine to try a few and stick with what you like.
            </p>
            <p>
              Have suggestions?{" "}
              <a
                className="bg-black-90 washed-blue hover-black-90 hover-bg-washed-blue"
                href="https://docs.google.com/spreadsheets/d/1b081m9EBaib-LQaYmYC3oMY0Z-yNY9SI_JwqIC50fpI/edit?usp=sharing"
              >
                Leave your comments here!
              </a>
            </p>
          </article>
          <div className="overflow-x-scroll">
            <Table headers={headers} data={data} />
          </div>
        </main>
        <footer className="pa2 mh7-l ma2 f7 tc">
          <a href="https://southcla.ws">Made with ❤️ by Southclaws</a>
        </footer>
      </div>
    </div>
  );
};

Page.getInitialProps = async () => {
  const [headers, data] = await getData();
  return { headers, data };
};

export default Page;
