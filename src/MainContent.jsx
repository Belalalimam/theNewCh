import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./MainContent.css";
import { useEffect, useState } from "react";

export default function MainContent() {
  const [reciters, setReciters] = useState([]);
  const [moshafs, setMoshafs] = useState([]);
  const [surahs, setSurahs] = useState();
  const [audio, setAudio] = useState();
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
      // console.log(res.data.reciters);
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
      // console.log(res.data.suwar);
      // console.log(surahServer);
      // console.log(surahList);
      const SurahName = res.data.suwar;
      surahList = surahList.split(",");
      surahList.map((surah) => {
        const padSurah = surah.padStart(3, "0");
        const valueOfServer = surahServer + padSurah + ".mp3";
          SurahName.map((surahName) => {
            if (surahName.id == surah) {
              setSurahs(<option value={valueOfServer}>{surahName.name}</option>);
              console.log(surahName)
            }
          })
      });
    });
  };

  function audioPlayer(surahMp3) {
    setAudio((audioPlayer.src = surahMp3));
  }

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
              onChange={(e) => getMoshaf(e.target.value)}
              name=""
            >
              {reciters.map((reciter) => (
                <option value={reciter.id} key={reciter.id}>
                  {reciter.name}
                </option>
              ))}
              <option>اختر القارئ</option>
            </select>
          </Col>

          <Col style={{ display: "flex", flexDirection: "column" }}>
            <label className="" htmlFor="">
              اختر المصحف
            </label>
            <select
              onChange={(e) => {
                const surahServer = e.currentTarget.children[0].dataset.server;
                const surahList = e.currentTarget.children[0].dataset.surahlist;
                // console.log(e.currentTarget.children[0].dataset.server)
                // console.log(e.currentTarget.children[0].dataset.surahlist)
                // console.log();
                getSurah(surahServer, surahList);
              }}
              className="selectReciters"
              name=""
              id=""
            >
              {moshafs.map((moshafreciter) => {
                return [
                  moshafreciter.moshaf.map((data) => (
                    <option
                      key={data.id}
                      value={data.id}
                      data-server={data.server}
                      data-surahlist={data.surah_list}
                    >
                      {data.name}
                    </option>
                  )),
                ];
              })}
              <option>اختر المصحف</option>
            </select>
          </Col>

          <Col style={{ display: "flex", flexDirection: "column" }}>
            <label className="" htmlFor="">
              اختر السورة
            </label>
            <select
              onClick={(e) => {
                audioPlayer(e.target.value);
              }}
              className="selectReciters"
              name=""
            >
              {surahs}
              <option>اختر السورة</option>
            </select>
          </Col>
        </Row>
        <Row className="">
          <audio src={audio} controls autoPlay={false} />
        </Row>
      </Container>
    </div>
  );
}
// style={{width:"100%"}}
