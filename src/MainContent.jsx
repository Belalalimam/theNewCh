import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./MainContent.css";
import { useEffect, useState } from "react";

export default function MainContent() {
  const [reciters, setReciters] = useState([]);
  const [moshafs, setMoshafs] = useState([]);
  const [surahs, setSurahs] = useState([]);
  const language = "en";

  // async function getMoshaf(reciter){
  //   await axios.get(`https://mp3quran.net/api/v3/reciters?language=${language}&reciter=${reciter}`).then((res) => {
  //     console.log(res.data.reciters[0].moshaf);
  //     const sinMoshaf = res.data.reciters[0].moshaf;
  //     setMoshaf(sinMoshaf.map((moshaf) => (
  //         <option value={moshaf.id}>{moshaf.name}</option>
  //       ))
  //     );
  //   });
  // }
  const getReciters = async () => {
    axios.get("https://mp3quran.net/api/v3/reciters").then((res) => {
      setReciters(res.data.reciters);
      console.log(res.data.reciters);
      // console.log(res.data.reciters[0].moshaf);
    });
  };
  const getMoshaf = async (reciter) => {
    await axios
      .get(
        `https://mp3quran.net/api/v3/reciters?language=${language}&reciter=${reciter}`
      )
      .then((res) => {
        setMoshafs(res.data.reciters);
      });
  };
  const getSurah = async (surahServer, surahList) => {
    await axios.get(`https://mp3quran.net/api/v3/suwar`).then((res) => {
      console.log(res.data.suwar);
      setSurahs(res.data.suwar);
    });
  };

  useEffect(() => {
    getReciters();
  }, []);

  return (
    <div style={{ direction: "ltr" }} className="heroImg">
      <img className="img" src="./img/القرآن الكريم.png" alt="" />
      <Container className="modal">
        <Row className="Reciters ">
          <Col style={{ display: "flex", flexDirection: "column" }}>
            <label className="" htmlFor="">
              اختر القارئ
            </label>
            <select
              className="selectReciters"
              onClick={(e) => getMoshaf(e.target.value)}
              name=""
            >
              {reciters.map((reciter) => (
                <option value={reciter.id}>{reciter.name}</option>
              ))}
            </select>
          </Col>

          <Col style={{ display: "flex", flexDirection: "column" }}>
            <label className="" htmlFor="">
              اختر المصحف
            </label>
            <select
              onClick={(e) => {
                getSurah(e.target.value);
              }}
              className="selectReciters"
              name=""
              id=""
            >
              {moshafs.map((moshafreciter) => {
                return [
                  moshafreciter.moshaf.map((data) => (
                    <option
                      value={data.id}
                      data-server={data.server}
                      data-surahlist={data.surah_list}
                    >
                      {data.name}
                    </option>
                  )),
                ];
              })}
            </select>
          </Col>

          <Col style={{ display: "flex", flexDirection: "column" }}>
            <label className="" htmlFor="">
              اختر السورة
            </label>
            <select
              onClick={(e) => console.log(e.target.value)}
              className="selectReciters"
              name=""
            >
              {surahs.map((surah) => (
                <option value={surah.id}>{surah.name}</option>
              ))}
            </select>
          </Col>
        </Row>
        <Row className="">faf</Row>
      </Container>
    </div>
  );
}
