import fetch from "isomorphic-unfetch";

const SHEET_ID = "1b081m9EBaib-LQaYmYC3oMY0Z-yNY9SI_JwqIC50fpI";
const PAGE = "1";

const getSheet = async (id, page) => {
  const resp = await fetch(`https://spreadsheets.google.com/feeds/cells/${id}/${page}/public/full?alt=json`);
  const json = await resp.json();
  return json;
};

const prettify = text => {
  switch (text) {
    case "TRUE":
      return "✅";
    case "FALSE":
      return "⛔️";
    default:
      return text;
  }
};

export const getData = async () => {
  const raw = await getSheet(SHEET_ID, PAGE);
  const entries = raw.feed.entry;

  let headers = [];
  let data = {};
  let current = "";
  entries.forEach(e => {
    if (e["gs$cell"].row == 1 && e["gs$cell"].col != 1) {
      data[e["gs$cell"].col] = {
        Name: e.content["$t"]
      };
    } else {
      if (e["gs$cell"].col == 1) {
        current = e.content["$t"];
        headers.push(current);
      } else {
        data[e["gs$cell"].col][current] = prettify(e.content["$t"]);
      }
    }
  });

  return [headers, Object.keys(data).map(v => data[v])];
};
