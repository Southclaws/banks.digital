import * as React from "react";

import { getData } from "./data";

const YES = "✅";
const NO = "⛔";

const TableHeader = ({ children }) => (
  <th className="pa0 pv3 rotate-315 fw6 f7" align="center">
    {children}
  </th>
);

const TableCell = ({ children }) => (
  <td className="pv2 ph1 b--black-20" align="center">
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
            <td className={i == 0 ? "tr black-60 f7" : "tc f5"}>{b}</td>
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
    <div className="mw9 center pa0 pt5-ns flex flex-column helvetica bg-light-green">
      <header className="pt3 mh2 mh7-l">
        <h1 className="pa0 ma0">
          <span className="bg-black-90 lh-solid washed-blue ph2 pv0 tracked-tight f1">DIGITAL BANKING</span>{" "}
          <span className="lh-solid washed-blue ph4 pv0 f1 dn di-l">💻 📱 🏦</span>
        </h1>
        <h2 className="pa0 ma0">
          <span className="bg-black-90 lh-solid washed-blue ph2 pv1 tracked-tight f4">Feature comparison</span>
        </h2>
      </header>
      <main>
        <article className="pv2 mh2 mh7-l measure">
          <p>
            Digital banks have taken Europe by storm in recent years. Fast growing startups like Monzo and Revolut have
            drawn customers away from traditional big banks by boasting modern interfaces, better experiences and
            innovating on an age old and traditionally slow-moving industry.
          </p>
          <p>
            This is great news, because this means more competition in the banking space. This page aims to help you
            easily decide which of these new banks might be your next. The sign-up and switching journeys are often very
            quick, so it's perfectly fine to try a few and stick with what you like.
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
  );
};

Page.getInitialProps = async () => {
  const [headers, data] = await getData();
  return { headers, data };
};

export default Page;
